if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Grade = require("./models/grade");
const Student = require("./models/student");
const bodyParser = require("body-parser");
const multer = require("multer");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const NodeRSA = require("node-rsa");
const fs = require("fs");

const app = express();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ers';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
const storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});
const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
}).single("file");

const stor = multer.memoryStorage();
const upl = multer({ stor: stor });

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.post("/admin", (req, res) => {
  var exceltojson; //Initialization
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      //  res.json({error_code:1,err_desc:err});
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      console.log("No file passed");
      // res.json({error_code:1,err_desc:"No file passed"});
      return;
    }
    //start convert process
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ] === "xlsx"
    ) {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    try {
      exceltojson(
        {
          input: req.file.path, //the same path where we uploaded our file
          output: null, //since we don't need output.json
          //lowerCaseHeaders:true
        },
        async function (err, result) {
          if (err) {
            console.log(err);
            //return res.json({error_code:1,err_desc:err, data: null});
          }
          //res.json({data: result});
          //console.log(result);

          for (let r of result) {
            const grades = new Grade(r);
            grades.semester = req.body.semester;
            grades.batch = req.body.batch;
            
            const stu = await Student.findOne({roll: grades.roll});
            //console.log(stu);
            let key_public = new NodeRSA(stu.public_key);
            grades.sub1 = key_public.encrypt(grades.sub1, 'base64');
            grades.sub2 = key_public.encrypt(grades.sub2, 'base64');
            grades.sub3 = key_public.encrypt(grades.sub3, 'base64');
            grades.sub4 = key_public.encrypt(grades.sub4, 'base64');
            //console.log(grades);
            await grades.save();
          }
        }
      );
    } catch (e) {
      console.log(e);
      //res.json({error_code:1,err_desc:"Corupted excel file"});
    }
  });
  res.render("uploaded");
});

app.get("/student/register", (req, res) => {
  res.render("student-register");
});

app.post("/student/register", async function (req, res) {
  const student = new Student(req.body);
  
  const key = new NodeRSA({ b: 1024 });
  const public_key = key.exportKey("public");
  const private_key = key.exportKey("private");

  student.public_key = public_key;
  //console.log(student);
  await student.save();
  res.render("successful-register", {private_key});
});

app.get("/download", (req, res) => {
  res.attachment("private_key.txt");
  res.type("txt");
  res.send(req.query.private_key);
});

app.get("/student/result", (req, res) => {
  res.render("student-result");
});

app.post("/student/result", upl.single("prikey"), async function (req, res, next) {
  const gr = await Grade.findOne({
    roll: req.body.roll,
    semester: req.body.semester,
  });
  if (!gr) {
    return res.send("Student not found");
  }
  const st = await Student.findOne({ roll: gr.roll });

  const file = req.file; // We get the file in req.file

  if (!file) { // in case we do not get a file we return
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const multerText = Buffer.from(file.buffer).toString("utf-8"); // this reads and converts the contents of the text file into string

  const result = { // the final object which will hold the content of the file under fileText key.
    fileText: multerText,
  };

  let key_private = new NodeRSA(result.fileText);

  res.render("display-result", { gr, st, key_private });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

## ERS (Exam Results Publishing System)

ERS is a web application that is built with the aim to help the process of uploading and viewing results of school/university exams in a smooth and efficient manner. Using this web application, the admin can upload the results and the students can view their respective results securely. This security is ensured using the concept of 'Asymmetric Key Encryption' in which we generate a pair of two keys - public key and private key, when a student registers for the first time on the website. The private key is downloaded by the student and is stored on their computer system for future use. The public key is stored on the database. In this web application we use public key for encryption of results and private key for decryption of results. So, whenever the admin uploads the results, it will be encrypted using the public key stored in the database. When an individual student wants to view his/her result, they will have to first login and then provide the private key that they have downloaded in their computer system, and if this private key is correct and not tampered, then using it the encrypted result that has been uploaded by the admin will be decrypted and the corresponding result is displayed to the student. 

This entire system ensures that the results are uploaded and displayed in a secure manner while also ensuring confidentiality of results. i.e, a student can only view his/her result only and not somebody else's unlike the traditional system wherein all the students' marks are displayed publicly on the notice board which leads to students comparing themselves with others and judging themselves on the basis of that. This creates unnecessary pressure on the students thereby leading to undesirable consequences. Just like in the movie '3 idiots' wherein 2 characters namely Farhan and Raju are unhappy with the fact that their names are present on the bottom of the result list, but they eventually become even more depressed after realizing that their friend Rancho's name is present on top of the list. Then further in the movie we can see Rancho saying to the director of their institute that this entire system of displaying students' results on notice board is not really a good idea. So taking this into consideration, I have developed this web application that provides a solution to the above mentioned problem. 

 
 
## Screenshots

<p align="center"><b>Home Page</b></p>

![Screenshot (82)](https://user-images.githubusercontent.com/56026267/154731207-fd91537e-f162-4102-a74b-7f6b8c6cc59f.png)

<hr>

<p align="center"><b>Student Register Page</b></p>

![Screenshot (84)](https://user-images.githubusercontent.com/56026267/154731576-3723007f-9d1b-47a3-b1a0-c2c0a908b29e.png)

<hr>

<p align="center"><b>Admin Upload Result Page</b></p>

![Screenshot (87)](https://user-images.githubusercontent.com/56026267/154732126-ffe1bd2e-2027-4984-abff-bbba7ddb1f9b.png)

<hr>

<p align="center"><b>Registration Successful Page</b></p>

![Screenshot (88)](https://user-images.githubusercontent.com/56026267/154732383-5d22a549-1067-4de8-80e7-83722abc4aa9.png)

<hr>

<p align="center"><b>Results Uploaded Successfully Page</b></p>

![Screenshot (90)](https://user-images.githubusercontent.com/56026267/154732679-a20cba83-3348-4b4e-acb9-f6401534dc1a.png)

<hr>

<p align="center"><b>Enter Details to View Results Page</b></p>

![Screenshot (91)](https://user-images.githubusercontent.com/56026267/154732867-68d927b2-66a0-49ea-9dac-c63f99dcea2d.png)

<hr>

<p align="center"><b>Results Page</b></p>

![Screenshot (92)](https://user-images.githubusercontent.com/56026267/154733113-5522e365-b097-40b8-a292-bdab3fff0b29.png)

<hr>


## Hosted URL

https://ers-by-chaitanya.herokuapp.com/


## Project Video Demo

https://youtu.be/HYSd2FvwzUs


## Features Implemented

<ol>
	<li>Used the concept of Asymmetric Key Encryption for encrypting and decrypting results for ensuring confidentailty and security of results.</li>
	<li>Used multer middleware to parse various types of input files such as .xls, .xlsx and .txt</li>
</ol>	


## Technologies/Libraries/Packages Used
<b>Technologies</b>
<ul>
		<li>HTML</li>
		<li>CSS</li>
		<li>JavaScript</li>
    		<li>Bootstrap</li>
    		<li>NodeJS</li>
		<li>ExpressJS</li>
    		<li>MongoDB</li>
    		<li>EJS</li>
</ul>

<b>Libraries/Packages</b>
<ul>
		<li>node-rsa</li>
		<li>multer</li>
		<li>body-parser</li>
    <li>method-override</li>
		<li>xls-to-json-lc</li>
    <li>xlsx-to-json-lc</li>
    <li>dotenv</li>
    <li>express</li>
    <li>nodemon</li>
    <li>ejs</li>
    <li>ejs-mate</li>
    <li>mongoose</li>
</ul>


## Local Setup
1. Clone this repo using <code> git clone https://github.com/Chaitanyab2001/ERS.git </code>
2. After cloning create a <code>.env</code> file to store all the environment variables
3. Fill the <code>.env</code> with the following content : 
(Note: RETRACTED means we should not share this variable, and thus should not be present in public repos)
```

DB_URL = RETRACTED (Put your mongodb atlas url here)

```
4. After setting the <code>.env</code> file, run the command <code>npm i</code> so that npm automatically installs all the node packages and their dependencies which are required for the project
5. To start the server run the command <code>npm start</code>


## Team Member
Chaitanya Bulusu (2019IMT-029)

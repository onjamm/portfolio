// Import the express module
import express from "express";

import mysql2 from "mysql2";

import dotenv from "dotenv";

import {validateForm} from "./validation.js";

dotenv.config();
// Create an instance of an Express application
const app = express();

//Define the port number where our server will listen
//different than my others just in case we deploy on Digital Ocean
const PORT = 3003;

//enable static file serving -- tells express where to look for static files
app.use(express.static("public"));

//Middleware that allows express to read the form data and store it in the req.body
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

//Define a default "route" ('/)
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get("/", (req, res) => {
  res.render("resume");
});

//admin route
app.get("/admin", async (req, res) => {
    try {
        // Fetch all submissions from teh databse, newest first
        const [submissions] = await pool.query("SELECT * FROM contacts ORDER BY timestamp DESC");
        
        //Render the admin page
        res.render("admin", { submissions });


    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).send("Error loading submissions: " + err.message);
    }
});

//conrfirmation route
// app.get("/thank-you", (req, res) => {
//   res.render("confirmation");
// });

//Contact form route
app.get("/contact", (req, res) => {
  res.render("contact", { errors: [] });
});

//Portfolio  route
app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

//Create a temp array to store the guestbook submissions
const submissions = [];

// Create a pool of connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();


//Database test route
app.get("/db-test", async (req, res) => {

    try {
        const submissions = await pool.query("SELECT * FROM contacts");
        res.send(submissions[0]);
    } catch (err) {
        console.error("Database error: ", err);
        res.status(500).send("Database error: " + err.message);
    }
});

//Submit guesstbook route
app.post("/submit-submission", async (req, res) => {
    try {
        //Get form data from req.body
        const submission = req.body;

        const valid = validateForm(submission);

        if(!valid.isValid) {
            console.log(valid);
            res.render('contact', {errors: valid.errors});
            return;
        }

        submission.mailingList = submission["mailing-list"] === "on" ? 1 : 0;
        submission.linkedIn = submission["linked"] || null;
        submission.format = submission["format"] || null;

        console.log(submission);

        //SQL INSERT query with placeholders to prevent sql injection
        const sql = "INSERT INTO contacts(fname, lname, email, meet, job, company, linkedIn, message, mailingList, format, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const params = [
            submission.fname,
            submission.lname,
            submission.email,
            submission.meet,
            submission.job,
            submission.company,
            submission.linkedIn,
            submission.message,
            submission.mailingList,
            submission.format,
            submission.timestamp = new Date()
        ];

        //Execute the query and grab the primary key of the new row
        const [result] = await pool.execute(sql, params);
        console.log("New submission ID: ", result.insertId);

        //Render confirmation page with the adoption data
        res.render('confirmation', { submission});

    } catch (err) {
        console.error("Error saving submission: ", err);
        res.status(500).send("Sorry, there was an error processing your submission. Please try again.");
    }
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

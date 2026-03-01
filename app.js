// Import the express module
import express from "express";

// Create an instance of an Express application
const app = express();

//Define the port number where our server will listen
//different than my others just in case we deploy on Digital Ocean
const PORT = 3003;

//Middleware that allows express to read the form data and store it in the req.body
app.use(express.urlencoded({ extended: true }));

//Define a default "route" ('/)
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

//Create a temp array to store the guestbook submissions
const submissions = [];

//Submit guesstbook route
app.post("/submit-submission", (req, res) => {
  const submission = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    meet: req.body.meet,
    html: req.body.html,
    text: req.body.text,
    mailingList: req.body.mailingList,
    linkedIn: req.body.linkedIn,
    formats: req.body.formats,
    timestamp: new Date(),
  };

  //add submission object to submissions array
  submissions.push(submission);

  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//admin route
app.get("/admin", (req, res) => {
  res.send(submissions);
});

//conrfirmation route
app.get("/thank-you", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//enable static file serving -- tells express where to look for static files
app.use(express.static("public"));

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

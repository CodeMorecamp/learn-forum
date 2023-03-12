const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

//To be able use Express and CORS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//render something to test the server
app.get("./api", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//hold all the existing users
const users = [];

//generate random string as an ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/api/register", async (req, res) => {
  const [email, password, username] = req.body;

  //holds the ID
  const id = generateID;
  //ensure there is no existing user with thesame credentials
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );

  //if true
  if (result.length === 0) {
    const newUser = { id, email, password, username };
    //adds the user to the database (array)
    users.push(newUser);
    //success messgae
    return res.json({
      message: "Account created successfully",
    });
  } else {
    res.json({
      error_message: "User already exists",
    });
  }
  //log the credentials to the console
  console.log({ email, password, username, id });
});

//api/login logic
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //check if the user exists
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //if the user doesnt exist
  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect details",
    });
  }
  //returns the id if successfully logged in
  res.json({
    message: "Login successfull",
    id: result[0].id,
  });
});

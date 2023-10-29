// Import necessary modules
import express, { json } from "express";
import mongoConnect, { userData } from "./mongo.js";
import cors from "cors";

// Create an Express application
const app = express();
const port = 4000; // Set your desired port number

// Connect to MongoDB

// Middleware to parse JSON requests
app.use(json());
app.use(cors());

// Define your API routes
// Sign-up route
app.post("/signup", async (req, res) => {
  console.log("req.body", req.body);
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userData.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists.",code:401 });
    }

    const newUser = new userData({ name, email, password, login: true });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully",code:200});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error",code:500 });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Please provide complete credential");
    }
    // Check if the user already exists
    const existingUser = await userData.findOne({ email });
    if (existingUser.password == password) {
      const existingUser = await userData.findOneAndUpdate(
        { email },
        { login: true }
      );
      return res.status(200).json({ message: "Welcome to Home Page.", code:200});
    } else {
      throw new Error("Try again : Password is correct");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

app.post("/logout", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userData.findOneAndUpdate(
      { email },
      { login: false }
    );
    if (existingUser) {
      return res.status(200).send({ meassage: "Successfully Logout" ,code:200});
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message, code:401});
  }
});

app.post("/adddetail", async (req, res) => {
  const { email, gender, age, dob, mobile } = req.body;
  try {
    const existingUser = await userData.findOneAndUpdate(
      { email },
      { age, gender, dob, mobile }
    );
    if (existingUser) {
      return res.status(200).send({ meassage: "User Data is Updated",code:200 });
    } else {
      throw new Error("Server Error");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});
try {
  await mongoConnect();
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on Port :${port}`);
  });
} catch {
  console.log("server Error");
}

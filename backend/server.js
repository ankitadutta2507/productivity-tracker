// importing packages.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// initializing express app.
const app = express();


// middlewares.
app.use(cors());
app.use(express.json());


//Connects your backend server to MongoDB database.
mongoose.connect(
  "YOUR-MONGODB STRING"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

//Default Route(test route).
app.get("/", (req, res) => {
  res.send("Server Running");
});

//stats API route to get the tracking data from the database.
app.get("/stats", async (req, res) => {

  const data = await Tracking.find();

  res.json(data);

});
//stats API route to get the tracking data from the database with error handling.
app.get("/stats", async (req, res) => {

  try {

    const data = await Tracking.find();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

//starting the server(http://localhost:5000)
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

//importing the tracking model and creating a post route to save the tracking data in the database.

const Tracking = require("./models/Tracking");
app.post("/track", async (req, res) => {
  try {
    const data = new Tracking(req.body);  //new data

    await data.save();    //save data

    res.status(201).json({
      message: "Tracking saved"   // success response 
    });
  } catch (error) {
    res.status(500).json({
      error: error.message    //error handling
    });
  }
});

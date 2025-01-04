const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

const db = connectToDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to the Travel Buddy API!");
});

app.use("/api/accommodations", require("./routes/accommodationRoute"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;

const userRoutes = require("./routes/user");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Wiring of the routers (Rest API Calls)
app.use("/", userRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong.";
  res.status(status).json({
    message,
  });
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { ValidationError } = require("sequelize");

// routes
const routes = require("./routes");
const apiRouter = require("./routes/api/index");

// checks environment
const { environment } = require("./config");
const isProduction = environment === "production";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// uncomment later to use csrf protection
// use csrf on all routes
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);
app.use("/api", apiRouter);

//middleware to create error handler for 404
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err); //next is called with express error handler
});

//sequelize errors handler
app.use((err, _req, _res, next) => {
  // check if error is sequelize error
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
  }
  next(err);
});

//generic error handler
app.use((err, _req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    //actually send back error
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;

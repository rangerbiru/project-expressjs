var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var flash = require("express-flash");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// Routes Siswa
var siswaRouter = require("./routes/siswa");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    cookie: {
      maxAge: 60000,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);

//Express Flash
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
// Router Siswa
app.use("/siswa", siswaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

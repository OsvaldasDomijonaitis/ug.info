var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");
// const cors = require("cors");

// var indexRouter = require("./routes/index");
var authAPIRouter = require("./routes/authAPI");
var apiV1Router = require("./routes/api_v1");

var app = express();

// app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

function fileFilter(req, file, cb) {
  // console.log(file);

  try {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } catch (error) {
    console.log(error);
    cb(new Error('File upload problem'))
  }
}

// multipart/form-data nuskaitymas, failų įkėlimas
app.use(multer({ dest: "uploads/", fileFilter: fileFilter }).any());

// app.use("/", indexRouter);
app.use("/", authAPIRouter);
app.use("/api/v1/", apiV1Router);

app.get("/testas/", (req, res) => {
  res.send("Testinis puslapis");
});

module.exports = app;

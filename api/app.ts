import express from 'express';
import { Request, Response } from 'express';
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();




// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// const multer = require("multer");
// const cors = require("cors");

// var indexRouter = require("./routes/index");
// var authAPIRouter = require("./routes/authAPI");
// var apiV1Router = require("./routes/api_v1");

var app = express();

// app.use(cors());
// app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// function fileFilter(req, file, cb) {
//   // console.log(file);

//   try {
//     if (["image/png", "image/jpeg"].includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   } catch (error) {
//     console.log(error);
//     cb(new Error('File upload problem'))
//   }
// }

// multipart/form-data nuskaitymas, failų įkėlimas
// app.use(multer({ dest: "uploads/", fileFilter: fileFilter }).any());

// app.use("/", indexRouter);
// app.use("/", authAPIRouter);
// app.use("/api/v1/", apiV1Router);

app.get("/api/testas/", async (req: Request, res: Response) => {
  res.send("Testinis puslapis");
});

app.get("/api/users/", async (req: Request, res: Response) => {
  const usersiai = await prisma.user.findMany();
  res.json(usersiai);
});

// module.exports = app;



const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)

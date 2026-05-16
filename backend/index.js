import express from "express";
import { connectDb } from "./config/dbConnector.js";

import dotenv from "dotenv";
dotenv.config();
import { users } from "./models/userModel.js";
import userRouter from "./routes/userRouter.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "node:path";
import "./config/passport.js";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from "url";
import categoryRouter from "./routes/categoryRouter.js";
import taskRouter from "./routes/taskRouter.js";

// making an express app
const app = express();

// setting up lobal middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://taskmanagerfe.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

// enabling session support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static("public"));
const upload = multer({ dest: "public/" });
// setting session from express-session
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      collectionName: "UserSession",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  }),
);
// setting the passport session strategy
app.use(passport.authenticate("session"));

app.use(passport.initialize());
app.use(passport.session());
// env variables import
const port = process.env.PORT;
console.log(port);

// connecting to DB
connectDb(process.env.DB_URL);

// routing

app.use("/api/users", userRouter);
app.use("/api/categorys", categoryRouter);
app.use("/api/tasks", taskRouter);

app.use((err, req, res, next) => {
  console.log(err.status, err.message);
  return res.send(err);
});
// listening to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

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
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

// enabling session support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
// setting session from express-session
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
      secure: false, // MUST be false on localhost
      sameSite: "lax",
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

// listening to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

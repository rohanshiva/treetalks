import {Server} from "http";
import userRouter from "../routes/User";
import cors  = require("cors");
import express = require("express");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

const httpServer = new Server(app);

export {httpServer};
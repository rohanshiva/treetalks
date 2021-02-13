import {Server} from "http";
import userRouter from "../routes/User";
import express = require("express");


const app = express();
app.use(express.json());
app.use("/user", userRouter);

const httpServer = new Server(app);

export {httpServer};
import {Server} from "http";
import userRouter from "../routes/User";
import roomRouter from "../routes/Room";
import newsRouter from "../routes/News";
import * as redis from "redis";
import redisConfig = require("../config/redis.json");
import express = require("express");
import cors = require("cors");


const redisClient = redis.createClient(redisConfig);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/news", newsRouter);


const httpServer = new Server(app);

export {httpServer, redisClient};
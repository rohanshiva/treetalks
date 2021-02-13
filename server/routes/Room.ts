import { randomBytes } from "crypto";
import { redisClient } from "../core/HttpServer";
import { Room, roomPool } from "../core/Room";
import express = require("express");


const roomRouter = express.Router();

roomRouter.post("/", async (req, res) => {
    const roomId = randomBytes(12).toString("hex");
    res.send({ roomId: roomId });
});

roomRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    redisClient.get(id, (err, result) => {
        if (err !== null || result === null) {
            res.status(404).send({
                message: err?.message,
                rooms: Array.from(roomPool)
            });
        }
        else {
            const room = Room.from(JSON.parse(result as string));
            res.send({
                room: room,
                rooms: Array.from(roomPool)
            });
        }
    });
});


export default roomRouter;
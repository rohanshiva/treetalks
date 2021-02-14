import { randomBytes } from "crypto";
import { redisClient } from "../core/HttpServer";
import { Room, roomPool } from "../core/Room";
import { roomFinder } from "../core/Finder";
import express = require("express");


const roomRouter = express.Router();

roomRouter.post("/", async (req, res) => {
    const roomId = randomBytes(12).toString("hex");
    roomPool.set(roomId, false);
    res.send({ roomId: roomId });
});


type FindRoom = {
    title: string,
    degree: number
}

roomRouter.get("/finder", async(req, res) => {
    res.send(roomFinder.serialize());
});

roomRouter.post("/find", async (req, res) => {
    const body = req.body;
    const fields = ["title", "degree"];
    const missingFields = [];
    for(const field of fields){
        if(!(field in body)){
            missingFields.push(field);
        }
    }
    if(missingFields.length > 0){
        res.status(400).send({
            message: `Missing fields ${missingFields.join(",")} from request.`
        });
    }
    else{
        const {title, degree} : FindRoom = body;
        try{
            const roomId = roomFinder.getRoom(title, degree);
            res.send({
                roomId: roomId
            });
        }
        catch(error){
            const message = error.message;
            if(message === "No rooms at the moment"){
                res.status(404).send({
                    message: "There are no avaliable rooms at the moment"
                });
            }
            else{
                res.status(500).send({
                    message: message
                });
            }
        }        
    }
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

roomRouter.get("/validate/:id", (req, res) => {
    const id = req.params.id;
    if(roomPool.has(id)){
        res.send({
            doesRoomExist: true
        });
    }
    else{
        res.send({
            doesRoomExist: false
        });
    }
})


export default roomRouter;
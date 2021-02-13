import { Callback } from "redis";
import { Socket, Server } from "socket.io";
import { redisClient } from "./HttpServer";
import { Room, roomPool } from "./Room";
import { randomBytes } from "crypto";
import moment from "moment";

const onRedisSet = (err: Error, reply: string) => {
    if (err != null) {
        console.log(err.message);
    }
}


const getRoomId = (rooms: Set<string>) => {
    return Array.from(rooms)[1];
}

const onDisconnecting = (socket: Socket, io: Server) => {
    return () => {
        if (socket.rooms.size > 0) {
            const roomId = getRoomId(socket.rooms);
            redisClient.get(roomId, (err, result) => {
                if (err != null || result == null) {
                    return;
                }
                let room = Room.from(JSON.parse(result));
                room.onSpeakerLeave(socket.id);
                if (room.isEmpty()) {
                    //terminate room from data structure
                    roomPool.delete(roomId);
                    redisClient.del(roomId);
                }
                else {
                    redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                    //make room open
                    io.to(roomId).emit("room", room.serialize());
                }
            });
        }
    }
}

type CreateRoom = {
    roomId: string,
    userId: string,
    degree: number
    topicDetails: string
}

const onCreate = (socket: Socket, io: Server) => {
    return ({ roomId, userId, degree, topicDetails }: CreateRoom) => {
        let room = Room.new(roomId);
        room.setOwner({
            socketId: socket.id,
            id: userId,
            degree: degree,
            anonUsername: userId
        });
        room.setTopicDetails(topicDetails);
        roomPool.add(roomId);
        redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
        socket.join(roomId);
        io.to(roomId).emit("room", room.serialize());
    }
}

type JoinRoom = {
    roomId: string,
    userId: string,
    degree: number
}

const onJoin = (socket: Socket, io: Server) => {
    return ({ roomId, userId, degree }: JoinRoom) => {
        redisClient.get(roomId, (err, result) => {
            if (err != null || result == null) {
                return;
            }
            let room = Room.from(JSON.parse(result));
            room.onSpeakerJoin({
                socketId: socket.id,
                id: userId,
                degree: degree,
                anonUsername: userId
            });
            redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
            socket.join(roomId);
            io.to(roomId).emit("room", room.serialize());
        });
    }
}

type CreateMessage = {
    authorId: string,
    text: string,
}

const onMessage = (socket: Socket, io: Server) => {
    return ({ authorId, text }: CreateMessage) => {
        if (socket.rooms.size > 0) {
            const roomId = getRoomId(socket.rooms);
            const createdAt = moment.utc().format();
            const message = {
                authorId: authorId,
                text: text,
                id: randomBytes(8).toString("hex"),
                createdAt: createdAt
            };
            redisClient.get(roomId, (err, result) => {
                if (err != null || result == null) {
                    return;
                }
                let room = Room.from(JSON.parse(result));
                room.sendMessage(message);
                redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                io.to(roomId).emit("room", room.serialize());
            });
        }
    }
}


export {onDisconnecting, onCreate, onJoin, onMessage};







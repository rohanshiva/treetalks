import { Callback } from "redis";
import { Socket, Server } from "socket.io";
import { redisClient } from "./HttpServer";
import { Room, roomPool, TopicDetails } from "./Room";
import { roomFinder } from "./Finder";
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

const isInRoom = (socket: Socket) => socket.rooms.size > 1;

const onDisconnecting = (socket: Socket, io: Server) => {
    return () => {
        if (isInRoom(socket)) {
            const roomId = getRoomId(socket.rooms);
            redisClient.get(roomId, (err, result) => {
                if (err != null || result == null) {
                    return;
                }
                let room = Room.from(JSON.parse(result));
                let ownerDegree = room.getOwnerDegree();
                let topicTitle = room.getTopicTitle();
                room.onSpeakerLeave(socket.id);
                
                //remove room from finder structure
                //roomFinder.removeRoom(topicTitle, ownerDegree, roomId);
                if (room.isEmpty()) {
                    roomPool.delete(roomId);
                    redisClient.del(roomId);
                }
                else {
                    redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                    //roomFinder.addRoom(topicTitle, room.getOwnerDegree(), roomId);
                    io.to(roomId).emit("room", room.serialize());
                }
            });
        }
    }
}

type JoinRoom = {
    roomId: string,
    userId: string,
    degree: number
    topicDetails: TopicDetails
}

const onJoin = (socket: Socket, io: Server) => {
    return ({ roomId, userId, degree, topicDetails }: JoinRoom) => {
        if (roomPool.has(roomId)) { 
            
            //make the user join the room if room if room is already created
            const isRoomCreated = roomPool.get(roomId);
            if (isRoomCreated) {
                redisClient.get(roomId, (err, result) => {
                    if (err != null || result == null) {
                        return;
                    }
                    let room = Room.from(JSON.parse(result));
                    if(!room.isFull()){
                        room.onSpeakerJoin({
                            socketId: socket.id,
                            id: userId,
                            degree: degree,
                            anonUsername: userId
                        });
                        
                        redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                        
                        //roomFinder.removeRoom(room.getTopicTitle(), room.getOwnerDegree(), roomId);
                        socket.join(roomId);
                        io.to(roomId).emit("room", room.serialize());
                    }
                    else{
                        io.to(socket.id).emit("error", {
                            error: "Room is full"
                        });
                    }
                });
            }
            else {
                let room = Room.new(roomId);
                room.setOwner({
                    socketId: socket.id,
                    id: userId,
                    degree: degree,
                    anonUsername: userId
                });

                room.setTopicDetails(topicDetails);

                roomPool.set(roomId, true);
                //roomFinder.addRoom(room.getTopicTitle(), room.getOwnerDegree(), roomId);
                redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);

                socket.join(roomId);
                io.to(roomId).emit("room", room.serialize());
            }
        }
    }
}

type CreateMessage = {
    authorId: string,
    text: string,
}

const onMessage = (socket: Socket, io: Server) => {
    return ({ authorId, text }: CreateMessage) => {
        if (isInRoom(socket)) {
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


export { onDisconnecting, onJoin, onMessage };







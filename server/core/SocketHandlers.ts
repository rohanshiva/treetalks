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

const getRandomName = () => {
    const randomFirst = "Baby,Booble,Bunker,Cuddle,Cutie,Doodle,Foofie,Gooble,Honey,Kissie,Lover,Lovey,Moofie,Mooglie,Moopie,Moopsie,Nookum,Poochie,Pookie,Schmoopie,Schnoogle,Schnookie,Schnookum,Smooch,Smoochie,Smoosh,Snoogle,Snoogy,Snookie,Snookum,Snuggy,Sweetie,Woogle,Woogy,Wookie,Wookum,Wuddle,Wuggy,Wunny,Bumble,Bump,Dip".split(",");
    const randomLast = "Boo,Bunch,Bunny,Cake,Cakes,Cute,Darling,Dumpling,Dumplings,Face,Foof,Goo,Head,Kin,Kins,Lips,Love,Mush,Pie,Pook,Pums,Bumble,Bump,Dip".split(",");
  
    const first = Math.floor(Math.random() * randomFirst.length);
    const last = Math.floor(Math.random() * randomLast.length);
    return randomFirst[first] + " " + randomLast[last];
  }
  

const isInRoom = (socket: Socket) => socket.rooms.size > 1;

const onLeave = (socket: Socket, io: Server) => {
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
                socket.leave(roomId);
                //remove room from finder structure
                if(!room.getIsCustom()){
                    roomFinder.removeRoom(topicTitle, ownerDegree, roomId);
                }

                if (room.isEmpty()) {
                    roomPool.delete(roomId);
                    redisClient.del(roomId);
                }
                else {
                    redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                    if(!room.getIsCustom()){
                        roomFinder.addRoom(topicTitle, room.getOwnerDegree(), roomId);
                    }
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
    topicDetails: TopicDetails,
    isCustom: boolean
}

const onJoin = (socket: Socket, io: Server) => {
    return ({ roomId, userId, degree, topicDetails, isCustom }: JoinRoom) => {
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
                            anonUsername: getRandomName()
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
                let room = Room.new(roomId, isCustom);
                room.setOwner({
                    socketId: socket.id,
                    id: userId,
                    degree: degree,
                    anonUsername: getRandomName()
                });

                room.setTopicDetails(topicDetails);

                roomPool.set(roomId, true);
                if(!room.getIsCustom()){
                    roomFinder.addRoom(room.getTopicTitle(), room.getOwnerDegree(), roomId);
                }
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
    return ({ authorId, text}: CreateMessage) => {
        if (isInRoom(socket)) {
            const roomId = getRoomId(socket.rooms);
            const createdAt = moment.utc().format();
            
            redisClient.get(roomId, (err, result) => {
                if (err != null || result == null) {
                    return;
                }

                let room = Room.from(JSON.parse(result));
                const message = {
                    authorId: authorId,
                    anonUsername: room.getAnonUsername(authorId),
                    text: text,
                    id: randomBytes(8).toString("hex"),
                    createdAt: createdAt
                };
                room.sendMessage(message);
                redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                io.to(roomId).emit("room", room.serialize());
            });
        }
    }
}

const onMute = (socket: Socket, io: Server) => {
    return ({id}:{id:string}) => {
        if(isInRoom(socket)){
            const roomId = getRoomId(socket.rooms);
            redisClient.get(roomId, (err, result) => {
                if (err != null || result == null) {
                    return;
                }

                let room = Room.from(JSON.parse(result));
                room.toggleMute(id);
                redisClient.set(roomId, room.serialize(), onRedisSet as Callback<string>);
                io.to(roomId).emit("room", room.serialize());
            })
        }
    }
}


export {onJoin, onLeave, onMessage, onMute};







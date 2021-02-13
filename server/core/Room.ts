import {Message} from "./Message";

type RoomUser = {
    socketId: string,
    isMuted: boolean,
    isSpeaker: boolean,
    degree: number,
    anonUsername: string,
    id:string
}

class Room{

    id:string
    speakers:RoomUser[]
    ownerId:string
    topicDetails:string
    chatHistory:Message[]

    constructor(id:string, speakers:RoomUser[], ownerId:string, topicDetails:string, chatHistory:Message[]){
        this.id = id;
        this.speakers = speakers;
        this.ownerId = ownerId;
        this.topicDetails = topicDetails;
        this.chatHistory = chatHistory;
    }


    isEmpty(){
        return this.speakers.length === 0;
    }

    isFull(){
        return this.speakers.length === 2;
    }

    setOwner({socketId, id, degree, anonUsername}: {socketId: string, id: string, degree: number, anonUsername: string}){
        this.ownerId = id;
        const player:RoomUser = {
            socketId: socketId,
            id: id,
            isMuted: false,
            isSpeaker: true,
            anonUsername: anonUsername,
            degree: degree
        };
        this.speakers.push(player);
    }

    setTopicDetails(topicDetails:string){
        this.topicDetails = topicDetails;
    }

    onSpeakerJoin({socketId, id, degree, anonUsername}: {socketId: string, id: string, degree: number, anonUsername: string}){
        if(!this.isFull()){
            const player:RoomUser = {
                socketId: socketId,
                id: id,
                isMuted: false,
                isSpeaker: true,
                anonUsername: anonUsername,
                degree: degree
            };
            this.speakers.push(player);
        }
    }

    onSpeakerLeave(socketId: string){
        let leavingSpeaker : RoomUser[] = [];
        this.speakers = this.speakers.filter((speaker) => {
          if(speaker.socketId === socketId){
              leavingSpeaker.push(speaker);
          }
          return speaker.socketId !== socketId;
        });

        if(leavingSpeaker.length > 0){
            //in case owner leaves, make other member the owner
            if(leavingSpeaker[0].id === this.ownerId && this.speakers.length > 0){
                this.ownerId = this.speakers[0].id;
            }
        }
    }

    sendMessage(message:Message){
        this.chatHistory.push(message);
    }

    serialize(){
        return JSON.stringify(this);
    }

    static from({id, speakers, ownerId, topicDetails, chatHistory}: {id:string, speakers:RoomUser[], ownerId:string, topicDetails:string, chatHistory:Message[]}){
        return new Room(id, speakers, ownerId, topicDetails, chatHistory);
    }

    static new(id:string){
        return new Room(id, [], "", "", []);
    }
}

const roomPool = new Set<string>();
export {Room, RoomUser, roomPool};
import {Message} from "./Message";

type RoomUser = {
    socketId: string,
    isMuted: boolean,
    isSpeaker: boolean,
    degree: number,
    anonUsername: string,
    id:string,
}

export type TopicDetails = {
    title: string,
    description: string
}

class Room{

    id:string
    speakers:RoomUser[]
    ownerId:string
    topicDetails:TopicDetails
    chatHistory:Message[]
    isCustom: boolean

    constructor(id:string, speakers:RoomUser[], ownerId:string, topicDetails:TopicDetails, chatHistory:Message[], isCustom: boolean){
        this.id = id;
        this.speakers = speakers;
        this.ownerId = ownerId;
        this.topicDetails = topicDetails;
        this.chatHistory = chatHistory;
        this.isCustom = isCustom;
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

    setTopicDetails(topicDetails:TopicDetails){
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

    getOwnerDegree(){
        const owner = this.speakers.filter((speaker) => speaker.id === this.ownerId)[0];
        return owner.degree;
    }

    getTopicTitle(){
        return this.topicDetails.title;
    }

    getAnonUsername(id : string){
        const speaker = this.speakers.filter((speaker, index) => speaker.id === id)[0];
        return speaker.anonUsername;
    }

    toggleMute(id:string){
        let index : number | null = null;
        const speaker = this.speakers.filter((speaker, i) => {
            if(speaker.id === id){
                index = i;
            }
            return speaker.id === id;
        });
        if(index !== null){
            this.speakers[index].isMuted = !this.speakers[index].isMuted;
        }
    }

    getIsCustom(){
        return this.isCustom;
    }

    static from({id, speakers, ownerId, topicDetails, chatHistory, isCustom}: {id:string, speakers:RoomUser[], ownerId:string, topicDetails:TopicDetails, chatHistory:Message[], isCustom: boolean}){
        return new Room(id, speakers, ownerId, topicDetails, chatHistory, isCustom);
    }

    static new(id:string, isCustom: boolean){
        return new Room(id, [], "", {
            title: "",
            description: ""
        }, [], isCustom);
    }
}

const roomPool = new Map<string, boolean>();
export {Room, RoomUser, roomPool};
import {Endpoint} from "../config/Api";

export async function createRoom(){
    const options = {
        method: "POST"
    };

    const url = new URL(Endpoint + "/room");
    const response = await fetch(url, options);
    if(response.status !== 200){
        throw Error("Failed to create room");
    }else{
        const {roomId} = await response.json();
        return roomId;
    };
}

export async function findRoom(topicDetails, degree){
    let body = JSON.parse(JSON.stringify(topicDetails));
    body.degree = degree;
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        method: "POST"
    };
    const url = new URL(Endpoint + "/room/find");
    const response = await fetch(url, options);
    if(response.status !== 200){
        const {message} = await response.json();
        throw Error(message);
    }
    else{
        const {roomId} = await response.json();
        return roomId;
    }
}
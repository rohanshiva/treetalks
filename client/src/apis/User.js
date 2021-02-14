import {Endpoint} from "../config/Api";

export async function createUser(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    const response = await fetch(Endpoint + '/user', requestOptions);

    if (response.status != 200) {
        const message = `An error has occured: ${response.status}`;
        console.log(message);
    }
 
    const data = await response.json();
}

export async function getUser(id) {
    const response = await fetch(Endpoint + `/user/${id}`);
    if (response.status != 200) {
        const message = `An error has occured: ${response.message}`;
        console.log(message);
        
        const data = await response.json();
        console.log(data);
    }
    else{
        const data = await response.json();
        return data;
    }
}


import {users} from "./DB";


type User = {
    id:string 
}

export class UserService{
 
    static async createUser(id:string, email:string, username:string){
        await users.doc(id).set({
            email: email,
            username: username
        });

        return {
            id: id,
            email: email,
            username: username
        } as User;
    }

    static async updateUser(){

    }

    static async getUser(id: string){
        try{
            const userRef = users.doc(id);
            const userSnap = await userRef.get();
            let userData = userSnap.data();
            if(userData){
                userData.id = id;
                return userData as User;
            }
            else{
                throw Error(`User: ${id} does not exist`);
            }
        }
        catch(error){
            throw Error(error.message);
        }
    }

}
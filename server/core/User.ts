import {users} from "./DB";


type User = {
    id:string 
}

export class UserService{
 
    static async createUser(){

    }

    static async updateUser(){

    }

    static async getUser(id: string){
        try{
            const userRef = users.doc(id);
            const userSnap = await userRef.get();
            const userData = userSnap.data() as User;
            return userData;
        }
        catch(error){
            throw Error(error.message);
        }
    }

}
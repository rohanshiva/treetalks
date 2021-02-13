import express = require("express");
import { UserService } from "../core/User";

const userRouter = express.Router();

type CreateUser = {
    email: string,
    id: string,
    username: string
}

userRouter.post("/", async (req, res) => {
    const body = req.body;
    const fields = ["email", "id", "username"];
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
        const {email, id, username}:CreateUser = body;
        const userData = await UserService.createUser(id, email, username);
        res.send(userData); 
    }
});


userRouter.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    try{
        const userData = await UserService.getUser(id);
        res.send(userData);
    }
    catch(error){
        const message:string = error.message;
        if(message && message.endsWith("does not exist")){
            res.status(404).send({
                message: message
            });
        }
        else{
            res.status(500).send({
                message: message
            });
        }
    }
});

export default userRouter;
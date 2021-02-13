import express = require("express");
import { UserService } from "../core/User";

const userRouter = express.Router();


userRouter.post("/", (req, res) => {
    //create user
    res.send("Created User!");
});


userRouter.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    const userData = await UserService.getUser(id);
    res.send(userData);
});

export default userRouter;
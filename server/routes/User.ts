import express = require("express");

const userRouter = express.Router();


userRouter.post("/", (req, res) => {
    //create user
    res.send("Created User!");
});


userRouter.get("/:id", (req, res) => {
    const id: string = req.params.id;
    res.send({id: id});
});

export default userRouter;
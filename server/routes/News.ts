import {newsApi} from "../config/Config";
const fetch = require('node-fetch');
import express = require("express");

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
    let keyword = "social injustice";
    let url = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&pageSize=10&apiKey=${newsApi}`;
    const response = await fetch(url);
    if (response.status != 200) {
      res.status(500).send({message: "Unable to get news"});
    } else {
      const data = await response.json();
      res.send(data);
    }
});

export default newsRouter;
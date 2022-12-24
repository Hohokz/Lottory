import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { client } from "./utils/db.js";
import genRandomNum from "./app/randomnumber.js";

async function init() {
    const app = express();
    const port = 4000;

    await client.connect();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/random", genRandomNum)

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get("*", (req, res) => {
        res.status(404).send("Not found");
    });

    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}

init();


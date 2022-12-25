import { Router } from "express";
import { db } from "../utils/db.js";


const genRandomNum = Router();

genRandomNum.get("/", async (req, res) => {
    const collection = db.collection("randomNumber");
    const number = await collection.findOne({}, { sort: { _id: -1 } });

    return res.json({
        data: number,
    });
});


genRandomNum.post("/", async (req, res) => {



    const collection = db.collection("randomNumber");

    let frist = (Math.floor(Math.random() * (999) + 1)).toString().padStart(3, '0');
    let FirstPrizeLeft = (Number(frist) + 1).toString().padStart(3, '0');
    let FirstPrizeRight = (frist - 1).toString().padStart(3, '0');
    let second = (Math.floor(Math.random() * (999) + 1)).toString().padStart(3, '0');
    let twoNumber = (Math.floor(Math.random() * (99) + 1)).toString().padStart(2, '0');

    let randomNumberList = {
        randomFirstPrize: frist,
        randomSecondPrize: second,
        nearFirstPrizeLeft: FirstPrizeLeft,
        nearFirstPrizeRight: FirstPrizeRight,
        twoNumberPrize: twoNumber,
        createdAt: new Date()
    }
    const number = await collection.insertOne(randomNumberList);

    return res.json({
        message: `created successfully`,
        data: randomNumberList,
    });
});

genRandomNum.get("/check", async (req, res) => {

    console.log(req.query)

    let keyword = req.query.keyword;

    if (keyword.length !== 3) {
        return res.json({
            status: "fail",
            message: "คุณใส่เลขไม่ครบนะ"
        })
    }
    const collection = db.collection("randomNumber");
    const number = await collection.findOne({}, { sort: { _id: -1 } })
    const hitPrize = []


    if (keyword === number.randomFirstPrize) {
        hitPrize.push("ยินดีด้วยคุณถูกรางวัลที่ 1")
    } if (keyword === number.randomSecondPrize) {
        hitPrize.push("ยินดีด้วยคุณถูกรางวัลที่ 2")
    } if (keyword === number.nearFirstPrizeLeft || keyword === number.nearFirstPrizeRight) {
        hitPrize.push("ยินดีด้วยคุณถูกใกล้เคียงรางวัลที่รางวัลที่ 1")
    } if (keyword.substr(1, keyword.length) === number.twoNumberPrize) {
        hitPrize.push("ยินดีด้วยคุณถูกรางวัลเลขท้ายสองตัว")
    } if (hitPrize.length === 0) {
        hitPrize.push("เสียใจจริงๆ คุณไม่ถูกรางวัล")
    }

    return res.json({
        status: "success",
        data: hitPrize,
    })

})

export default genRandomNum;


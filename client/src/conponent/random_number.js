import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';


export default function RandomNumber() {

    const [randomNumber, setRandomNumber] = useState({
        randomFirstPrize: "xxx",
        nearFirstPrizeLeft: "xxx",
        nearFirstPrizeRight: "xxx",
        randomSecondPrize: "xxx",
        twoNumberPrize: "xxx"
    });

    function Generate() {

        const generateNumber = axios.post(`http://localhost:4000/random`)
            .then((response) => {
                setRandomNumber(response.data.data)
            }, (error) => {
                console.log(error);
            });

        useEffect(() => {
            generateNumber();
        }, []);

    }


    return (


        < div >
            <div>
                <button className="btn btn-primary mb-4" onClick={Generate}>ดำเนินการสุ่ม</button>
            </div>
            < div >
                <h1>รางวัลที่ 1 : {randomNumber.randomFirstPrize} </h1>
            </div >
            <div>
                <h2>รางวัลใกล้เคียงรางวัลที่ 1 : </h2><h2>{randomNumber.nearFirstPrizeLeft} , {randomNumber.nearFirstPrizeRight} </h2>
            </div>

            <div>
                <h3>
                    รางวัลที่ 2 : {randomNumber.randomSecondPrize}
                </h3>
            </div>
            <div>
                <h2>
                    รางวัลเลขท้ายสองตัว : {randomNumber.twoNumberPrize}
                </h2>
            </div>
        </div >

    );
}

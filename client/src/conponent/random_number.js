import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function RandomNumber() {

    const [randomNumber, setRandomNumber] = useState({
        randomFirstPrize: "",
        nearFirstPrizeLeft: "",
        nearFirstPrizeRight: "",
        randomSecondPrize: "",
        twoNumberPrize: ""
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
            < div >
                <h1>รางวัลที่ 1 : {randomNumber.randomFirstPrize} </h1>
            </div >
            <div>
                <h2>รางวัลใกล้เคียงรางวัลที่ 1 : {randomNumber.nearFirstPrizeLeft} </h2> <h2> , {randomNumber.nearFirstPrizeRight} </h2>
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

            <button onClick={Generate}>Generate for Reward</button>


        </div >

    );
}

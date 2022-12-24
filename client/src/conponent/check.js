import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from "lodash";

export default function NumberForm() {
    const [number, setNumber] = useState('');
    const [keyword, setKeyword] = useState('')
    const [randomNumber, setRandomNumber] = useState({
        randomFirstPrize: "",
        nearFirstPrizeLeft: "",
        nearFirstPrizeRight: "",
        randomSecondPrize: "",
        twoNumberPrize: ""
    });

    async function handleInputChange(event) {
        setKeyword(event)
        console.log(keyword)
        const response = await axios.get(`http://localhost:4000/check&keyword=${keyword}`)
        setNumber(response.data.data)
    };

    useEffect(() => {
        handleInputChange("");
    }, []);



    return (
        <form>
            <label>
                <input className='centered-input' onChange={debounce(handleInputChange, 500)} >
                </input>
            </label>
            <button type="button" >
                Check Number
            </button>
        </form>
    );
}


import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';


export default function NumberForm() {
    const [message, setMessage] = useState([]);
    const [keyword, setKeyword] = useState('')


    function Check() {

        const handeleCheckeNumber = axios.get(`http://localhost:4000/random/check`, {
            params: { keyword: keyword }
        })
            .then((response) => {
                console.log(response.data.data)
                if (response.data.status === "success") {
                    setMessage(response.data.data)
                    console.log(response.data)
                    console.log("123")
                } else (setMessage(response.data.message))
            }, (error) => {
                console.log(error);
            });

        useEffect(() => {
            handeleCheckeNumber();
        }, []);

    }



    return (
        <>
            <div className='mt-5'>
                <form >
                    <div>
                        <label>
                            <input className='rounded'
                                type='number'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)} >
                            </input>
                        </label>


                        <button className="btn btn-primary m-3 mb-4" type="button" onClick={Check}>
                            ตรวจผลรางวัล
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className='mt-3'>
                    {message}
                </h1>
            </div>
        </>
    );
}


import React from "react";
import Menu from "./conponent/header.js";
import RandomNumber from './conponent/random_number';
import NumberForm from "./conponent/check.js";
import './App.css'

function App() {
  return (
    <div className="App-header">
      <>
        <Menu />
        <RandomNumber />
        <NumberForm />
      </>

    </div>
  );

}

export default App;

import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";

import "./App.css";

const hardcodedNumber = 1;

function App() {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer < 1) return;

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="App">
      <h1>Barcode</h1>
      <Barcode value={hardcodedNumber} />
      <h1>00:{timer < 10 ? `0${timer}` : timer}</h1>
    </div>
  );
}

export default App;

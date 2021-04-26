import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";

import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [barcodeValue, setBarcodeValue] = useState(null);

  useEffect(() => {
    if (!barcodeValue) return fetchBarcodeValue();
    if (!timer) return;

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, barcodeValue]);

  const fetchBarcodeValue = () => {

    setBarcodeValue(null);

    fetch('https://jet-gull-7204.twil.io/generate-barcode').then((res) => {
      return res.json();
    }).then((data) => {
      setBarcodeValue(JSON.stringify(data.barcode));
      setTimer(30);
    }).catch((err) => {
      console.log(err);
      setBarcodeValue('error');
    })
  };

  const getTime = () => {
    return timer < 10 ? `00:0${timer}` : `00:${timer}`;
  }

  return (
    <div className="App">
      <h1>Barcode</h1>
      {barcodeValue ? <Barcode value={barcodeValue} /> : <span>Fetching Barcode</span>}
      <h2>{getTime()}</h2>
      {!timer && <button onClick={() => fetchBarcodeValue()}>Fetch Barcode</button>}
    </div>
  );
}

export default App;

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

  return (
    <div className="App">
      <h1>Barcode</h1>
      {barcodeValue ? <Barcode value={barcodeValue} /> : <span>Fetching Barcode</span>}
      <h1>00:{timer < 10 ? `0${timer}` : timer}</h1>
      {!timer && <button onClick={() => fetchBarcodeValue()}>Fetch Barcode</button>}
    </div>
  );
}

export default App;

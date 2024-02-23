import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import LatestBlocks from './latestBlocks';

function App() {
  const [latestBlocks, setlatestBlocks] = useState([]);
  return (
    <div className="App">
       <div className="App">
      <h1>Latest Blocks</h1>
      <LatestBlocks />
    </div>
    </div>
  );
}

export default App;

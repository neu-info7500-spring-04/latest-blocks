import React, { useEffect, useState } from 'react';

const LatestBlocks = () => {
  const [latestBlocks, setLatestBlocks] = useState([]);

  useEffect(() => {
    fetchLatestBlocks();
    const interval = setInterval(fetchLatestBlocks, 60000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchLatestBlocks = async () => {
    try {
      const response = await fetch('http://localhost:3131/getLatestBlocks'); 
      const data = await response.json();
      console.log(data);
  
      setLatestBlocks(data);
    } catch (error) {
      console.error('Error  data:', error);
    }
  };
  

  return (
    <div className='table-container'>
    <table>
      <thead>
        <tr>
          <th>Height</th>
          <th>Timestamp</th>
          <th>Transactions</th>
          <th>Size (KB)</th>
          <th>Weight (KWU)</th>
        </tr>
      </thead>
      <tbody>
        {latestBlocks.map((block, index) => (
          <tr key={index}>
            <td  className="light-blue">{block.height}</td>
            <td>{new Date(block.timestamp * 1000).toLocaleString()}</td>
            <td>{block.tx_count}</td>
            <td>{Math.round(block.size / 1024)}</td> 
            <td>{Math.round(block.weight / 1000)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );  
};

export default LatestBlocks;
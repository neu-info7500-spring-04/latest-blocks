// server.js (Backend)

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3131;

app.use(cors());

// Function to fetch the latest block height
async function fetchLatestBlockHeight() {
  try {
    const response = await axios.get('https://blockstream.info/api/blocks/tip/height');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest block height:', error);
    throw new Error('Failed to fetch latest block height');
  }
}

// Define a route to retrieve the latest 15 blocks
app.get('/getLatestBlocks', async (req, res) => {
  try {
    const latestHeight = await fetchLatestBlockHeight();
    const startHeight = latestHeight - 15;

    const response = await axios.get(`https://blockstream.info/api/blocks?limit=15&start_height=${startHeight}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    res.status(500).json({ error: 'Failed to fetch latest blocks' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

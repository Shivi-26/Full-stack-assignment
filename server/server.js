const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

// Create an API endpoint to fetch data
app.get('/api/data', cors(), (req, res) => {
  const results = [];
  fs.createReadStream('hotel_bookings_1000.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the Access-Control-Allow-Origin header
      res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

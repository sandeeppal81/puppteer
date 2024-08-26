const express = require("express");
const app = express();
const port = 3000;
const { scrape_session } = require('./index/index');
const path = require('path');

app.get("/", async function (req, res) {
  try {
    await scrape_session();
    res.send('Screenshot taken and saved successfully.');
  } catch (error) {
    console.error('Error in scrape_session:', error);
    res.status(500).send('An error occurred while taking the screenshot.');
  }
});

app.get('/screenshot', async function (req, res) {
  try {
    res.sendFile('/usr/src/app/screenshot.png');
  } catch (error) {
    console.error("Error sending the file:", error);
    res.status(500).send("An error occurred while sending the file.");
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

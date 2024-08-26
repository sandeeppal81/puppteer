const express = require("express");
const app = express();
const port = 3000;
const scrape_session = require('./index/index').scrape_session;

app.get("/", async function (req, res) {
  res.send("Hello World!");

  try {
    await scrape_session();
  } catch (error) {
    console.log('Error in scrape_session:', error);
  }

});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


async function tryCatchCallback(callback, ...args) {
  try {
      await callback(...args)
  } catch (err){
  }
}


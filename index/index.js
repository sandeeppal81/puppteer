const express = require('express');
const { PuppeteerSession } = require('./utils_puppeteer');
const app = express();


async function scrape_session() {

    const default_options = {
        device_width: 1600,
        device_height: 720,
        cookies_path: './sessions/cookies.json',
        user_data_path: './sessions/user_data',
        headless: true
    }

    const pupp_session = new PuppeteerSession(default_options);
    await pupp_session.launch_docker_pupp();

     const page = pupp_session.page;
     await page.goto('https://www.google.com')

}

module.exports = {scrape_session};

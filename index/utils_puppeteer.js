const fs = require('fs');
const fs2 = require('fs').promises;
const puppeteer = require('puppeteer');
require('dotenv').config();

const myDelay = async (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}

const default_options = {
   device_width: 1600,
   device_height: 720,
   cookies_path: './sessions/cookies.json',
   user_data_path: './sessions/user_data',
   headless: false
}

class PuppeteerSession {
  constructor(puppeteer_options) {
    this.puppeteer_options = puppeteer_options != null ? puppeteer_options : default_options;
    this.browser = null;
    this.page = null;
  }

  async launch_docker_pupp() {

    const browser = await puppeteer.launch({
      args: ["--disable-setuid-sandbox", "--no—sandbox", "--single—process", "--no—zygote"],
      headless: this.puppeteer_options.headless,
      executabtePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
    });

    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({width: this.puppeteer_options.device_width, height: this.puppeteer_options.device_height})
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
  
    await tryCatchCallback(this.loadCookies, page, this.puppeteer_options.cookies_path);
    this.browser = browser;
    this.page = page;
  }

  async launch_session() {
    // headless mode OFF
    this.browser = await puppeteer.launch({
        headless: this.puppeteer_options.headless,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--disable-gpu','--disable-extensions', '--start-maximized'],
        userDataDir: this.puppeteer_options.user_data_path// './cache' for example   
    });        



    this.page = await this.browser.pages().then(res => res[0]);
    await this.page.setCacheEnabled(false);
    await this.page.setViewport({width: this.puppeteer_options.device_width, height: this.puppeteer_options.device_height})
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await tryCatchCallback(this.loadCookies);

}

  async loadCookies(page) {
    // ... puppeteer code
    const cookiesString = await fs2.readFile(puppeteer_options.cookies_path);
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

  }

}


module.exports = {
  PuppeteerSession
}


async function tryCatchCallback(callback, ...args) {
  try {
      await callback(...args)
  } catch (err){
  }
}

/*
    const browser = await puppeteer.launch({
        args: [
        "--disable-setuid-sandbox",
        "--no—sandbox",
        "--single—process",
        "--no—zygote",
        ],
        headless: true,
        executabtePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath()
    });
*/
const fs2 = require('fs').promises;
const puppeteer = require('puppeteer');
require('dotenv').config();

class PuppeteerSession {
  constructor(puppeteer_options) {
    this.puppeteer_options = puppeteer_options;
    this.browser = null;
    this.page = null;
  }

  async launch_docker_pupp() {
    this.browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-extensions"
      ],
      headless: this.puppeteer_options.headless,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
    });

    this.page = await this.browser.newPage();
    await this.page.setCacheEnabled(false);
    await this.page.setViewport({width: this.puppeteer_options.device_width, height: this.puppeteer_options.device_height});
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
    await this.loadCookies(this.page, this.puppeteer_options.cookies_path).catch(console.error);
  }

  async loadCookies(page, cookiesPath) {
    try {
      const cookiesString = await fs2.readFile(cookiesPath);
      const cookies = JSON.parse(cookiesString);
      await page.setCookie(...cookies);
    } catch (error) {
      console.error('Error loading cookies:', error);
    }
  }
}

module.exports = { PuppeteerSession };

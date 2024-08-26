const { PuppeteerSession } = require('./utils_puppeteer');

async function scrape_session() {
    const default_options = {
        device_width: 1600,
        device_height: 720,
        cookies_path: '/usr/src/app/sessions/cookies.json',
        user_data_path: '/usr/src/app/sessions/user_data',
        headless: true
    };

    const pupp_session = new PuppeteerSession(default_options);

    try {
        await pupp_session.launch_docker_pupp();
        const page = pupp_session.page;
        await page.goto('https://www.google.com', { waitUntil: 'networkidle0' });
        await page.screenshot({path: '/usr/src/app/screenshot.png'});
    } catch (error) {
        console.error('Error during scraping session:', error);
        throw error;
    } finally {
        if (pupp_session.browser) {
            await pupp_session.browser.close().catch(console.error);
        }
    }
}

module.exports = { scrape_session };

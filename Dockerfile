FROM ghcr.io/puppeteer/puppeteer:latest

ENV CHROME_DEVEL_SANDBOX /usr/local/sbin/chrome-devel-sandbox

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

# Starting our application
CMD ["node", "./app.js"]


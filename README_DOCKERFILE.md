
# Use the official Node.js 14 LTS image as the base image
FROM node:14-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the default Puppeteer port
EXPOSE 8080

# Set the entrypoint script
ENTRYPOINT [ "node", "app.js" ]
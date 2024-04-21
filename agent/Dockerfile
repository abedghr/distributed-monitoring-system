FROM node:21.1.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN npm run build

# Expose port if your app listens on a specific port
# EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
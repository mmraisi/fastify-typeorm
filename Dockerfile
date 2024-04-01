# Use Node.js v18 as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .
COPY .env .

# Build the TypeScript code
RUN npm run build

# Expose port 4000 to the outside world
EXPOSE 4000

# Command to run the application
CMD ["node", "dist/src/index.js"]
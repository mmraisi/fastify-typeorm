# Use Node.js v18 as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package*.json .

# Install dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code to the working directory
COPY --chown=node:node . .
COPY --chown=node:node .env .

# Build the TypeScript code
RUN npm run build

# Expose port 4000 to the outside world
EXPOSE 4000

# Create a new user and switch to that user
USER node

# Command to run the application
CMD ["node", "dist/src/index.js"]

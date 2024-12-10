
# Use the official Node.js 18 image as the base image
FROM node:18

ARG IMAGE_VERSION
LABEL version=$IMAGE_VERSION


# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]


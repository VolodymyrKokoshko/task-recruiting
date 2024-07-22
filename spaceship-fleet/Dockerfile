# Use an official Node.js runtime as a parent image
FROM node:15.14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages
RUN npm install

# Build the React app for production
RUN npm run build

# Use an official nginx image as the base image
FROM nginx:alpine

# Copy the built app to the nginx html directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]

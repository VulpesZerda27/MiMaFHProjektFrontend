# Use Node.js to build the frontend assets
FROM node:14 AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY ./ ./

# Build the frontend
RUN npm run build

# Use a lightweight image like nginx to serve the frontend
FROM nginx:1.19

# Copy the built assets from the build stage to the nginx directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

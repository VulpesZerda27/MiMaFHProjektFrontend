# Use a lightweight image like nginx to serve the frontend
FROM nginx:1.19

# Set the working directory in the image
WORKDIR /usr/share/nginx/html

# Copy the HTML, JS, and CSS files to the nginx directory
COPY ./html ./html
COPY ./js ./js
COPY ./css ./css
COPY ./index.html .

# Expose port 80 (nginx default)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

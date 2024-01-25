# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Set the working directory in the container to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the entire project directory (i.e. all HTML, CSS, JS files) to the working directory in the container
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Run Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
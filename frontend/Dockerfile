FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli@20

# Copy source code
COPY . .

# Expose port
EXPOSE 4200

# Start Angular dev server
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--ssl", "--ssl-key", "/app/certs/localhost-key.pem", "--ssl-cert", "/app/certs/localhost.pem"]
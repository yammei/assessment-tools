FROM node:alpine

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps \
    python3 \
    make \
    g++ \
    && npm install -g node-gyp \
    && npm install sqlite3 \
    && apk del .build-deps

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application files
COPY . .

# Expose ports (if necessary)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

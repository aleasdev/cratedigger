# Start with a computer that has Node.js already installed
FROM node:18-alpine

# Make a folder to work in
WORKDIR /app

# Copy the instruction manual (package.json)
COPY package*.json ./

# Buy all the toys we need (install dependencies)
RUN npm install

# Copy all our toy files
COPY . .

# Tell Docker we'll use door number 5173
EXPOSE 5173

# When we open the lunchbox, start the toy (run the website)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
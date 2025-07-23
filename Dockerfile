FROM node:lts-slim as runtime

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install

COPY . .

RUN npm run build || (echo "Build failed!" && npm run build --verbose && exit 1)

EXPOSE 3000

# Start the app
CMD ["npm", "start"]
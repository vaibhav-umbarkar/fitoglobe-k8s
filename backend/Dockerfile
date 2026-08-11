FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN apt-get update && apt-get install -y openssl
RUN npx prisma generate
EXPOSE 5000
CMD ["node", "src/server.js"]


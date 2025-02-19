FROM node:20-alpine
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
RUN npm run build --if-present
RUN npm prune --omit=dev --legacy-peer-deps
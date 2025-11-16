FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY ./src src/
ENV VITE_APP_NAMES_URL=http://localhost:3031
RUN npm run build
FROM node:22-alpine AS runner
COPY package.server ./package.json
RUN npm install
COPY server.js ./
COPY --from=builder /app/dist ./app/html
ENV DEST=/app/html
CMD ["node", "server.js"]
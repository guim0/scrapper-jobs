FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app


COPY server/package*.json ./
RUN npm install


COPY server/ .

EXPOSE 3000

CMD ["node", "index.js"]
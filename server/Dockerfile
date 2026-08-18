FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

COPY server/package*.json ./
RUN npm install
# Garante a instalação do binário do Chromium no container
RUN npx playwright install chromium --with-deps

COPY server/ .

EXPOSE 3000
CMD ["node", "index.js"]
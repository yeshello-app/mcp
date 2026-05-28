FROM node:22-slim

WORKDIR /app

RUN npm init -y && npm install @modelcontextprotocol/sdk zod

COPY server.mjs .

EXPOSE 3000

CMD ["node", "server.mjs"]

FROM node:22.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# Expor a porta 3000
ENV PORT=3000
EXPOSE ${PORT}

# Copiar e configurar o script de inicialização
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
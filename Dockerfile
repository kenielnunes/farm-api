FROM node:22.16.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000

# Criar script de inicialização
RUN echo '#!/bin/sh\nnpm run migration:run\nnpm run start:prod' > /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
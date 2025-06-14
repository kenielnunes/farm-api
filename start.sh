#!/bin/sh

# Função para verificar se o banco está acessível
wait_for_db() {
  echo "Waiting for database..."
  while ! nc -z $DB_HOST $DB_PORT; do
    sleep 1
  done
  echo "Database is up!"
}

# Instalar netcat para verificar a conexão
apk add --no-cache netcat-openbsd

# Esperar o banco estar disponível
wait_for_db

# Rodar migrações
npm run migration:run

# Garantir que a aplicação está escutando na porta correta
export PORT=${PORT:-3000}

# Iniciar a aplicação
npm run start:prod 
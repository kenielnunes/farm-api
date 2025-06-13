# Farm API

API para gerenciamento de fazendas desenvolvida com NestJS e Clean Architecture.

## 🚀 Tecnologias

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
- Clean Architecture

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

## 🔧 Configuração

1. Clone o repositório:
```bash
git clone https://github.com/kenielnunes/farm-api.git
cd farm-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=farm_db

# Application
PORT=3000
NODE_ENV=development
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações:
```bash
npm run migration:run
```

## 🚀 Executando o projeto

### Desenvolvimento
```bash
npm i

npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

## 📝 Scripts Disponíveis

- `npm run start:dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto
- `npm run start:prod`: Inicia o servidor em modo produção
- `npm run lint`: Executa o linter
- `npm run test`: Executa os testes
- `npm run migration:generate`: Gera uma nova migração
- `npm run migration:run`: Executa as migrações pendentes
- `npm run migration:revert`: Reverte a última migração

## 📚 Documentação da API

A documentação da API está disponível em `/api` quando o servidor estiver rodando.

## 🏗️ Estrutura do Projeto

```
src/
├── config/                 # Configurações da aplicação
├── database/              # Migrações e seeds
├── modules/               # Módulos da aplicação
│   ├── cultures/         # Módulo de culturas
│   ├── farms/           # Módulo de fazendas
│   └── producers/       # Módulo de produtores
│   └── dashboard/       # Módulo de dashboard
└── shared/              # Código compartilhado
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Link do projeto: [https://github.com/kenielnunes/farm-api](https://github.com/kenielnunes/farm-api)

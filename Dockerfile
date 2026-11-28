# Sobe o serviço da bilheteria em http://localhost:3000
#   docker build -t bilheteria .
#   docker run --rm -p 3000:3000 bilheteria
FROM node:22-alpine

WORKDIR /app

# Dependências primeiro, para o Docker reaproveitar esta camada quando só o código mudar.
# O npm ci instala também as de desenvolvimento: o tsx é quem roda o TypeScript no npm start.
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000
CMD ["npm", "start"]

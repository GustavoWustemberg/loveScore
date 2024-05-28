# Use a imagem oficial do Node.js como base
FROM node:21.5.0

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Constrói o aplicativo Next.js
RUN npm run build

# Expõe a porta em que o servidor Next.js irá escutar
EXPOSE 3000

# Comando para executar o servidor quando o contêiner for iniciado
CMD ["npm", "run", "dev"]

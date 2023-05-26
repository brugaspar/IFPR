# Configuração do back-end

## Instalação do <strong>Node.js</strong>

Acessar o site do Node.js e instalar a versão mais recente:
<br/>
https://nodejs.org/en/download/

Após esse download estará disponível no terminal os comandos:

<code>node</code> e <code>npm</code>

Sendo o <strong>npm</strong> um "package manager".

<br/>

## Instalação do <strong>Yarn</strong>

O Yarn é um "package manager" um pouco mais rápido que o <strong>npm</strong>, por isso é recomendado o seu uso.

Para instalar, basta rodar no terminal o comando:

<code>npm install -g yarn</code>

Isso instalará o Yarn globalmente na máquina em questão.

<br/>

## Configuração do ambiente

### <strong>Instalação das dependências</strong>

Para começar com a configuração do ambiente do back-end, é preciso estar na pasta do projeto. Após isso, com o terminal aberto, basta rodar o comando:

<code>yarn</code>

Esse comando atualiza todas as dependências do projeto, criando ou atualizando o conteúdo da pasta <strong>node_modules</strong>.

### <strong>Criar e preencher arquivo ".env"</strong>

O arquivo ".env" é um arquivo onde deve conter todas as variáveis de ambiente do projeto, como tokens sensíveis por exemplo.

Na raíz do projeto tem um arquivo chamado ".env.example", que contém a estrutura básica que deve ser preenchido, então basta criar manualmente o arquivo ".env" ou rodar no terminal:

<code>cp .env.example .env</code>

Assim, resta apenas preencher os dados necessários no arquivo. Sendo eles:

- PORT: A porta da aplicação.
- ADMIN_ID: Um ID gerado para o usuário "padrão" do sistema, precisa ser um UUID, então pode ser gerado online em qualquer site de "uuid generator".
- JWT_SECRET_TOKEN: Token para gerar os próximos hash de criptografia para as requisições feitas pelos usuários. Deve ser uma string hexadecimal, pode ser gerada via terminal com os comandos:
- - <code>node</code>: Para entrar no "terminal do node".
- - <code>require("crypto").randomBytes(32).toString("hex")</code>: Para gerar uma string em hexadecimal.
- MASTER_ADMIN_ID: Usado para gerar o ID do usuário master. Deve ser gerado igual o JWT_SECRET_TOKEN.
- DATABASE_URL: URL usada para o Prisma (ORM) se conectar ao banco de dados. Substituir USER, PASSWORD e DATABASE_NAME pelos dados do PostgreSQL do seu ambiente.
- PASSWORD_FIRST e PASSWORD_LAST: Conjunto de senhas informado para acessar a aplicação com usuário master.

<br/>

## Rodar as "migrations" e as "seeds"

O Prisma (ORM) deve rodar todas as "migrations" para criação das tabelas e estruturas necessárias no banco de dados, assim como as "seeds", para inserção de dados padrão da aplicação, como as cidades e estados. Para isso, deve-se rodar o comando:

<code>yarn prisma migrate dev</code>

Esse comando cria as "migrations". E deve-se rodar também o comando:

<code>yarn prisma db seed</code>

Esse comando cria as "seeds".

<br/>

## Iniciar aplicação

Por fim, deve-se rodar o comando:

<code>yarn dev</code>

Esse comando vai abrir o servidor na porta informada no ".env" e vai começar a escutar as requisições feitas através das rotas.

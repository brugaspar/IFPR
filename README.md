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

### <strong>Criar e preencher arquivo ".env.local"</strong>

O arquivo ".env.local" é um arquivo onde deve conter todas as variáveis de ambiente do projeto, como tokens sensíveis por exemplo.

Na raíz do projeto tem um arquivo chamado ".env.local.example", que contém a estrutura básica que deve ser preenchido, então basta criar manualmente o arquivo ".env.local" ou rodar no terminal:

<code>cp .env.local.example .env.local</code>

Assim, resta apenas preencher os dados necessários no arquivo. Sendo apenas:

<strong>NEXT_PUBLIC_API_URL</strong>: URL da aplicação back-end, pode ser:

<code>http://{HOST_LOCAL}:{PORT}/api/v1</code>

ou

<code>http://{HOST_REMOTO}:{PORT}/api/v1</code>

Sendo o primeiro em ambiente de desenvolvimento, algo como "localhost" ou IP da máquina e o segundo caso esteja hospedado em algum lugar, sendo o site ou domínio remoto.

<br/>

## Iniciar aplicação

Por fim, deve-se rodar o comando:

<code>yarn dev</code>

Esse comando vai abrir o front-end na porta padrão, normalmente 3000, caso esteja disponível. Basta ir em qualquer navegador e acessar:

<code>http://localhost:{PORT}</code>

O "PORT" será informado no terminal que for rodado o comando para iniciar a aplicação.

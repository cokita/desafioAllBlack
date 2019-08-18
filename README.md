# Desafio AllBlack

Utilizei a metodologia REST, onde na pasta API está o Backend  e na pasta front, está o FRONTEND.

Para este desafio foi utilizado as seguintes ferramentas/frameworks:

  1) Laravel 5.8
    Com os seguintes requisitos:
        PHP >= 7.1.3
        BCMath PHP Extension
        Ctype PHP Extension
        JSON PHP Extension
        Mbstring PHP Extension
        OpenSSL PHP Extension
        PDO PHP Extension
        Tokenizer PHP Extension
        XML PHP Extension
        
  2) Banco de dados Mysql 
    Obs: Deve ser configurado os parâmetros de conexão no .env, caso não exista, copie o .env.example e renomeie para .env: 
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_DATABASE=homestead
      DB_USERNAME=homestead
      DB_PASSWORD=secret
      
  3) Angular 8, requer Node >= v10.9
    Bootstrap 4 (getbootstrap.com)
    Angular Material (material.angular.io)
      
# Requisitos para a Instalação (exceto os acima citados):
  1) Composer
  2) NPM 
      
# Procedimentos para funcionamento:
  1) BANCO:
    . Entre no seu banco de dados e crie um banco de dados chamado "desafio";
    . Vá na raiz da api, no arquivo .env, na configuração DB_DATABASE, coloque o nome do banco criado: "desafio"
    
  2) API:
    . Caso não tenha feito, copie o arquivo .env.example e renomeie para .env
    . Entre na raiz da API, e execute o comando: composer install
    . Dê permissão de escrita nas pastas: "storage" e "bootstrap"
    . Execute na raiz: php artisan key:generate
    . Execute na raiz: php artisan migrate
    . Para executar, utilize o comando na raiz: php artisan serve
    
  3) FRONT:
    . Entre na raiz e execute: npm install
    . Execute ng serve
    
  

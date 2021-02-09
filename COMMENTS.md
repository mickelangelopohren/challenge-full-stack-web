# GRUPO A - Sistema de Alunos

### Sobre
Sistema para gerenciamento de alunos para a prova da Grupo A, utilizando Docker, Node com Express, Vue com Vuetify e banco de dados Mysql.

### Instalação
Para conseguir utilizar esta aplicação para desenvolvimento e testes, você precisará ter instalado em sua máquina, os requisitos abaixo:

| Plugin | README |
| ------ | ------ |
| Git | https://git-scm.com/downloads |
| Docker | https://docs.docker.com/install |
| Docker Compose | https://docs.docker.com/compose/install |

Após concluída a instalação do itens acima clone o repositório:
```sh
$ git clone https://github.com/mickelangelopohren/challenge-full-stack-web
$ cd challenge-full-stack-web
```
**Os comandos docker devem ser executados a partir da pasta ‘answer’:**
```sh
$ cd answer
```
Para subir a aplicação, dentro da pasta 'answer' utilize o comando:
```sh
$ docker-compose up -d 
```
Execute as migrations
```sh
$ docker exec -it backend-grupoa npm run migrate:up
```
Realizando testes do backend
```sh
$ docker exec -it backend-grupoa npm run test
```
Acessando no navegador
| Backend | Frontend |
| ------ | ------ |
| localhost:3000 | localhost:8080 |

### Rotas da Api
| Tipo | URL | Descrição |
| ------ | ------ |------ |
| POST | /students | Criação de um aluno |
| GET | /students | Listagem de alunos |
| GET | /students/:studentId | Busca aluno por id |
| PATCH | /students/:studentId | Alteração de um aluno por id |
| DELETE | /students/:studentId | Deleção de um aluno por id |

###  Lista de bibliotecas de terceiros utilizadas
| Backend | Frontend |
| ------ | ------ |
| cors | axios |
| express | core-js |
| express-validation | vue |
| mysql2 | vue-router |
| sequelize | vuetify |
| sqlite3 | @vue/cli-plugin-babel |
| eslint | @vue/cli-plugin-eslint |
| eslint-config-airbnb-base | @vue/cli-plugin-router |
| eslint-plugin-import | @vue/cli-service |
| jest | babel-eslint |
| nodemon | eslint |
| sequelize-cli | eslint-plugin-vue |
| supertest | sass |
| | sass-loader |
| | vue-cli-plugin-vuetify |
| | vue-template-compiler |
| | vuetify-loader |


#### Melhorias
- Autenticação de usuário administrativo
- Validação da estrutura do cpf do aluno
- Testes no frontend
- Logs backend
- Paginação na listagem de alunos no frontend
- Aprimorar testes no backend
- Mensagens no frontend com sucessos e erros

#### Requisitos não atendidos
- Gerenciamento de alunos permitido apenas para usuários administrativos
- Teste unitarios no Frontend

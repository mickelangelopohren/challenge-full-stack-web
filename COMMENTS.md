# GRUPO A - Sistema de Alunos

### Sobre
Sistema para gerenciamento de alunos para a prova da Grupo A, utilizando Docker, Node com Express, Vue com Vuetify e banco de dados Mysql.

### Instalação
Este é um projeto em node e vue utilizando docker, para conseguir utilizar esta aplicação para desenvolvimento e testes, você precisará ter instalado em sua máquina, os requisitos abaixo:

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
**Os comando docker devem ser executados a partir da pasta ‘answer’:**
```sh
$ cd answer
```
Para subir a aplicação, dentro da pasta 'answer' utilize o comandos:
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
Accessando no navegador
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

#### Requisitos obrigatórios que não foram entregues
-  Gerenciamento de alunos apenas para usuários administrativos
-  Modal de confirmação para excluir aluno

### Licença
MIT
Copyright © 2021 Mickelangelo Pohren Dos Santos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

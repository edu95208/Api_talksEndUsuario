# Gerenciamento de Tarefas API

Todas as rotas deverão se comportar assim como está previsto na documentação abaixo:
Cadastro de Usuário - POST /users
Padrão de Corpo
```json
{
    "name": "John Doe",
    "email": "johndoe@email.com",
    "password": "12345678"
}
```
Resposta Padrão (STATUS 201)
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```
Possíveis Erros
STATUS (409) - E-mail já cadastrado
```json
{ "message": "This email is already registered" }
```
STATUS (400) - Corpo da requisição não compatível com o padrão
Login de Usuário - POST /user/login
Padrão de Corpo
```json
{
    "email": "johndoe@email.com",
    "password": "12345678"
}
```
Resposta Padrão (STATUS 200)
```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}
```
Possíveis Erros
STATUS (404) - Usuário não existente
```json
{ "message": "User not exists" }
```
STATUS (401) - E-mail e senha não correspondem
```json
{ "message": "Email and password doesn't match" }
```
STATUS (400) - Corpo da requisição não compatível com o padrão
Recuperação de Usuário - GET /users/profile (Requer Autorização)
Resposta Padrão (STATUS 200)
```json
{
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```
Gerenciamento de Token
O gerenciamento do JSON Web Token deverá ser criado com base nos exemplos apresentados em aula.

Possíveis Erros na Validação de Token
STATUS (401) - O token é obrigatório
```json
{ "message": "Token is required" }
```
STATUS (401) - Token inválido. Mensagem de erro será gerada pelo próprio JSON Web Token.

### Criação de tarefa POST /tasks

Padrão de corpo

```json
{
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "categoryId?": 1,
}
```

Padrão de resposta  (STATUS: 201)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks

Padrão de resposta  (STATUS: 200)

```json
[
    {
        "id": 1,
        "title": "Lorem ipsum",
        "content": "Lorem ipsum",
        "finished": false,
        "category": {
            "id": 1,
            "name": "Estudo",
        }
    }  
]  
```

URL Search Params

| Parâmetro | Exemplo de uso | Descrição |
| ------ | ------ | ------ |
| category | /tasks?category=estudo | Forneça o "id" da categoria para trazer somente tarefas da categoria determinada |

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

### Leitura de individual GET /tasks/:1

Padrão de resposta  (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": false,
    "category": {
        "id": 1,
        "name": "Estudo"
    }
}   
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

### Atualizar tarefa PATCH /tasks/:id

Padrão de corpo 

```json
{
    "title?": "Lorem ipsum",
    "content?": "Lorem ipsum",
    "finished?": true,
    "categoryId?": 1,
}
```

Padrão de resposta (STATUS: 200)

```json
{
    "id": 1,
    "title": "Lorem ipsum",
    "content": "Lorem ipsum",
    "finished": true,
    "categoryId": 1,
}    
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa PATCH /tasks/:id

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
    "message": "Task not found"
}
```

### Criação de categoria POST /categories

Padrão de corpo

```json
{
    "name": "Example",
}
```

Padrão de resposta (STATUS 201)

```json
{
    "id": 1,
    "name": "Example",
}
```

#### Possíveis erros:

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria POST

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
    "message": "Category not found"
}
```

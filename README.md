# Sistema de Empréstimo de Equipamentos

API REST desenvolvida em Java com Spring Boot para gerenciar o empréstimo e a devolução de equipamentos, controlar a disponibilidade dos itens e acompanhar os empréstimos realizados por colaboradores.

## Tecnologias utilizadas

- Java 25
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- Banco de dados H2
- JUnit 5
- Postman

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de equipamentos.
- Cadastro e consulta de colaboradores.
- Registro de empréstimos e devoluções.
- Controle automático da disponibilidade dos equipamentos.
- Prazo de empréstimo de 14 dias.
- Identificação de empréstimos atrasados.
- Consulta dos empréstimos de cada colaborador.
- Aplicação de regras de negócio para evitar inconsistências.

## Regras de negócio

O sistema implementa as seguintes regras:

1. Não permite cadastrar equipamentos com patrimônio duplicado.
2. Todo equipamento novo começa disponível.
3. Não permite cadastrar colaboradores com e-mail duplicado.
4. Não permite emprestar equipamentos indisponíveis.
5. Ao realizar um empréstimo, registra a data atual e define o prazo de devolução em 14 dias.
6. Não permite devolver um empréstimo mais de uma vez.
7. Ao registrar uma devolução, atualiza a data e libera o equipamento.
8. Identifica empréstimos em atraso quando a data prevista de devolução já passou e não existe registro de devolução.
9. Não permite excluir equipamentos que possuem histórico de empréstimos.
10. Não permite que colaboradores com empréstimos atrasados realizem novos empréstimos.

## Como executar o projeto

### Pré-requisitos

- Java 25 ou compatível com a versão configurada no projeto.
- Maven.

### Executando localmente

Clone o repositório:

```bash
git clone https://github.com/Maryzix/emprestimo.git
```

Entre na pasta do projeto:

```bash
cd emprestimo
```

Execute a aplicação:

```bash
mvn spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

O projeto utiliza o banco de dados H2 em modo arquivo, configurado no `application.properties`.

## Rotas da API

### Equipamentos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/equipamentos` | Lista equipamentos |
| GET | `/equipamentos?tipo=NOTEBOOK` | Filtra por tipo |
| GET | `/equipamentos?disponivel=true` | Filtra por disponibilidade |
| GET | `/equipamentos/{id}` | Busca equipamento por ID |
| POST | `/equipamentos` | Cadastra equipamento |
| PUT | `/equipamentos/{id}` | Atualiza equipamento |
| DELETE | `/equipamentos/{id}` | Exclui equipamento |

### Colaboradores

| Método | Rota | Descrição |
|---|---|---|
| GET | `/colaboradores` | Lista colaboradores |
| GET | `/colaboradores/{id}` | Busca colaborador por ID |
| GET | `/colaboradores/{id}/emprestimos` | Lista empréstimos do colaborador |
| POST | `/colaboradores` | Cadastra colaborador |

### Empréstimos

| Método | Rota | Descrição |
|---|---|---|
| GET | `/emprestimos` | Lista empréstimos |
| GET | `/emprestimos?atrasados=true` | Lista empréstimos atrasados |
| GET | `/emprestimos/{id}` | Busca empréstimo por ID |
| POST | `/emprestimos?equipamentoId=1&colaboradorId=2` | Registra empréstimo |
| PUT | `/emprestimos/{id}/devolucao` | Registra devolução |

## Testes automatizados

Os testes unitários foram desenvolvidos com JUnit 5.

Para executar os testes:

```bash
mvn clean test
```

O projeto possui testes para as entidades `Equipamento` e `Emprestimo`, verificando comportamentos como disponibilidade, empréstimo, devolução e identificação de atrasos.

## Deploy

**Plataforma:** Render

**URL da API:** https://emprestimo-api-o91o.onrender.com/

## Autor

Desenvolvido como projeto prático de aprendizagem em Java e Spring Boot.

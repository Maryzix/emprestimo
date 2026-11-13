package com.projeto.emprestimo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmprestimoApplication {
	public static void main(String[] args) {
		SpringApplication.run(EmprestimoApplication.class, args);
	}
}

//POST /recados com { "autor": "Ana", "texto": "Bom dia, turma!" } → 201, e o recado volta com id 1.

//Mais dois recados, com autores diferentes.

//GET /recados → os três recados.

//Parar o servidor, rodar de novo e fazer GET /recados → os três continuam lá.

//No console do H2: SELECT * FROM RECADO;
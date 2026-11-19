package com.projeto.emprestimo;

import com.projeto.emprestimo.model.Emprestimo;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class EmprestimoTest {

	@Test
	void deveDefinirDatasCorretamenteAoCriarEmprestimo() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);

		// Act
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);

		// Assert
		assertEquals(hoje, emprestimo.getDataEmprestimo());
		assertEquals(hoje.plusDays(14), emprestimo.getDataPrevistaDevolucao());
	}

	@Test
	void deveRegistrarDataAoDevolverEmprestimo() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);
		LocalDate dataDevolucao = hoje.plusDays(5);

		// Act
		emprestimo.devolver(dataDevolucao);

		// Assert
		assertEquals(dataDevolucao, emprestimo.getDataDevolucao());
	}

	@Test
	void naoDevePermitirDevolverEmprestimoDuasVezes() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);
		emprestimo.devolver(hoje.plusDays(5));

		// Act e Assert
		assertThrows(IllegalStateException.class, () -> {
			emprestimo.devolver(hoje.plusDays(6));
		});
	}

	@Test
	void deveIdentificarEmprestimoEmAtraso() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);

		// Act
		boolean atrasado = emprestimo.estaAtrasadoEm(hoje.plusDays(15));

		// Assert
		assertTrue(atrasado);
	}

	@Test
	void naoDeveConsiderarAtrasadoAntesDaDataPrevista() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);

		// Act
		boolean atrasado = emprestimo.estaAtrasadoEm(hoje.plusDays(10));

		// Assert
		assertFalse(atrasado);
	}

	@Test
	void naoDeveConsiderarAtrasadoNaDataPrevista() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);

		// Act
		boolean atrasado = emprestimo.estaAtrasadoEm(hoje.plusDays(14));

		// Assert
		assertFalse(atrasado);
	}

	@Test
	void naoDeveConsiderarAtrasadoEmprestimoJaDevolvido() {
		// Arrange
		LocalDate hoje = LocalDate.of(2026, 11, 18);
		Emprestimo emprestimo = new Emprestimo(1L, 2L, hoje);
		emprestimo.devolver(hoje.plusDays(20));

		// Act
		boolean atrasado = emprestimo.estaAtrasadoEm(hoje.plusDays(21));

		// Assert
		assertFalse(atrasado);
	}
}



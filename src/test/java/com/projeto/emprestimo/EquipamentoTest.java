package com.projeto.emprestimo;

import com.projeto.emprestimo.model.Equipamento;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EquipamentoTest {

    @Test
    void deveFicarIndisponivelAoSerEmprestado() {
        // Arrange
        Equipamento equipamento = new Equipamento();
        equipamento.setPatrimonio("PAT-001");
        equipamento.setNome("Notebook");

        // Act
        equipamento.emprestar();

        // Assert
        assertFalse(equipamento.isDisponivel());
    }

    @Test
    void naoDevePermitirEmprestimoDeEquipamentoIndisponivel() {
        // Arrange
        Equipamento equipamento = new Equipamento();
        equipamento.setPatrimonio("PAT-002");
        equipamento.setNome("Projetor");
        equipamento.setDisponivel(false);

        // Act e Assert
        assertThrows(IllegalStateException.class, equipamento::emprestar);
    }

    @Test
    void deveFicarDisponivelAoSerDevolvido() {
        // Arrange
        Equipamento equipamento = new Equipamento();
        equipamento.setPatrimonio("PAT-003");
        equipamento.setNome("Monitor");
        equipamento.setDisponivel(false);

        // Act
        equipamento.devolver();

        // Assert
        assertTrue(equipamento.isDisponivel());
    }
}

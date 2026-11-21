package com.projeto.emprestimo.atividades.atividadesSpring.dto;

import jakarta.validation.constraints.NotNull;

public record EmprestimoRequest(
        @NotNull(message = "O equipamento é obrigatório") Long equipamentoId,
        @NotNull(message = "O colaborador é obrigatório") Long colaboradorId) {
}

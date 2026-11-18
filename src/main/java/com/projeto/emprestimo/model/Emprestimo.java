package com.projeto.emprestimo.model;

import com.projeto.emprestimo.exception.ConflitoException;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long equipamentoId;
    private Long colaboradorId;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataDevolucao;

    public Emprestimo() { }

    private static final int DIAS_DE_PRAZO = 14;

    public Emprestimo(Long equipamentoId, Long colaboradorId, LocalDate hoje) {
        this.equipamentoId = equipamentoId;
        this.colaboradorId = colaboradorId;
        this.dataEmprestimo = hoje;
        this.dataPrevistaDevolucao = hoje.plusDays(DIAS_DE_PRAZO);
    }
    /*
    O LocalDate é imutável, então hoje.plusDays(14) devolve uma data nova em vez de mudar a antiga.
    Por isso o resultado precisa ser guardado em dataPrevistaDevolucao.
    Se você só escrevesse hoje.plusDays(14); solto, o resultado seria jogado fora.
    O DIAS_DE_PRAZO é o “número com nome”
     */

    public void devolver(LocalDate data) {
        if (dataDevolucao != null) {
            throw new ConflitoException("Empréstimo já devolvido");
        }
        dataDevolucao = data;
    }
    /*
    Lendo em português: “se já existe uma data de devolução, esse empréstimo já foi devolvido,
    então lança o erro (R6).
    Se passou do if, guarda a data recebida (R7)”.
    A data vem de fora como parâmetro (em vez de usar LocalDate.now() aqui dentro) de propósito.
    */

    public boolean estaAtrasadoEm(LocalDate data) {
        return dataDevolucao == null && dataPrevistaDevolucao.isBefore(data);
    }

    public boolean isAtrasado() {
        return estaAtrasadoEm(LocalDate.now());
    }
    /*
    O estaAtrasadoEm devolve true só quando as duas coisas são verdade ao mesmo tempo:
    ainda não foi devolvido (dataDevolucao == null) e a data prevista vem antes da data
    consultada (isBefore).
    Por isso, no dia do prazo ainda não está atrasado: 14/11 não vem antes de 14/11.
    É o caso do teste “no dia do prazo ainda dá tempo”.
    O isAtrasado() é o que vai aparecer no JSON como "atrasado": true, sem precisar de coluna no banco.
    Ele só chama o outro passando a data de hoje.
     */

    public Long getId() {
        return id;
    }

    public Long getEquipamentoId() {
        return equipamentoId;
    }

    public Long getColaboradorId() {
        return colaboradorId;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

}

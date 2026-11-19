package com.projeto.emprestimo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long equipamentoId;
    @Column(nullable = false)
    private Long colaboradorId;
    @Column(nullable = false)
    private LocalDate dataEmprestimo;
    @Column(nullable = false)
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataDevolucao;

    public Emprestimo(){ }

    public Emprestimo(Long equipamentoId, Long colaboradorId, LocalDate hoje) {
        this.equipamentoId = equipamentoId;
        this.colaboradorId = colaboradorId;
        this.dataEmprestimo = hoje;
        this.dataPrevistaDevolucao = hoje.plusDays(14);
    }

    public void devolver(LocalDate data){
        if(dataDevolucao != null){
            throw new IllegalStateException("Equipamento já devolvido!");
        }
        this.dataDevolucao = data;
    }

    public boolean estaAtrasadoEm(LocalDate data) {
        return dataDevolucao == null && dataPrevistaDevolucao.isBefore(data);
    }

    public boolean isAtrasado() {
        return estaAtrasadoEm(LocalDate.now());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEquipamentoId(){
        return equipamentoId;
    }

    public void setEquipamentoId(Long equipamentoId){
        this.equipamentoId = equipamentoId;
    }

    public Long getColaboradorId(){
        return colaboradorId;
    }

    public void setColaboradorId(Long colaboradorId){
        this.colaboradorId = colaboradorId;
    }

    public LocalDate getDataEmprestimo(){
        return dataEmprestimo;
    }

    public LocalDate getDataPrevistaDevolucao(){
        return dataPrevistaDevolucao;
    }

    public LocalDate getDataDevolucao(){
        return dataDevolucao;
    }

}

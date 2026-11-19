package com.projeto.emprestimo.model;

public enum TipoEquipamento {
    NOTEBOOK("Notebook", 30),
    MONITOR("Monitor", 14),
    MOUSE("Mouse", 7),
    TECLADO("Teclado", 7),
    HEADSET("Headset", 7),
    OUTRO("Outro", 14); // o ; fecha a lista
    private final String descricao;
    private final int prazoEmDias;
    TipoEquipamento(String descricao, int prazoEmDias) {
        this.descricao = descricao;
        this.prazoEmDias = prazoEmDias;
    }
    public String getDescricao() { return descricao; }
    public int getPrazoEmDias() { return prazoEmDias; }
}

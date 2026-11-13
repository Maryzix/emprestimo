package com.projeto.emprestimo.atividadesSpring.model;

import jakarta.persistence.*;

@Entity
public class Recado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String autor;
    private String texto;

    public Recado (){}

    public Long getId(){return id;}
    public void setId(Long id){this.id = id;}

    public String getAutor(){return autor;}
    public void setAutor(String autor){this.autor = autor;}

    public  String getTexto(){return texto;}
    public void setTexto(String texto){this.texto = texto;}
}

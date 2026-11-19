package com.projeto.emprestimo.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Equipamento {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "Obrigatório")
        @Column(nullable = false, unique = true)
        private String patrimonio;
        @NotBlank(message = "Obrigatório")
        @Column(nullable = false)
        private String nome;
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TipoEquipamento tipo;
        @Column(nullable = false)
        private boolean disponivel = true;

        public Equipamento() { }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getPatrimonio() {
                return patrimonio;
        }

        public void setPatrimonio(String patrimonio) {
                this.patrimonio = patrimonio;
        }

        public String getNome(){
                return this.nome;
        }

        public void setNome(String nome){
                this.nome = nome;
        }

        public TipoEquipamento getTipo(){
                return this.tipo;
        }

        public void setTipo(TipoEquipamento tipo){
                this.tipo = tipo;
        }

        public boolean isDisponivel() { return disponivel; }
        public void setDisponivel(boolean disponivel) {
                this.disponivel = disponivel;
        }

        public void emprestar(){
                if(!isDisponivel()){
                        throw new IllegalStateException("Equipamento indisponível");
                }
                setDisponivel(false);
        }

        public void devolver(){
                setDisponivel(true);
        }
}
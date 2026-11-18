package com.projeto.emprestimo.model;
import com.projeto.emprestimo.exception.ConflitoException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
public class Equipamento {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "O patrimônio é obrigatório")
        @Column(nullable = false, unique = true)
        private String patrimonio;

        @NotBlank(message = "O nome é obrigatório")
        @Column(nullable = false)
        private String nome;

        @NotNull(message = "O tipo é obrigatório")
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private TipoEquipamento tipo;

        @Column(nullable = false)
        private boolean disponivel = true;

        public Equipamento() { }


        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getPatrimonio() {
                return patrimonio;
        }

        public void setPatrimonio(String patrimonio) {
                this.patrimonio = patrimonio;
        }

        public String getNome() {
                return nome;
        }

        public void setNome(String nome) {
                this.nome = nome;
        }

        public TipoEquipamento getTipo() {
                return tipo;
        }

        public void setTipo(TipoEquipamento tipo) {
                this.tipo = tipo;
        }

        public boolean isDisponivel() {
                return disponivel;
        }

        public void setDisponivel(boolean disponivel) {
                this.disponivel = disponivel;
        }

        public void emprestar() {
                if (!disponivel) {
                        throw new ConflitoException("Equipamento indisponível");
                }
                disponivel = false;
        }
    /*
    O emprestar() lê assim: “se não estiver disponível, lança o erro e para aí;
    se passou do if, marca como indisponível”.
    O ! na frente de disponivel significa “não”.
     */

        public void devolver() {
                disponivel = true;
        }
}
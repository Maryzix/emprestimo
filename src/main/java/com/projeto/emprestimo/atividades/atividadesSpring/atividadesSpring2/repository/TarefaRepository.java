package com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.repository;

import com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
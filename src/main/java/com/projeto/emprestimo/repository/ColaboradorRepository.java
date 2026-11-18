package com.projeto.emprestimo.repository;

import com.projeto.emprestimo.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    boolean existsByEmail(String email);
}

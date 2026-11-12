package com.projeto.emprestimo.repository;

import com.projeto.emprestimo.model.Equipamento;
import com.projeto.emprestimo.model.TipoEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EquipamentoRepository extends JpaRepository<Equipamento, Long> {

    boolean existsByPatrimonio(String patrimonio);

    List<Equipamento> findByTipo(TipoEquipamento tipo);

    List<Equipamento> findByDisponivel(Boolean disponivel);

    List<Equipamento> findByTipoAndDisponivel(TipoEquipamento tipo, Boolean disponivel);
}
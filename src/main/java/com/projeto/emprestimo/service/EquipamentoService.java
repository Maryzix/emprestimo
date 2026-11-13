package com.projeto.emprestimo.service;

import com.projeto.emprestimo.model.Equipamento;
import com.projeto.emprestimo.model.TipoEquipamento;
import com.projeto.emprestimo.repository.EquipamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EquipamentoService {
    private final EquipamentoRepository repository;

    public EquipamentoService(EquipamentoRepository repository) {
        this.repository = repository;
    }

    public List<Equipamento> listar(TipoEquipamento tipo) {
        if (tipo == null) { return repository.findAll(); }
        return repository.findByTipo(tipo);
    }

    public Equipamento buscar(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipamento não encontrado"));
    }

    public Equipamento cadastrar(Equipamento equipamento) {
        if (repository.existsByPatrimonio(equipamento.getPatrimonio())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Patrimônio já cadastrado");
        }
        equipamento.setDisponivel(true);  // todo equipamento novo nasce disponível
        return repository.save(equipamento);
    }
}
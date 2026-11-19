package com.projeto.emprestimo.service;

import com.projeto.emprestimo.model.Equipamento;
import com.projeto.emprestimo.model.TipoEquipamento;
import com.projeto.emprestimo.repository.EmprestimoRepository;
import com.projeto.emprestimo.repository.EquipamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@Service
public class EquipamentoService {
    private final EquipamentoRepository repository;
    private final EmprestimoRepository emprestimoRepository;

    public EquipamentoService(EquipamentoRepository repository,
                              EmprestimoRepository emprestimoRepository) {
        this.repository = repository;
        this.emprestimoRepository = emprestimoRepository;
    }

    public List<Equipamento> listar(TipoEquipamento tipo, Boolean disponivel) {
        if (tipo == null && disponivel == null) { return repository.findAll(); }

        if(tipo != null && disponivel == null){
            return repository.findByTipo(tipo);
        }

        if(tipo == null && disponivel != null){
            return repository.findByDisponivel(disponivel);
        }
        return repository.findByTipoAndDisponivel(tipo, disponivel);
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

    public void excluir(Long id){
        buscar(id);
        if(emprestimoRepository.existsByEquipamentoId(id)){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Não é possível excluir equipamento com o histórico de empréstimos"
            );
        }
        repository.deleteById(id);
    }

    public Equipamento atualizar(Long id, Equipamento dados){
        Equipamento equipamento = buscar(id);
        if(repository.existsByPatrimonioAndIdNot(dados.getPatrimonio(), id)){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Patrimônio já cadastrado."
            );
        }
        equipamento.setPatrimonio(dados.getPatrimonio());
        equipamento.setNome(dados.getNome());
        equipamento.setTipo(dados.getTipo());

        return repository.save(equipamento);
    }
}
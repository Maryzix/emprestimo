package com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.service;

import com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.model.Tarefa;
import com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    public Tarefa cadastrar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }
}
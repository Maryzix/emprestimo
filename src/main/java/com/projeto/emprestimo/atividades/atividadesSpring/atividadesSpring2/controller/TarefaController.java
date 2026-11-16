package com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.controller;

import com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.model.Tarefa;
import com.projeto.emprestimo.atividades.atividadesSpring.atividadesSpring2.service.TarefaService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private final TarefaService tarefaService;

    public TarefaController(TarefaService tarefaService) {
        this.tarefaService = tarefaService;
    }

    @GetMapping
    public List<Tarefa> listarTodas() {
        return tarefaService.listarTodas();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarefa cadastrar(@RequestBody Tarefa tarefa) {
        return tarefaService.cadastrar(tarefa);
    }
}
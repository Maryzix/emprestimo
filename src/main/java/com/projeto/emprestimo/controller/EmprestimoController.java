package com.projeto.emprestimo.controller;

import com.projeto.emprestimo.model.Emprestimo;
import com.projeto.emprestimo.service.EmprestimoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;


@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController{
    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService){
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<Emprestimo>cadastrar(
            @RequestParam Long equipamentoId,
            @RequestParam Long colaboradorId
    ){
        Emprestimo emprestimo = emprestimoService.cadastrar(
                equipamentoId,
                colaboradorId
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimo);
    }

    @GetMapping
    public ResponseEntity<List<Emprestimo>> listar(
            @RequestParam(required = false) Boolean atrasados
    ) {
        List<Emprestimo> emprestimos = emprestimoService.listar(atrasados);
        return ResponseEntity.ok(emprestimos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprestimo> buscar(@PathVariable Long id){
        Emprestimo emprestimo = emprestimoService.buscar(id);
        return ResponseEntity.ok(emprestimo);
    }

    @PutMapping("/{id}/devolucao")
    public ResponseEntity<Emprestimo> devolver(@PathVariable Long id){
        Emprestimo emprestimo = emprestimoService.devolver(id);
        return ResponseEntity.ok(emprestimo);
    }
}
package com.projeto.emprestimo.controller;

import com.projeto.emprestimo.model.Colaborador;
import com.projeto.emprestimo.model.Emprestimo;
import com.projeto.emprestimo.service.ColaboradorService;
import com.projeto.emprestimo.service.EmprestimoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {
    private final ColaboradorService colaboradorService;
    private final EmprestimoService emprestimoService;

    public ColaboradorController(
            ColaboradorService colaboradorService,
            EmprestimoService emprestimoService
    ){
        this.colaboradorService = colaboradorService;
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<Colaborador> cadastrar(
            @RequestBody Colaborador colaborador
    ){
        Colaborador novoColaborador = colaboradorService.cadastrar(colaborador);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoColaborador);
    }

    @GetMapping("/{id}/emprestimos")
    public ResponseEntity<List<Emprestimo>> listarEmprestimos(
            @PathVariable Long id
    ){
        List<Emprestimo> emprestimos = emprestimoService.listarDoColaborador(id);
        return ResponseEntity.ok(emprestimos);
    }

    @GetMapping
    public ResponseEntity<List<Colaborador>> listar(){
        List<Colaborador> colaboradores = colaboradorService.listar();
        return ResponseEntity.ok(colaboradores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Colaborador> buscar(@PathVariable Long id){
        Colaborador colaborador = colaboradorService.buscar(id);
        return ResponseEntity.ok(colaborador);
    }
}


package com.projeto.emprestimo.controller;

import com.projeto.emprestimo.model.Colaborador;
import com.projeto.emprestimo.model.Emprestimo;
import com.projeto.emprestimo.service.ColaboradorService;
import com.projeto.emprestimo.service.EmprestimoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/colaboradores")
public class ColaboradorController {

    private final ColaboradorService service;
    private final EmprestimoService emprestimoService;

    public ColaboradorController(ColaboradorService service,
                                 EmprestimoService emprestimoService) {
        this.service = service;
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Colaborador cadastrar(@RequestBody Colaborador colaborador) {
        return service.cadastrar(colaborador);
    }

    @GetMapping
    public List<Colaborador> listar() {
        return service.listar();
    }

    @GetMapping("/{id}/emprestimos")
    public List<Emprestimo> listarEmprestimos(@PathVariable Long id) {
        return emprestimoService.listarDoColaborador(id);
    }

    @GetMapping("/{id}")
    public Colaborador buscar(@PathVariable Long id) {
        return service.buscar(id);
    }
}

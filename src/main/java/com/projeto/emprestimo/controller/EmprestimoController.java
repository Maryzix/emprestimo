package com.projeto.emprestimo.controller;
import com.projeto.emprestimo.model.Emprestimo;
import com.projeto.emprestimo.service.EmprestimoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    private final EmprestimoService service;

    public EmprestimoController(EmprestimoService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Emprestimo emprestar(@RequestParam Long equipamentoId,
                                @RequestParam Long colaboradorId) {
        return service.emprestar(equipamentoId, colaboradorId);
    }

    @GetMapping
    public List<Emprestimo> listar(@RequestParam(required = false) Boolean atrasados) {
        return service.listar(atrasados);
    }

    @GetMapping("/{id}")
    public Emprestimo buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @PutMapping("/{id}/devolucao")
    public Emprestimo devolver(@PathVariable Long id) {
        return service.devolver(id);
    }
}

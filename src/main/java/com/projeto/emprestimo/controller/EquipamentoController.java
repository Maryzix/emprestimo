package com.projeto.emprestimo.controller;

import com.projeto.emprestimo.model.Equipamento;
import com.projeto.emprestimo.model.TipoEquipamento;
import com.projeto.emprestimo.service.EquipamentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController{
    private final EquipamentoService equipamentoService;

    public EquipamentoController(EquipamentoService equipamentoService){
        this.equipamentoService = equipamentoService;
    }

    @GetMapping
    public ResponseEntity<List<Equipamento>> listar(
            @RequestParam(required = false) TipoEquipamento tipo,
            @RequestParam(required = false) Boolean disponivel
    ){
        List<Equipamento> equipamentos = equipamentoService.listar(tipo, disponivel);
        return ResponseEntity.ok(equipamentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipamento> buscar(@PathVariable Long id){
        Equipamento equipamento = equipamentoService.buscar(id);
        return ResponseEntity.ok(equipamento);
    }

    @PostMapping
    public ResponseEntity<Equipamento> cadastrar(
            @RequestBody Equipamento equipamento
    ){
        Equipamento novoEquipamento = equipamentoService.cadastrar(equipamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEquipamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipamento> atualizar(
            @PathVariable Long id,
            @RequestBody Equipamento dados
    ){
        Equipamento equipamentoAtualizado = equipamentoService.atualizar(id, dados);
        return ResponseEntity.ok(equipamentoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        equipamentoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
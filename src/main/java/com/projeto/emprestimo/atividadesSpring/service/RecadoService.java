package com.projeto.emprestimo.atividadesSpring.service;

import com.projeto.emprestimo.atividadesSpring.model.Recado;
import com.projeto.emprestimo.atividadesSpring.repository.RecadoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecadoService {
    private final RecadoRepository repository;

    public RecadoService(RecadoRepository repository) {
        this.repository = repository;
    }

    public List<Recado> listar() {
        return repository.findAll();
    }

    public Recado cadastrar(Recado recado) {
        return repository.save(recado);
    }
}
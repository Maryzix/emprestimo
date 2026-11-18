package com.projeto.emprestimo.service;

import com.projeto.emprestimo.exception.ConflitoException;
import com.projeto.emprestimo.exception.NaoEncontradoException;
import com.projeto.emprestimo.model.Colaborador;
import com.projeto.emprestimo.repository.ColaboradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColaboradorService {

    private final ColaboradorRepository colaboradorRepository;

    public ColaboradorService(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    public List<Colaborador> listar() {
        return colaboradorRepository.findAll();
    }

    public Colaborador buscar(Long id) {
        return colaboradorRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoException("Colaborador não encontrado"));
    }

    public Colaborador cadastrar(Colaborador colaborador) {
        if (colaboradorRepository.existsByEmail(colaborador.getEmail())) {
            throw new ConflitoException("E-mail já cadastrado");
        }
        return colaboradorRepository.save(colaborador);
    }
    /*
    listar: devolve todos.
    buscar: o findById devolve uma caixinha que pode estar vazia, e o orElseThrow diz
    “se estiver vazia, lança este erro”.
    cadastrar: é a R3. Se já existe alguém com aquele e-mail, lança o erro.
    Se passou do if, salva.
     */
}

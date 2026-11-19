package com.projeto.emprestimo.service;

import com.projeto.emprestimo.model.Colaborador;
import com.projeto.emprestimo.model.Emprestimo;
import com.projeto.emprestimo.model.Equipamento;
import com.projeto.emprestimo.repository.ColaboradorRepository;
import com.projeto.emprestimo.repository.EmprestimoRepository;
import com.projeto.emprestimo.repository.EquipamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EquipamentoRepository equipamentoRepository;
    private final EmprestimoRepository emprestimoRepository;
    private final ColaboradorRepository colaboradorRepository;

    public EmprestimoService(EquipamentoRepository equipamentoRepository,
                             EmprestimoRepository emprestimoRepository,
                             ColaboradorRepository colaboradorRepository) {
        this.equipamentoRepository = equipamentoRepository;
        this.emprestimoRepository = emprestimoRepository;
        this.colaboradorRepository = colaboradorRepository;
    }

    @Transactional
    public Emprestimo cadastrar(Long equipamentoId, Long colaboradorId) {

        Equipamento equipamento = equipamentoRepository.findById(equipamentoId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Equipamento não encontrado."
                ));

        if (!equipamento.isDisponivel()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Equipamento indisponível"
            );
        }

        Colaborador colaborador = colaboradorRepository.findById(colaboradorId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Colaborador não encontrado."
                ));

        if (emprestimoRepository
                .existsByColaboradorIdAndDataDevolucaoIsNullAndDataPrevistaDevolucaoBefore(
                        colaboradorId, LocalDate.now())) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Colaborador possui empréstimo atrasado"
            );
        }

        equipamento.emprestar();

        Emprestimo emprestimo = new Emprestimo(
                equipamentoId,
                colaboradorId,
                LocalDate.now()
        );

        return emprestimoRepository.save(emprestimo);
    }

    @Transactional
    public Emprestimo devolver(Long emprestimoId) {

        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Empréstimo não encontrado"
                ));

        if (emprestimo.getDataDevolucao() != null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Este empréstimo já foi devolvido."
            );
        }

        Equipamento equipamento = equipamentoRepository.findById(emprestimo.getEquipamentoId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Equipamento não encontrado"
                ));

        emprestimo.devolver(LocalDate.now());
        equipamento.devolver();

        return emprestimoRepository.save(emprestimo);
    }

    public List<Emprestimo> listar(Boolean atrasados){
        if(Boolean.TRUE.equals(atrasados)){
            return emprestimoRepository
                    .findByDataDevolucaoIsNullAndDataPrevistaDevolucaoBefore(LocalDate.now());
        }
        return emprestimoRepository.findAll();
    }

    public Emprestimo buscar(Long id){
        return emprestimoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Emprestimo não encontrado"
                ));
    }

    public List<Emprestimo> listarDoColaborador(Long colaboradorId){
        return emprestimoRepository.findByColaboradorId(colaboradorId);
    }
}

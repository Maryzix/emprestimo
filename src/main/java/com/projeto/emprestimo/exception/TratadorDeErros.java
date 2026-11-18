package com.projeto.emprestimo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratadorDeErros {
    @ExceptionHandler(NaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErroResposta naoEncontrado(NaoEncontradoException e) {
        return new ErroResposta(e.getMessage());
    }

    @ExceptionHandler(ConflitoException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErroResposta conflito(ConflitoException e) {
        return new ErroResposta(e.getMessage());
    }
}

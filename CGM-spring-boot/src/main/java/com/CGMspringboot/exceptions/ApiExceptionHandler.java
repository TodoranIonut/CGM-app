package com.CGMspringboot.exceptions;

import com.CGMspringboot.exceptions.type.BadRequestException;
import com.CGMspringboot.exceptions.type.ConflictException;
import com.CGMspringboot.exceptions.type.ForbiddenException;
import com.CGMspringboot.exceptions.type.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ConflictException.class})
    public ResponseEntity<Object> handleApiConflictException(CGMApplicationException e) {
        //1. create payload details
        HttpStatus badRequest = HttpStatus.CONFLICT;
        ExceptionData exceptionData = new ExceptionData(
                e.getMessage(),
                badRequest,
                LocalDateTime.now()
        );

        //2.return response entity
        return new ResponseEntity<>(exceptionData, badRequest);
    }

    @ExceptionHandler(value = {NotFoundException.class})
    public ResponseEntity<Object> handleApiNotFoundException(CGMApplicationException e) {
        //1. create payload details
        HttpStatus badRequest = HttpStatus.NOT_FOUND;
        ExceptionData exceptionData = new ExceptionData(
                e.getMessage(),
                badRequest,
                LocalDateTime.now()
        );

        //2.return response entity
        return new ResponseEntity<>(exceptionData, badRequest);
    }

    @ExceptionHandler(value = {BadRequestException.class})
    public ResponseEntity<Object> handleApiBadRequestException(CGMApplicationException e) {
        //1. create payload details
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ExceptionData exceptionData = new ExceptionData(
                e.getMessage(),
                badRequest,
                LocalDateTime.now()
        );

        //2.return response entity
        return new ResponseEntity<>(exceptionData, badRequest);
    }

    @ExceptionHandler(value = {ForbiddenException.class})
    public ResponseEntity<Object> handleApiForbiddenException(CGMApplicationException e) {
        //1. create payload details
        HttpStatus badRequest = HttpStatus.FORBIDDEN;
        ExceptionData exceptionData = new ExceptionData(
                e.getMessage(),
                badRequest,
                LocalDateTime.now()
        );

        //2.return response entity
        return new ResponseEntity<>(exceptionData, badRequest);
    }
}

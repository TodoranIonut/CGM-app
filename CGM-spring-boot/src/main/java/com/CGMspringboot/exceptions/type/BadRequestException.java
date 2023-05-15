package com.CGMspringboot.exceptions.type;

import com.CGMspringboot.exceptions.CGMApplicationException;

public class BadRequestException extends CGMApplicationException {

    public BadRequestException(String message) {
        super(message);
    }
}

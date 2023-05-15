package com.CGMspringboot.exceptions.type;

import com.CGMspringboot.exceptions.CGMApplicationException;

public class ConflictException extends CGMApplicationException {

    public ConflictException(String message) {
        super(message);
    }
}

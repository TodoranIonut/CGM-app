package com.CGMspringboot.exceptions.type;

import com.CGMspringboot.exceptions.CGMApplicationException;

public class NotFoundException extends CGMApplicationException {

    public NotFoundException(String message) {
        super(message);
    }
}

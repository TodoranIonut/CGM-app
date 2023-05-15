package com.CGMspringboot.exceptions.type;

import com.CGMspringboot.exceptions.CGMApplicationException;

public class ForbiddenException extends CGMApplicationException {

    public ForbiddenException(String message) {
        super(message);
    }
}

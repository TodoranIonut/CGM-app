package com.CGMspringboot.exceptions;

public class CGMApplicationException extends Throwable {

    public CGMApplicationException(String message) {
        super(message);
    }

    public CGMApplicationException(String message, Throwable cause) {
        super(message, cause);
    }
}

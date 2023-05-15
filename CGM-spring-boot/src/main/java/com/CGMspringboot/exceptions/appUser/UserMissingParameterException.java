package com.CGMspringboot.exceptions.appUser;


import com.CGMspringboot.exceptions.type.BadRequestException;

public class UserMissingParameterException extends BadRequestException {

    public UserMissingParameterException(String message) {
        super(String.format("missing user entity parameters %s", message));
    }
}

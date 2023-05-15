package com.CGMspringboot.exceptions.appUser;

import com.CGMspringboot.exceptions.type.ConflictException;

public class UserEmailConflictException extends ConflictException {

    public UserEmailConflictException(String chefEmail) {
        super(String.format("user email %s is unavailable", chefEmail));
    }
}

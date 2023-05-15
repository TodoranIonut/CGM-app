package com.CGMspringboot.exceptions.appUser;

import com.CGMspringboot.exceptions.type.NotFoundException;

public class UserEmailNotFoundException extends NotFoundException {

    public UserEmailNotFoundException(String chefEmail) {
        super(String.format("user email %s is NOT found", chefEmail));
    }
}

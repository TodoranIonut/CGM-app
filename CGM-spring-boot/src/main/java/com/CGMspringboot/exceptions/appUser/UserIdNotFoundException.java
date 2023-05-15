package com.CGMspringboot.exceptions.appUser;

import com.CGMspringboot.exceptions.type.NotFoundException;

public class UserIdNotFoundException extends NotFoundException {

    public UserIdNotFoundException(Integer appUserId) {
        super(String.format("user id %s is NOT found", appUserId));
    }
}

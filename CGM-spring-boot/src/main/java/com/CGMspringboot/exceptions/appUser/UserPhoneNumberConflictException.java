package com.CGMspringboot.exceptions.appUser;

import com.CGMspringboot.exceptions.type.ConflictException;

public class UserPhoneNumberConflictException extends ConflictException {

    public UserPhoneNumberConflictException(String phoneNumber) {
        super(String.format("user phone number %s is unavailable", phoneNumber));
    }
}

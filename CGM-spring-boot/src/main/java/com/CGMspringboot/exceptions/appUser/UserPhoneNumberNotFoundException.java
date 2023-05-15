package com.CGMspringboot.exceptions.appUser;

import com.CGMspringboot.exceptions.type.NotFoundException;

public class UserPhoneNumberNotFoundException extends NotFoundException {

    public UserPhoneNumberNotFoundException(String phoneNumber) {
        super(String.format("user phone number %s is unavailable", phoneNumber));
    }
}

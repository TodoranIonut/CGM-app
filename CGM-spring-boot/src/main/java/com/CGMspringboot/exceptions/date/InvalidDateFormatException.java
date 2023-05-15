package com.CGMspringboot.exceptions.date;

import com.CGMspringboot.exceptions.type.BadRequestException;

public class InvalidDateFormatException extends BadRequestException {

    public InvalidDateFormatException() {
        super("Invalid date format");
    }
}

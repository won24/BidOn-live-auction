package com.gromit.auction_back.common.tossPay;

public class PaymentException extends Exception {
    public PaymentException(String message, Throwable cause) {
        super(message, cause);
    }
}
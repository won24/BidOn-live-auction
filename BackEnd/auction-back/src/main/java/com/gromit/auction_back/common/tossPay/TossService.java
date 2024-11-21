package com.gromit.auction_back.common.tossPay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TossService {

    @Autowired
    private TossDAO tossDAO;

    public void savePaymentInfo(TossDTO paymentRequest) {
        try {
            // DAO를 통해 결제 정보 저장
            System.out.println(paymentRequest+"무슨값");
            tossDAO.insertPaymentInfo(paymentRequest);
            System.out.println("Payment information saved successfully for user: " + paymentRequest.getUserCode());
        } catch (Exception e) {
            System.err.println("Error saving payment information: " + e.getMessage());
            throw new RuntimeException("Failed to save payment information", e);
        }
    }
}
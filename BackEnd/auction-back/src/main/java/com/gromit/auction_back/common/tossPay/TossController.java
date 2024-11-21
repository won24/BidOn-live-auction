package com.gromit.auction_back.common.tossPay;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/toss")
public class TossController {


    @Autowired
    private TossService tossService;

    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestBody TossDTO paymentRequest, HttpServletRequest request) {
        try {

            // TossService를 통해 결제 정보 저장
            tossService.savePaymentInfo(paymentRequest);
            
            return ResponseEntity.ok("Payment information saved successfully");
        } catch (Exception e) {
            // 예외 처리
            return ResponseEntity.badRequest().body("Error saving payment information: " + e.getMessage());
        }
    }

    private String getRequestBody(HttpServletRequest request) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()))) {
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        }
    }
}
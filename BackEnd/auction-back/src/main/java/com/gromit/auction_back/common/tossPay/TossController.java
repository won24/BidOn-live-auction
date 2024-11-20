package com.gromit.auction_back.common.tossPay;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/toss")
public class TossController {

    private static final Logger logger = LoggerFactory.getLogger(TossController.class);

    @Autowired
    private TossService tossService;

    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestBody TossDTO paymentRequest, HttpServletRequest request) {
        try {
            // 요청 본문 로깅
            String body = getRequestBody(request);
            logger.info("Request body: {}", body);

            // Content-Type 헤더 로깅
            String contentType = request.getHeader("Content-Type");
            logger.info("Content-Type: {}", contentType);

            // TossDTO 객체 로깅
            logger.info("TossDTO object: {}", paymentRequest);

            // TossService를 통해 결제 정보 저장
            tossService.savePaymentInfo(paymentRequest);
            
            return ResponseEntity.ok("Payment information saved successfully");
        } catch (Exception e) {
            // 예외 처리
            logger.error("Error saving payment information", e);
            return ResponseEntity.badRequest().body("Error saving payment information: " + e.getMessage());
        }
    }

    private String getRequestBody(HttpServletRequest request) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()))) {
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        }
    }
}
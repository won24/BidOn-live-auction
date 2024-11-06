package com.gromit.auction_back.common.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class TosspaymentConfig {

    @Value("${payment.client-key}")
    private String clientKey;

    @Value("${payment.secret-key}")
    private String secreteKey;

    @Value("${payment.success-url}")
    private String successUrl;

    @Value("${payment.fail-url}")
    private String failUrl;

    @Value("${payment.base-url}")
    public static String URL;

}

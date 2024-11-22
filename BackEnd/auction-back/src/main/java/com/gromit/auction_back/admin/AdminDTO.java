package com.gromit.auction_back.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDTO {
    private int id;
    private int userCode;
    private String content;
    private String title;
    private String answer;
    private LocalDateTime createdAt;
    private String nickName;
}

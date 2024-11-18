package com.gromit.auction_back.Personal;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDTO {
    private int userCode;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String answer;

}

package com.gromit.auction_back.Notice;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class NoticeDTO {
    private String title;
    private String content;
}

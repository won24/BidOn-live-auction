package com.gromit.auction_back.mypage.myinfo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoDTO {
    private int userCode;
    private String id;
    private String password;
    private String phone;
    private String address;
    private String newPassword;
}

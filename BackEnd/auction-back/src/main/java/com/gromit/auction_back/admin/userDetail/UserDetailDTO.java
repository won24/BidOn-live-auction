package com.gromit.auction_back.admin.userDetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailDTO {
    private int userCode;
    private String id;
    private String password;
    private String name;
    private String nickname;
    private LocalDate birth;
    private String email;
    private String phone;
    private String address;
    private int cash;
    private boolean isAdult;
    private boolean isAdmin;
    private LocalDateTime isSuspended;
    private boolean sendEmail;
    private boolean sendMessage;
    private LocalDateTime createUser;
    //유저 테이블
    private int postId;
    private String title;



}

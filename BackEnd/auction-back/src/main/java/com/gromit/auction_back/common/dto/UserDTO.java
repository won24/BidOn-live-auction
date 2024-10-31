package com.gromit.auction_back.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private int userCode;
    private String id;
    private String password;
    private String name;
    private String email;
    private String phone;
    private LocalDate birthDate;
    private String address;
    private int cash;
    private Gender gender;
    private YesNo isAdult;
    private YesNo isAdmin;
    private String nickname;
    private YesNo isSuspended;

    public enum Gender {
        남, 여
    }

    public enum YesNo {
        y, n
    }
}
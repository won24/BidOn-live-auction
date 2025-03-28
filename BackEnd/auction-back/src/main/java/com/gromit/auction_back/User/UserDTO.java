package com.gromit.auction_back.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users") // Specify the correct table name
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private Boolean isAdult;
    private Boolean isAdmin;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime isSuspended = null;

    private boolean sendEmail;
    private boolean sendMessage;

    // 로그인 시 필요한 정보 전달
    public UserDTO(int userCode, String id, String name, String nickname, LocalDate birth, String email, String phone, String address, int cash, boolean isAdult, boolean isAdmin, LocalDateTime isSuspended, boolean sendEmail, boolean sendMessage) {}

}
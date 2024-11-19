package com.gromit.auction_back.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    private LocalDate isSuspended;

    private boolean sendEmail;
    private boolean sendMessage;

    public UserDTO(String id, int userCode, Boolean isAdmin, String nickname) {}
}
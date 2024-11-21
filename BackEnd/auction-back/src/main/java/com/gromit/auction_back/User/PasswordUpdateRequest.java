package com.gromit.auction_back.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PasswordUpdateRequest
{
    // Getters and setters
    private String id;
    private String password;
    private String name;
    private String email;
}

package com.gromit.auction_back.admin;

import com.gromit.auction_back.User.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class AdminCommandService
{

    private final UserRepository userRepository;

    public AdminCommandService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Transactional
    public void banUser(String nickname, String suspensionEndTime)
    {
        LocalDateTime suspensionTime = LocalDateTime.parse(suspensionEndTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        userRepository.updateSuspensionStatus(nickname, suspensionTime);
    }
}

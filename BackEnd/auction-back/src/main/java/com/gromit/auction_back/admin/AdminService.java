package com.gromit.auction_back.admin;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminDAO adminDAO;

    public AdminService(AdminDAO adminDAO) {
        this.adminDAO = adminDAO;
    }

    public List<AdminDTO> getAllInquire() {
        return adminDAO.getAllInquire();
    }

    public void answerInquiry(int userCode, String answer) {
        System.out.println("서비스에서"+userCode+answer);
        adminDAO.updateAnswer(userCode,answer);
    }
}
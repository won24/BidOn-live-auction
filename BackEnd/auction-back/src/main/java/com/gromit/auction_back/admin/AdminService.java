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

    public void answerInquiry(int id, String answer) {
        adminDAO.updateAnswer(id,answer);
    }
}
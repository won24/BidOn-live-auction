package com.gromit.auction_back.Personal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonalService {

    @Autowired
    PersonalDAO personalDAO;

    public List<PersonalDTO> getAllList(int userCode) {
        return personalDAO.getAllList(userCode);
    }

    public void saveInquiry(PersonalDTO personalDTO) {
        System.out.println("service"+personalDTO);
        personalDAO.insertInquire(personalDTO);
    }
}

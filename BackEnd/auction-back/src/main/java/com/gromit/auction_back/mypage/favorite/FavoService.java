package com.gromit.auction_back.mypage.favorite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoService {

    private final FavoDAO favoDAO;

    @Autowired
    public FavoService(FavoDAO favoDAO) {
        this.favoDAO = favoDAO;
    }

    public List<FavoDTO> allselect(FavoDTO favoDTO) {
        int userCode = favoDTO.getUserCode();
        System.out.println(userCode);
        return favoDAO.getAllFavoList(userCode);
    }
}

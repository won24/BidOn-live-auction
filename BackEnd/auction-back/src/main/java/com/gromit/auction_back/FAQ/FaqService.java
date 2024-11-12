package com.gromit.auction_back.FAQ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    private final FaqDAO faqDAO;

    @Autowired
    public FaqService(FaqDAO faqDAO) {
        this.faqDAO = faqDAO;
    }

    public List<FaqDTO> getAllFaq() {
        return faqDAO.selectAllFaq();
    }
}

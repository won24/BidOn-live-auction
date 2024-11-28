// 참여 경매 Service

package com.gromit.auction_back.mypage.participate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipateService {
    private final ParticipateDAO participateDAO;

    @Autowired
    public ParticipateService(ParticipateDAO participateDAO) {
        this.participateDAO = participateDAO;
    }

    public List<ParticipateDTO> getAuctions(int userCode) {
        return participateDAO.getWonAuctions(userCode);
    }
}

// 참여 경매 Service

package com.gromit.auction_back.mypage.participate;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipateService {

    public List<ParticipateDTO> participationAuction(int userCode) {
        return ParticipateDAO.getParticipatedAuctions(userCode);
    }

    public List<ParticipateDTO> getAuctions(int userCode) {
        return ParticipateDAO.getWonAuctions(userCode);
    }
}

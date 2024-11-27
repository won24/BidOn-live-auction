// 참여 경매 DAO

package com.gromit.auction_back.mypage.participate;

import java.util.ArrayList;
import java.util.List;

public interface ParticipateDAO {

   static List<ParticipateDTO> getWonAuctions(int userCode) {

      List<ParticipateDTO> wonAuctions = new ArrayList<ParticipateDTO>();

      return wonAuctions;
   }
}
// 참여 경매 DAO

package com.gromit.auction_back.mypage.participate;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface ParticipateDAO {
   List<ParticipateDTO> getWonAuctions(@Param("userCode") int userCode);
}

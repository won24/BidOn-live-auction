// 내 정보 DAO

package com.gromit.auction_back.mypage.myinfo;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;


@Mapper
public interface InfoDAO  {
    InfoDTO findByUserCode(int userCode);

    int updateByPassword(InfoDTO infoDTO);
}

package com.gromit.auction_back.mypage.myinfo;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface InfoDAO  {
    InfoDTO findByUserCode(int userCode);
//    List<InfoDTO> getAllSelect();

}

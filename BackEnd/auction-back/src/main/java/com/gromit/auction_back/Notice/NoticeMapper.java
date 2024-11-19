package com.gromit.auction_back.Notice;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface NoticeMapper {

    @Select("SELECT * FROM notice;")
    List<NoticeDTO> getAllNotice();
}

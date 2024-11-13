package com.gromit.auction_back.FAQ;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FaqDAO {
    List<FaqDTO> selectAllFaq();
}

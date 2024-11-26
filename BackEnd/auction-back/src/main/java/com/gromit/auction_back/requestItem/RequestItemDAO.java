package com.gromit.auction_back.requestItem;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RequestItemDAO {
    int insertRequestItem(RequestItemDTO requestItemDTO);

}

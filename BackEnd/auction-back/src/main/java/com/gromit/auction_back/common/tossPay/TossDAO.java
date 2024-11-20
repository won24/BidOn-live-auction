package com.gromit.auction_back.common.tossPay;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface TossDAO {
    @Update("UPDATE users SET cash = cash + #{amount} WHERE UserCode = #{usercode}")
    void insertPaymentInfo(TossDTO paymentRequest);
}
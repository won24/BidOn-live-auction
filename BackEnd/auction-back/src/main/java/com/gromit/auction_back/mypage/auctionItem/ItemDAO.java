// 경매품 DAO

package com.gromit.auction_back.mypage.auctionItem;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // String userCode를 받아서 경매품 목록을 반환하는 메소드
    public List<ItemDTO> auctionItem(String userCode) {
        String sql = "SELECT * FROM auction_items WHERE userCode = ?";

        // userCode를 쿼리에 전달하여 결과를 ItemDTO 객체로 매핑
        return jdbcTemplate.query(sql, new Object[]{userCode}, new BeanPropertyRowMapper<>(ItemDTO.class));
    }
}

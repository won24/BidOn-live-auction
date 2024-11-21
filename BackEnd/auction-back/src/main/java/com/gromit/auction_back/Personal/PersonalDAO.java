package com.gromit.auction_back.Personal;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface PersonalDAO {

    @Select("SELECT * FROM personal WHERE userCode = #{userCode}")
    List<PersonalDTO> getAllList(int userCode);

    @Insert("INSERT INTO personal (userCode, title, content) VALUES (#{userCode}, #{title}, #{content})")
    void insertInquire(PersonalDTO personalDTO);
}

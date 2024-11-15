package com.gromit.auction_back.requestItem.ImageUpload.mapper;

import com.gromit.auction_back.requestItem.ImageUpload.image.ImageDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ImageMapper  {

    @Insert("INSERT INTO imageurl (postId, imageUrl) VALUES (#{postId}, #{imageUrl})")
    void insertImage(ImageDTO imageDTO);

    @Select("SELECT * FROM imageurl WHERE postId = #{postId}")
    ImageDTO selectImageByPostId(int postId);
}

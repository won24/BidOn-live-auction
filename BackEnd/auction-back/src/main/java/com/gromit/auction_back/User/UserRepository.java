package com.gromit.auction_back.User;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDTO, Integer>
{
    boolean existsById(String id);

    boolean existsByNickname(String nickname);
    
    Optional<UserDTO> findByIdAndPassword(String id, String password);

    @Query("SELECT u.id FROM UserDTO u WHERE u.name = :name AND u.phone = :phone")
    Optional<String> findIdByNameAndPhone(@Param("name") String name, @Param("phone") String phone);

    @Query("SELECT u.id FROM UserDTO u WHERE u.name = :name AND u.email = :email")
    Optional<String> findIdByNameAndEmail(@Param("name") String name, @Param("email") String email);
}


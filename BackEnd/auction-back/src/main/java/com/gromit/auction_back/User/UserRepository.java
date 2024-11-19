package com.gromit.auction_back.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDTO, Integer>
{
    boolean existsById(String id);

    boolean existsByNickname(String nickname);

    UserDTO findById(String id);

    Optional<UserDTO> findByIdAndPassword(String id, String password);
}


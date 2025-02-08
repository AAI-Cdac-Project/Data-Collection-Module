package com.cdac.Acts.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    long countByRole(Role role);
     @Query("SELECT u.userId FROM User u WHERE u.role = :role")
    List<Long> findUserIdsByRole(@Param("role") Role role);
}
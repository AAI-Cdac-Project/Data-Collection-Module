package com.cdac.Acts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.Acts.entities.OtpToken;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpToken, Long> {
    Optional<OtpToken> findByEmail(String email);
}

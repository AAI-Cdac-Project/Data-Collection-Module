package com.cdac.Acts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.Acts.entities.Language;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Byte> {
    Language findByLanguageCode(String languageCode);
}
package com.cdac.Acts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.entities.Sentence;

@Repository
public interface GlobalDatabaseRepository extends JpaRepository<GlobalDatabase, Long> {
    List<GlobalDatabase> findBySentenceLanguage_LanguageId(Long languageId);
    List<GlobalDatabase> findByTranslationLanguage_LanguageId(Long languageId);;
    
    @Query(value = "SELECT * FROM global_database WHERE MATCH (sentence_text)"
	 		+ " AGAINST (?1)",nativeQuery = true)
	 List<GlobalDatabase> searchByKeyword(String keyword);
}

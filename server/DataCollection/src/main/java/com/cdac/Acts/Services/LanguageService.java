package com.cdac.Acts.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Acts.entities.Language;
import com.cdac.Acts.repository.LanguageRepository;

@Service
public class LanguageService {

 @Autowired
 private LanguageRepository languageRepository;  // Assuming you have a repository for Language

 // Method to get a language by its ID
 public Language getLanguageById(int languageId) {
     return languageRepository.findById((byte) languageId)
             .orElseThrow(() -> new RuntimeException("Language not found with id: " + languageId));
 }
}


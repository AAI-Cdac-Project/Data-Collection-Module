package com.cdac.Acts.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.Acts.Services.DocumentService;
import com.cdac.Acts.Services.GlobalDatabaseService;
import com.cdac.Acts.Services.LanguageService;
import com.cdac.Acts.Services.SentenceService;
import com.cdac.Acts.Services.UserService;
import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.entities.Language;
import com.cdac.Acts.entities.Sentence;
import com.cdac.Acts.entities.Status;
import com.cdac.Acts.entities.User;

@RestController
@RequestMapping("/api/global")
public class GlobalDatabaseController {

    @Autowired
    private GlobalDatabaseService globalDatabaseService;

    @Autowired
    private SentenceService sentenceService;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private LanguageService languageService;

    @Autowired
    private UserService userService;

    @PutMapping("/sentences/{sentenceId}/commit")
    public ResponseEntity<String> commitSentenceToGlobalDatabase(@PathVariable Long sentenceId) {
        try {
            // Fetch Sentence
            ResponseEntity<Sentence> sentenceResponse = sentenceService.getSentenceById(sentenceId);
            Sentence sentence = sentenceResponse.getBody();
            if (sentence == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sentence not found.");
            }

            // Fetch Source & Target Languages
            Language sourceLanguage = languageService.getLanguageById(sentence.getSourcelanguageId());
            Language targetLanguage = languageService.getLanguageById(sentence.getTargetlanguageId());

            if (sourceLanguage == null || targetLanguage == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid language IDs.");
            }

            // Fetch Document
            ResponseEntity<Document> documentResponse = documentService.getDocumentById(sentence.getDocumentId());
            Document document = documentResponse.getBody();
            if (document == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found.");
            }

            // Fetch User
            ResponseEntity<User> userResponse = userService.getUserById(document.getUserId());
            User user = userResponse.getBody();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            // Create and Save GlobalDatabase Entry
            GlobalDatabase globalDatabase = new GlobalDatabase();
            globalDatabase.setSentenceText(sentence.getOriginalSentence());
            globalDatabase.setTranslationText(sentence.getTranslation());
            globalDatabase.setSentenceLanguage(sourceLanguage);
            globalDatabase.setTranslationLanguage(targetLanguage);
            globalDatabase.setAddedDate(LocalDateTime.now());
            globalDatabase.setAddedBy(user);

            globalDatabaseService.save(globalDatabase);

            // Update Sentence and Document Status
            document.setStatus(Status.VERIFIED);
            documentService.createDocument(document);

            sentence.setStatus(Status.VERIFIED);
            sentenceService.createSentence(sentence);

            return ResponseEntity.ok("Sentence committed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error committing sentence.");
        }
    }
}

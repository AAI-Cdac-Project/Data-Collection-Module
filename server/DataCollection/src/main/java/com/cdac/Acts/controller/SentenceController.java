package com.cdac.Acts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.Acts.Services.SearchService;
import com.cdac.Acts.Services.SentenceService;
import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.entities.Sentence;

@RestController
@RequestMapping("/api/sentences")
public class SentenceController {

    @Autowired
    private SentenceService sentenceService;
    
    @Autowired
	SearchService searchService;

    // Get Sentence by ID
    @GetMapping("/{sentenceId}")
    public ResponseEntity<Sentence> getSentenceById(@PathVariable Long sentenceId) {
        return sentenceService.getSentenceById(sentenceId);
    }

    // Create a new sentence
    @PostMapping
    public ResponseEntity<Sentence> createSentence(@RequestBody Sentence sentence) {
        return sentenceService.createSentence(sentence);
    }

    // Edit a sentence
    @PutMapping("/{sentenceId}")
    public ResponseEntity<Sentence> updateSentence(@PathVariable Long sentenceId, @RequestBody Sentence sentence) {
        return sentenceService.updateSentence(sentenceId, sentence);
    }

    // Delete a sentence
    @DeleteMapping("/{sentenceId}")
    public ResponseEntity<String> deleteSentence(@PathVariable Long sentenceId) {
        return sentenceService.deleteSentence(sentenceId);
    }

    // Get sentences by document ID
    @GetMapping("/document/{documentId}")
    public ResponseEntity<List<Sentence>> getSentencesByDocumentId(@PathVariable Long documentId) {
        return sentenceService.getSentencesByDocumentId(documentId);
    }
    
    
	@GetMapping("/search")
    public ResponseEntity<List<GlobalDatabase>> search(@Param("keyword") String keyword) {
    	return searchService.search(keyword);
    }
}

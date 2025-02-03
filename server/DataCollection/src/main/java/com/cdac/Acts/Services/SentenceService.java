package com.cdac.Acts.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.Acts.repository.SentenceRepository;
import com.cdac.Acts.entities.Sentence;

import java.util.List;
import java.util.Optional;

@Service
public class SentenceService {

    @Autowired
    private SentenceRepository sentenceRepository;

    // Get Sentence by ID
    public ResponseEntity<Sentence> getSentenceById(Long sentenceId) {
        Optional<Sentence> sentence = sentenceRepository.findById(sentenceId);
        return sentence.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new Sentence
    public ResponseEntity<Sentence> createSentence(Sentence sentence) {
        Sentence savedSentence = sentenceRepository.save(sentence);
        return ResponseEntity.status(201).body(savedSentence);
    }

    // Edit an existing Sentence
    public ResponseEntity<Sentence> updateSentence(Long sentenceId, Sentence sentence) {
        Optional<Sentence> existingSentence = sentenceRepository.findById(sentenceId);
        if (existingSentence.isPresent()) {
            sentence.setSentenceId(sentenceId); // Ensure the sentenceId is set
            Sentence updatedSentence = sentenceRepository.save(sentence);
            return ResponseEntity.ok(updatedSentence);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete Sentence
    public ResponseEntity<String> deleteSentence(Long sentenceId) {
        Optional<Sentence> existingSentence = sentenceRepository.findById(sentenceId);
        if (existingSentence.isPresent()) {
            sentenceRepository.deleteById(sentenceId);
            return ResponseEntity.ok("Sentence deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    // Get Sentences by Document ID
    public ResponseEntity<List<Sentence>> getSentencesByDocumentId(Long documentId) {
        List<Sentence> sentences = sentenceRepository.findByDocumentId(documentId);
        return sentences.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(sentences);
    }
}


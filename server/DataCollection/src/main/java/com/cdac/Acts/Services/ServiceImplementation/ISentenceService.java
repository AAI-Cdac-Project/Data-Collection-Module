package com.cdac.Acts.Services.ServiceImplementation;

import com.cdac.Acts.entities.Sentence;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISentenceService {

    ResponseEntity<Sentence> getSentenceById(Long sentenceId);

    ResponseEntity<Sentence> createSentence(Sentence sentence);

    ResponseEntity<Sentence> updateSentence(Long sentenceId, Sentence sentence);

    ResponseEntity<String> deleteSentence(Long sentenceId);

    ResponseEntity<List<Sentence>> getSentencesByDocumentId(Long documentId);
}

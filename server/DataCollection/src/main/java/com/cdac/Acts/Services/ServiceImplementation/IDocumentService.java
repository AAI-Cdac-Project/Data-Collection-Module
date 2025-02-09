package com.cdac.Acts.Services.ServiceImplementation;

import com.cdac.Acts.entities.Document;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IDocumentService {
    
    ResponseEntity<Document> getDocumentById(Long documentId);

    ResponseEntity<Document> createDocument(Document document);

    ResponseEntity<Document> updateDocument(Long documentId, Document document);

    ResponseEntity<String> deleteDocument(Long documentId);

    ResponseEntity<List<Document>> getDocumentsByUserId(Long userId);

    ResponseEntity<List<Document>> getDocumentsByUserName(String email);
}

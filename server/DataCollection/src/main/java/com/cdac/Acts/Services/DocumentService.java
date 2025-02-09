package com.cdac.Acts.Services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cdac.Acts.repository.DocumentsRepository;
import com.cdac.Acts.repository.UserRepository;
import com.cdac.Acts.Services.ServiceImplementation.IDocumentService;
import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DocumentService implements IDocumentService {

	@Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentsRepository documentRepository;

    // Get Document by ID
    public ResponseEntity<Document> getDocumentById(Long documentId) {
        Optional<Document> document = documentRepository.findById(documentId);
        return document.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new Document
    public ResponseEntity<Document> createDocument(Document document) {
        Document savedDocument = documentRepository.save(document);
        return ResponseEntity.status(201).body(savedDocument);
    }

    // Edit an existing Document
    public ResponseEntity<Document> updateDocument(Long documentId, Document document) {
        Optional<Document> existingDocument = documentRepository.findById(documentId);
        if (existingDocument.isPresent()) {
            document.setDocumentId(documentId);  // Ensure the documentId is set
            Document updatedDocument = documentRepository.save(document);
            return ResponseEntity.ok(updatedDocument);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete Document
    public ResponseEntity<String> deleteDocument(Long documentId) {
        Optional<Document> existingDocument = documentRepository.findById(documentId);
        if (existingDocument.isPresent()) {
            documentRepository.deleteById(documentId);
            return ResponseEntity.ok("Document deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    // Get all documents for a user
    public ResponseEntity<List<Document>> getDocumentsByUserId(Long userId) {
        List<Document> documents = documentRepository.findByUserId(userId);
        return documents.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(documents);
    }

	public ResponseEntity<List<Document>> getDocumentsByUserName(String email) {
		User user=userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
		List<Document> documents = documentRepository.findByUserId(user.getUserId());
        return documents.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(documents);
	}

    //FOR ADMIN
    // Get total file count
    public long getTotalFileCount() {
        return documentRepository.count();
    }

    public List<Map<String, Object>> getDocumentStatusOverview() {
        // Implement logic to fetch document status data
        // Example:
        List<Map<String, Object>> documentStatus = new ArrayList<>();
        documentStatus.add(Map.of("name", "Pending", "value", 20L));
        documentStatus.add(Map.of("name", "Verified", "value", 50L));
        documentStatus.add(Map.of("name", "Rejected", "value", 30L));
        return documentStatus;
    }
}

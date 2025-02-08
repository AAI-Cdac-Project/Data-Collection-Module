package com.cdac.Acts.Services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.Status;
import com.cdac.Acts.repository.DocumentsRepository;

import jakarta.transaction.Transactional;

@Service
public class VerifierService implements IVerifierService {

    @Autowired
    private DocumentsRepository documentRepository;

    // Get documents by verifierId
    public List<Document> getDocumentsByVerifierId(Long verifierId) {
        return documentRepository.findByVerifierId(verifierId);
    }

    // Update document status when verified or rejected
    @Transactional
    public Document updateDocumentStatus(Long documentId, Status status, Long verifierId) {
        Optional<Document> documentOptional = documentRepository.findById(documentId);
        
        if (documentOptional.isEmpty()) {
            throw new RuntimeException("Document not found");
        }
        
        Document document = documentOptional.get();
        document.setStatus(status);  // Set the correct enum value
        document.setVerifierId(verifierId); // Update verifier ID
        
        return documentRepository.save(document);
    }
}

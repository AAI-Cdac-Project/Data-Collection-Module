package com.cdac.Acts.controller;

import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.Status;
import com.cdac.Acts.Services.VerifierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for all methods
public class VerifierController {

    @Autowired
    private VerifierService verifierService;

    // Get documents by verifierId
    @GetMapping("/verifier/{verifierId}")
    public List<Document> getDocumentsByVerifier(@PathVariable Long verifierId) {
        return verifierService.getDocumentsByVerifierId(verifierId);
    }

    // Update document status (for verification process)
    @PutMapping("/verify/{documentId}")
    public Document updateDocumentStatus(
            @PathVariable Long documentId,
            @RequestParam String status, // Accept status as a string
            @RequestParam Long verifierId) {
        
        // Convert string to Status enum
        Status documentStatus;
        try {
            documentStatus = Status.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status value: " + status);
        }

        return verifierService.updateDocumentStatus(documentId, documentStatus, verifierId);
    }
}

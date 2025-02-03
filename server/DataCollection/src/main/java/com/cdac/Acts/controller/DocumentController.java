package com.cdac.Acts.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.Acts.services.DocumentService;
import com.cdac.Acts.entities.Document;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Get Document by ID
    @GetMapping("/{documentId}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long documentId) {
        return documentService.getDocumentById(documentId);
    }

    // Create a new document
    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        return documentService.createDocument(document);
    }

    // Edit a document
    @PutMapping("/{documentId}")
    public ResponseEntity<Document> updateDocument(@PathVariable Long documentId, @RequestBody Document document) {
        return documentService.updateDocument(documentId, document);
    }

    // Delete a document
    @DeleteMapping("/{documentId}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long documentId) {
        return documentService.deleteDocument(documentId);
    }
 // Get all documents for a user
    @GetMapping("/username/{userName}")
    public ResponseEntity<List<Document>> getDocumentsByUserName(@PathVariable String userName) {
        return documentService.getDocumentsByUserName(userName);
    }
    // Get all documents for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Document>> getDocumentsByUserId(@PathVariable Long userId) {
        return documentService.getDocumentsByUserId(userId);
    }
}

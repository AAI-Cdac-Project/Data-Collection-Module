package com.cdac.Acts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.Acts.services.FileParserService;


@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileUploadController {
	@Autowired
	FileParserService fileParserService;
	
	@PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam("sourceLanguageId") byte sourceLanguageId,
            @RequestParam("targetLanguageId") byte targetLanguageId) {

        try {
            // Validate file type
            String fileType = file.getContentType();
            if (!fileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") &&
            	!fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document") &&
                !fileType.equals("text/plain") && !fileType.equals("application/msword")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsupported file type");
            }

            // Save document and parse sentences
            fileParserService.processFile(file, userId, sourceLanguageId, targetLanguageId);

            return ResponseEntity.status(HttpStatus.CREATED).body("File uploaded and processed successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        }
    }
}

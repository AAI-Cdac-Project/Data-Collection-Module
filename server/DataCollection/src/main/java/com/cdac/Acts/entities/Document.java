package com.cdac.Acts.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;

    private Long userId;

    private String fileName;

    private String filePath;

    private LocalDateTime uploadDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private Long verifierId;

    

    public Document() {
	}



	public Document(Long documentId, Long userId, String fileName, String filePath, LocalDateTime uploadDate,
			Status status, Long verifierId) {
		super();
		this.documentId = documentId;
		this.userId = userId;
		this.fileName = fileName;
		this.filePath = filePath;
		this.uploadDate = uploadDate;
		this.status = status;
		this.verifierId = verifierId;
	}



	public Long getDocumentId() {
		return documentId;
	}



	public void setDocumentId(Long documentId) {
		this.documentId = documentId;
	}



	public Long getUserId() {
		return userId;
	}



	public void setUserId(Long userId) {
		this.userId = userId;
	}



	public String getFileName() {
		return fileName;
	}



	public void setFileName(String fileName) {
		this.fileName = fileName;
	}



	public String getFilePath() {
		return filePath;
	}



	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}



	public LocalDateTime getUploadDate() {
		return uploadDate;
	}



	public void setUploadDate(LocalDateTime uploadDate) {
		this.uploadDate = uploadDate;
	}



	public Status getStatus() {
		return status;
	}



	public void setStatus(Status status) {
		this.status = status;
	}



	public Long getVerifierId() {
		return verifierId;
	}



	public void setVerifierId(Long verifierId) {
		this.verifierId = verifierId;
	}
}

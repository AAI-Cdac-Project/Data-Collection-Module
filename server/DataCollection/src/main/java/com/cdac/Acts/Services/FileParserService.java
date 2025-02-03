package com.cdac.Acts.services;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.Acts.repository.DocumentsRepository;
import com.cdac.Acts.repository.LanguageRepository;
import com.cdac.Acts.repository.SentenceRepository;
import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.Sentence;


@Service
public class FileParserService {

	@Autowired
    private SentenceRepository sentencesRepository;

    @Autowired
    private DocumentsRepository documentsRepository;

    @Autowired
    private LanguageRepository languageRepository;

    public void processFile(MultipartFile file, Long userId, Byte sourceLanguageId, Byte targetLanguageId) throws Exception {
        // Save the document metadata
        Document document = new Document();
        document.setUserId(userId);
        document.setFileName(file.getOriginalFilename());
        documentsRepository.save(document);

        // Determine file type and parse the file
        String fileType = file.getContentType();
        List<Sentence> sentences = new ArrayList<>();

        
//        Language language = languageRepository.findById(1L)  
//                .orElseThrow(() -> new IllegalArgumentException("Invalid language ID"));

        if (fileType != null && fileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
            // If it's an Excel file, parse it
            sentences = parseExcelFile(file.getInputStream(), document.getDocumentId(), sourceLanguageId, targetLanguageId);
        } 
        else if (fileType != null && fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            // If it's a Word document, parse it
            sentences = parseWordFile(file.getInputStream(), document.getDocumentId(), sourceLanguageId, targetLanguageId);
        } else {
            // For other files, use Tika to parse
            sentences = parseOtherFile(file.getInputStream(), document.getDocumentId(), sourceLanguageId, targetLanguageId);
        }

        // Save the parsed sentences to the database
        sentencesRepository.saveAll(sentences);
    }

    private List<Sentence> parseExcelFile(InputStream inputStream, Long documentId, Byte sourceLanguageId, Byte targetLanguageId) throws Exception {
        List<Sentence> sentences = new ArrayList<>();
        Workbook workbook = WorkbookFactory.create(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header row
            Cell sentenceCell = row.getCell(0);
            Cell translationCell = row.getCell(1);

            if (sentenceCell != null) {
                Sentence sentence = new Sentence();
                sentence.setOriginalSentence(sentenceCell.getStringCellValue());
                sentence.setDocumentId(documentId);
                sentence.setSourceLanguageId(sourceLanguageId);
                sentence.setTargetlanguageId(targetLanguageId);

                if (translationCell != null) {
                    sentence.setTranslation(translationCell.getStringCellValue());
                }

                sentences.add(sentence);
            }
        }

        workbook.close();
        return sentences;
    }

    private List<Sentence> parseWordFile(InputStream inputStream, Long documentId, Byte sourceLanguageId, Byte targetLanguageId) throws Exception {
        List<Sentence> sentences = new ArrayList<>();

        // Create a Word document object using Apache POI
        XWPFDocument document = new XWPFDocument(inputStream);

        // Iterate over paragraphs to extract sentences
        for (org.apache.poi.xwpf.usermodel.XWPFParagraph paragraph : document.getParagraphs()) {
            String paragraphText = paragraph.getText().trim();
            if (!paragraphText.isEmpty()) {
                // Split the paragraph into original sentence and translation using the delimiter " - "
                String[] parts = paragraphText.split(" - ");
                if (parts.length == 2) {
                    Sentence sentence = new Sentence();
                    sentence.setOriginalSentence(parts[0].trim());
                    sentence.setTranslation(parts[1].trim());
                    sentence.setDocumentId(documentId);
                    sentence.setSourceLanguageId(sourceLanguageId);
                    sentence.setTargetlanguageId(targetLanguageId);
                    sentences.add(sentence);
                }
            }
        }

        document.close();
        return sentences;
    }
    private List<Sentence> parseOtherFile(InputStream inputStream, Long documentId, byte sourceLanguageId, byte targetLanguageId) throws Exception {
        List<Sentence> sentences = new ArrayList<>();
        Tika tika = new Tika();
        String content = tika.parseToString(inputStream);

        // Split the content by lines
        for (String line : content.split("\n")) {
            if (!line.trim().isEmpty()) {
                Sentence sentence = new Sentence();
                sentence.setOriginalSentence(line.trim());
                sentence.setDocumentId(documentId);
                sentence.setSourceLanguageId(sourceLanguageId);
                sentence.setTargetlanguageId(targetLanguageId);
                sentences.add(sentence);
            }
        }

        return sentences;
    }
}

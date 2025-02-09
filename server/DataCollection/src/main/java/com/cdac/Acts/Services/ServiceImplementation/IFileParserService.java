package com.cdac.Acts.Services.ServiceImplementation;

import org.springframework.web.multipart.MultipartFile;

public interface IFileParserService {

    void processFile(MultipartFile file, Long userId, Byte sourceLanguageId, Byte targetLanguageId) throws Exception;
}
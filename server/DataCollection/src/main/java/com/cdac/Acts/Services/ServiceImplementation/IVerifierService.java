package com.cdac.Acts.Services.ServiceImplementation;

import com.cdac.Acts.entities.Document;
import com.cdac.Acts.entities.Status;
import java.util.List;

public interface IVerifierService {

    List<Document> getDocumentsByVerifierId(Long verifierId);

    Document updateDocumentStatus(Long documentId, Status status, Long verifierId);
}

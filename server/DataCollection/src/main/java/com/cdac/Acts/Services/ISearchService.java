package com.cdac.Acts.Services;

import com.cdac.Acts.entities.GlobalDatabase;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISearchService {

    ResponseEntity<List<GlobalDatabase>> search(String keyword);
}

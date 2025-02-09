package com.cdac.Acts.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.Acts.Services.ServiceImplementation.ISearchService;
import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.repository.GlobalDatabaseRepository;

import io.swagger.v3.oas.annotations.servers.Server;

@Service
public class SearchService implements ISearchService{
	
	@Autowired
	GlobalDatabaseRepository globaldatabaserepository;
	
	public ResponseEntity<List<GlobalDatabase>> search(String keyword) {
        try {
            if (keyword == null || keyword.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }

            List<GlobalDatabase> sentences = globaldatabaserepository.searchByKeyword(keyword);
            System.out.println(sentences);
            return sentences.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(sentences);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}

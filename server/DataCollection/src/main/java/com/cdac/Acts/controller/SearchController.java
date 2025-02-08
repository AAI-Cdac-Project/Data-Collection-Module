package com.cdac.Acts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.Acts.Services.SearchService;
import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.entities.Sentence;

@RestController
@RequestMapping("/api/global")
public class SearchController {
	
	@Autowired
	SearchService searchService;
	@GetMapping("/search")
    public ResponseEntity<List<GlobalDatabase>> search(@Param("keyword") String keyword) {
    	return searchService.search(keyword);
    }
	

}

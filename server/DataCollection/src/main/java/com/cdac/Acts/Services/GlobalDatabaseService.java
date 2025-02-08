package com.cdac.Acts.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Acts.entities.GlobalDatabase;
import com.cdac.Acts.repository.GlobalDatabaseRepository;

import jakarta.transaction.Transactional;

@Service
public class GlobalDatabaseService {

    @Autowired
    private GlobalDatabaseRepository globalDatabaseRepository;

    @Transactional
    public GlobalDatabase save(GlobalDatabase globalDatabase) {
        return globalDatabaseRepository.save(globalDatabase);
    }
}

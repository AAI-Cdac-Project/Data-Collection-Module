package com.cdac.Acts.Services.ServiceImplementation;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.cdac.Acts.entities.User;

public interface IAdminService {
    
    ResponseEntity<User> addNewUser(User user);

    void deleteUser(Long userId);

    List<User> getAllUsers();

    long getTotalVerifierCount();
}

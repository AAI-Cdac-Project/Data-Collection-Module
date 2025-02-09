package com.cdac.Acts.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.Acts.Services.ServiceImplementation.IAdminService;
import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

        public ResponseEntity<User> addNewUser(User user) {

            
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setCreatedAt(LocalDateTime.now());
            user.setIsVerified(true);
            user.setUpdatedAt(LocalDateTime.now());
            User savedUser = userRepository.save(user);
            return ResponseEntity.status(201).body(savedUser);
        }
    
        public void deleteUser(Long userId) {
            userRepository.deleteById(userId);
        }
    
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }
    
        // Get total verifier count
        public long getTotalVerifierCount() {
            return userRepository.countByRole(Role.VERIFIER);
        } 

}

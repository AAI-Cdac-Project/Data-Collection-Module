package com.cdac.Acts.services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.Acts.config.JWTProvider;
import com.cdac.Acts.repository.UserRepository;
import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.dto.SignUpRequest;
import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTProvider JWTProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    // Register a new user(Sign Up Method For User )
    public ResponseEntity<User> registerUser(SignUpRequest signUpRequest) {
        if (userRepository.findByUsername(signUpRequest.getUsername()) != null) {
            return ResponseEntity.badRequest().body(null); // Username already exists
        }

        String encodePassword = passwordEncoder.encode(signUpRequest.getPassword());
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(encodePassword);
        user.setFullName(signUpRequest.getFullName());
        user.setRole(Role.USER);

        user.setRefreshToken(null);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setActive(true); // Set the user to active on creation
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(201).body(savedUser);
    }

    // Get user details by ID
    public ResponseEntity<User> getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Edit user details
    public ResponseEntity<User> updateUser(Long userId, User userDetails) {
        return userRepository.findById(userId)
                .map(existingUser -> {
                    existingUser.setUsername(userDetails.getUsername());
                    existingUser.setFullName(userDetails.getFullName());
                    existingUser.setRole(userDetails.getRole());
                    existingUser.setPassword(userDetails.getPassword());
                    existingUser.setRefreshToken(userDetails.getRefreshToken());
                    existingUser.setUpdatedAt(LocalDateTime.now());
                    User updatedUser = userRepository.save(existingUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Sign In a new user
    public Object signInUser(LoginRequest loginRequest){
        String username = loginRequest.getUsername();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.badRequest().body(null); // User not found
        }
        // Check if the user is active
        if (!user.isActive()) {
            return ResponseEntity.badRequest().body(null); // User is not active
        }
        // Check if the password is correct
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect password"); // Incorrect password
        }
        // Generate a JWT token
        String token = JWTProvider.generateToken(username, user.getRole().name());

        return new LoginResponse(token, username, user.getRole().name(),user.getUserId());
        
    }
}

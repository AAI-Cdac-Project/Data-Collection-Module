package com.cdac.Acts.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.cdac.Acts.repository.UserRepository;
import com.cdac.Acts.util.EmailUtil;
import com.cdac.Acts.util.OtpUtil;

import jakarta.mail.MessagingException;

import com.cdac.Acts.dto.SignUpRequest;
import com.cdac.Acts.entities.User;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    PasswordEncoder passwordEncoder;

    // Register a new user(Sign Up Method For User )
    // public ResponseEntity<User> registerUser(SignUpRequest signUpRequest) {
        
    //     if (userRepository.findByEmail(signUpRequest.getEmail()) != null) {
    //         return ResponseEntity.badRequest().body(null); // Email already exists
    //     }

    //     String encodePassword = passwordEncoder.encode(signUpRequest.getPassword());
    //     User user = new User();
    //     user.setEmail(signUpRequest.getEmail());
    //     user.setPassword(encodePassword);
    //     user.setFullName(signUpRequest.getFullName());
    //     user.setRole(Role.USER);

    //     user.setCreatedAt(LocalDateTime.now());
    //     user.setUpdatedAt(LocalDateTime.now());
    //     User savedUser = userRepository.save(user);
    //     return ResponseEntity.status(201).body(savedUser);
    // }
    public String registerUser(SignUpRequest signUpRequest) {
        String otp = otpUtil.generateOtp();
        try {
          emailUtil.sendOtpEmail(signUpRequest.getEmail(), otp);
        } catch (MessagingException e) {
          throw new RuntimeException("Unable to send otp please try again");
        }
        User user = new User();
        String encodePassword = passwordEncoder.encode(signUpRequest.getPassword());
        user.setFullName(signUpRequest.getFullName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encodePassword);
        user.setOtp(otp);
        userRepository.save(user);
        return "User registration successful";
      }

    // Verify account
      public String verifyAccount(String email, String otp) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        if (user.getOtp().equals(otp)) {
          user.setIsVerified(true);
          userRepository.save(user);
          return "OTP verified you can login";
        }
        //wrong OTp case - in our project need to change
        return "You cannot login";
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
                    existingUser.setEmail(userDetails.getEmail());
                    existingUser.setFullName(userDetails.getFullName());
                    existingUser.setRole(userDetails.getRole());
                    existingUser.setPassword(userDetails.getPassword());
                    existingUser.setUpdatedAt(LocalDateTime.now());
                    User updatedUser = userRepository.save(existingUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}

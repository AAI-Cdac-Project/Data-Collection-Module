package com.cdac.Acts.Services;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.cdac.Acts.repository.UserRepository;
import com.cdac.Acts.util.EmailUtil;
import com.cdac.Acts.util.OtpUtil;

import jakarta.mail.MessagingException;

import com.cdac.Acts.Services.ServiceImplementation.IUserService;
import com.cdac.Acts.dto.SignUpRequest;
import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpUtil otpUtil;

    @Autowired
    private EmailUtil emailUtil;

    @Autowired
    PasswordEncoder passwordEncoder;
    public ResponseEntity<String> registerUser(SignUpRequest signUpRequest) {
    	if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {   		
    	         return ResponseEntity.badRequest().body("User Already Existed!"); // Email already exists
    	}
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
        return ResponseEntity.status(201).body("User registration successful");
      }
    
    public boolean resetPassword(String email, String otp, String newPassword, OtpService otpService) {
        if (!otpService.verifyOtp(email, otp)) {
            return false;
        }

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(existingUser);
            return true;
        }
        return false;
    }
    
    // Verify account
      public String verifyAccount(String email, String otp) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        if (user.getOtp().equals(otp)) {
          user.setIsVerified(true);
          userRepository.save(user);
          return "OTP verified Successfully...! You can now Login with new Credentials.";
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
    
 // Edit userName details
    public ResponseEntity<User> updateUserFullName(Long userId, User userDetails) {
        return userRepository.findById(userId)
                .map(existingUser -> {                   
                    existingUser.setFullName(userDetails.getFullName());
                    existingUser.setUpdatedAt(LocalDateTime.now());
                    User updatedUser = userRepository.save(existingUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


     //FOR ADMIN
  

// Get user details by Email
public Optional<User> findByEmail(String Email) {
  return userRepository.findByEmail(Email);
}

// Get total user count
public long getTotalUserCount(Role role) {
  return userRepository.countByRole(role);
}

// Get recently added users by role
public List<User> getRecentUsersByRole(Role role) {
  return userRepository.findTop10ByRoleOrderByCreatedAtDesc(role);
}


}

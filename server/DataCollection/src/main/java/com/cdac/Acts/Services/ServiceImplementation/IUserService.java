package com.cdac.Acts.Services.ServiceImplementation;

import com.cdac.Acts.Services.OtpService;
import com.cdac.Acts.dto.SignUpRequest;
import com.cdac.Acts.entities.User;
import org.springframework.http.ResponseEntity;

public interface IUserService {

    ResponseEntity<String> registerUser(SignUpRequest signUpRequest);

    boolean resetPassword(String email, String otp, String newPassword, OtpService otpService);

    String verifyAccount(String email, String otp);

    ResponseEntity<User> getUserById(Long userId);

    ResponseEntity<User> updateUser(Long userId, User userDetails);

    ResponseEntity<User> updateUserFullName(Long userId, User userDetails);
}


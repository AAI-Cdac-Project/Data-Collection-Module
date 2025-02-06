package com.cdac.Acts.controller;


import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.dto.OtpVerificationRequest;
import com.cdac.Acts.dto.ResetPasswordRequest;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.Services.AuthService;
import com.cdac.Acts.Services.OtpService;
import com.cdac.Acts.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;


    @Autowired
    private UserService userService;
    
    @Autowired
    private OtpService otpService;


    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody User user) {
        otpService.generateAndSendOtp(user.getEmail());
        return ResponseEntity.ok("OTP sent successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean success = userService.resetPassword(request.getEmail(), request.getOtp(), request.getNewPassword(), otpService);
        if (success) {
            return ResponseEntity.ok("Password reset successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP or email");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return new ResponseEntity<>(authService.login(loginRequest), HttpStatus.OK);
    }
    
    // @GetMapping("/sendOtp")
    // public ResponseEntity<String> sendOtp(@RequestBody String email) {
    //     String response = authService.sendOtp(email);
    //     return ResponseEntity.ok(response);
    // }

    //Enpoint for verify Otp Authentication

    // @PostMapping("/verifyOtp")
    // public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest otpVerificationRequest) {
    //     String response = authService.verifyOtp(otpVerificationRequest);

    //     return ResponseEntity.ok(response);
    // }
}




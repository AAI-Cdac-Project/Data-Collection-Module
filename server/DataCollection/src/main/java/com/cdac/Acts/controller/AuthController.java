package com.cdac.Acts.controller;


import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.dto.OtpVerificationRequest;
import com.cdac.Acts.Services.AuthService;
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




package com.cdac.Acts.Services;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.Acts.config.JWTProvider;
import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.dto.OtpVerificationRequest;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;

@Service
public class AuthService implements IAuthService{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTProvider jwtProvider;

    public LoginResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        
        String token;

        // Check if the user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + loginRequest.getEmail()));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new LoginResponse(null,null,null,null,null, "Invalid credentials");
        } else if (!user.getIsVerified()) {
            return new LoginResponse(null ,null,null ,null,null, "Email is Not Verified yet, OTP sent to your email");
        }
        // Generate JWT token
        token = jwtProvider.generateToken(user.getEmail(), user.getRole().name());
        return new LoginResponse(token,user.getFullName(), user.getEmail(),user.getRole().name(),user.getUserId(), "Login successful");
    }

    // public void sendOtp(User user) {
    //     String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

    //     user.setOtp(otp);
    //     userRepository.save(user);
    //     mailSenderService.sendOtp(user.getEmail(), otp);
    // }

    // // verify otp method
    // public String verifyOtp(OtpVerificationRequest request) {

    //     // Fetch the user by ID
    //     User user = userRepository.findByEmail(request.getEmail())
    //             .orElseThrow(() -> new RuntimeException("User not found"));

    //     // Check if the OTP exists and matches
    //     if (user.getOtp() == null || !user.getOtp().equals(request.getOtp())) {
    //         throw new RuntimeException("Invalid OTP");
    //     }

    //     // Mark coordinator as verified
    //     user.setIsVerified(true);
    //     user.setOtp(null); // Clear OTP after successful verification
    //     user.setOtpExpiration(null); // Clear expiration time
    //     userRepository.save(user);

    //     return "User verified successfully";
    // }
}

package com.cdac.Acts.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.Acts.config.JWTProvider;
import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;

@Service
public class AuthService {
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
            return new LoginResponse(null ,null ,null ,null,null, "OTP sent to your email");
        }
        // Generate JWT token
        token = jwtProvider.generateToken(user.getEmail(), user.getRole().name());
        return new LoginResponse(token,user.getFullName() ,user.getEmail(),user.getRole().name(),user.getUserId(), "Login successful");
    }

}

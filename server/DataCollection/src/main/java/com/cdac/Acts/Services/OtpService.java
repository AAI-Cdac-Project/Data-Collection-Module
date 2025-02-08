package com.cdac.Acts.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.Acts.entities.OtpToken;
import com.cdac.Acts.repository.OtpRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService implements IOtpService{
    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    public void generateAndSendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000); // Generate 6-digit OTP
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);

        OtpToken otpToken = new OtpToken();
        otpToken.setEmail(email);
        otpToken.setOtp(otp);
        otpToken.setExpiryTime(expiryTime);
        otpRepository.save(otpToken);

        emailService.sendEmail(email, "Your OTP Code", "Your OTP code is: " + otp);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<OtpToken> otpToken = otpRepository.findByEmail(email);
        if (otpToken.isPresent()) {
            OtpToken token = otpToken.get();
            return token.getOtp().equals(otp) && token.getExpiryTime().isAfter(LocalDateTime.now());
        }
        return false;
    }
}

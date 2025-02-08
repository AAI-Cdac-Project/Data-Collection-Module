package com.cdac.Acts.Services;

public interface IOtpService {

    void generateAndSendOtp(String email);

    boolean verifyOtp(String email, String otp);
}
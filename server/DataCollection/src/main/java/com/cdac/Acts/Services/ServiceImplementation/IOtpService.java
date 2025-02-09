package com.cdac.Acts.Services.ServiceImplementation;

public interface IOtpService {

    void generateAndSendOtp(String email);

    boolean verifyOtp(String email, String otp);
}
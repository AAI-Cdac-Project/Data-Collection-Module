package com.cdac.Acts.Services;

public interface IEmailService {
    
    void sendEmail(String to, String subject, String message);
}


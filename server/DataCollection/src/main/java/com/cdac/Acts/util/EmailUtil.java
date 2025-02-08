package com.cdac.Acts.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailUtil {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendOtpEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("AnuvaadKosh Account Verification - OTP Required");
        
        String verificationLink = "http://localhost:8080/api/user/verify-account?email=" + email + "&otp=" + otp;
        
        String htmlContent = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
                <style>
                    body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                    .container { max-width: 600px; margin: 20px auto; padding: 40px; background-color: #f7f9fc; }
                    .header { text-align: center; padding-bottom: 30px; }
                    .logo { max-width: 200px; height: auto; }
                    .content { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #2b3d4f; margin-bottom: 30px; font-size: 24px; text-align: center; }
                    .cta-button { 
                        display: block; 
                        width: 200px; 
                        margin: 30px auto; 
                        padding: 15px; 
                        text-align: center; 
                        background-color: #1a73e8; 
                        color: white; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        font-weight: bold; 
                    }
                    .cta-button:hover { background-color: #1557b0; }
                    .footer { 
                        margin-top: 30px; 
                        text-align: center; 
                        color: #6c757d; 
                        font-size: 12px; 
                        line-height: 1.5;
                    }
                    .otp-warning { 
                        color: #dc3545; 
                        font-size: 14px; 
                        text-align: center; 
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    
                    <div class="content">
                        <h1>Verify Your Email Address</h1>
                        <p style="text-align: center; color: #4a5568; line-height: 1.6;">
                            Thank you for registering with AnuvaadKosh! To complete your registration, 
                            please click the button below to verify your email address:
                        </p>
                        <a href="%s" class="cta-button">Verify Email Address</a>
                        <p class="otp-warning">
                            Note:  Do not share this OTP with anyone.
                        </p>
                    </div>
                    <div class="footer">
                        <p>This email was sent to %s as part of your AnuvaadKosh registration.</p>
                        <p>If you did not request this, please ignore this email.</p>
                        <p>© 2024 AnuvaadKosh. All rights reserved.<br>
                        XYZ Business Park, Sector 18, Noida, Uttar Pradesh 201301</p>
                        <p style="margin-top: 15px;">
                            <a href="https://anuvaadkosh.com/privacy" style="color: #1a73e8; text-decoration: none;">Privacy Policy</a> | 
                            <a href="https://anuvaadkosh.com/terms" style="color: #1a73e8; text-decoration: none;">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(verificationLink, email);

        mimeMessageHelper.setText(htmlContent, true);
        javaMailSender.send(mimeMessage);
    }
}
// package com.cdac.Acts.Services;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class MailSenderService{

//     @Autowired
//     private JavaMailSender mailSender;

//     public void sendOtp(String toEmail, String otp) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(toEmail);
//         message.setSubject("Your OTP for Verification");
//         message.setText("Your OTP is: " + otp);
//         mailSender.send(message);
//     }
// }

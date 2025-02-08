package com.cdac.Acts.util;
import org.springframework.stereotype.Component;

@Component
public class OtpUtil {

  public String generateOtp() {

    String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
    return otp;
  }
}

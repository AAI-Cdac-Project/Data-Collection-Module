package com.cdac.Acts.Services.ServiceImplementation;

import com.cdac.Acts.dto.LoginRequest;
import com.cdac.Acts.dto.LoginResponse;
import com.cdac.Acts.dto.OtpVerificationRequest;

public interface IAuthService {
    
    LoginResponse login(LoginRequest loginRequest);

    // You can uncomment and include the methods for OTP as well if needed
    // void sendOtp(User user);
    // String verifyOtp(OtpVerificationRequest request);
}

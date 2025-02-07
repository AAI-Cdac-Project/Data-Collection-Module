package com.cdac.Acts.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.Date;


@Component
public class JWTProvider {

    @Value("${app.jwtSecret}")
    private String secretKey;

    @Value("${app.jwtExpirationMs}")
    private long expirationTime;

    // 1. Creation of JWT token
    // Generate JWT Token with Role
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email) // Set email as the subject (user identifier)
                .claim("role", role) // Set the user role in the claims
                .setIssuedAt(new Date()) // Set the issue date
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime)) // Set the expiration (1 hour in this case)
                .signWith(SignatureAlgorithm.HS512, secretKey) // Sign the token with your secret key
                .compact(); // Create the token
    }


    // 2. Validation of JWT token
    public boolean validateToken(String token, String email) {
        try {
            String tokenEmail = extractUsername(token); // Extract email from token
            return tokenEmail.equals(email) && !isTokenExpired(token); // Validate email and expiration
        } catch (Exception e) {
            return false;
        }
    }

    // Extract Username from Token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();  // Subject contains the username (email or ID)
    }

    // Extract Role from Token
    public String extractRole(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey) // Use your secret key 
                    .parseClaimsJws(token)
                    .getBody();

            // Extract the role from the claims and return it, ensuring it's a String
            return claims.get("role", String.class);
        } catch (JwtException | IllegalArgumentException e) {
            
            return null;  // Return null if there's an error in parsing the token or extracting the claim
        }
    }

    // Private Helper Method: Extract Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }


    // 3. Check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }
}

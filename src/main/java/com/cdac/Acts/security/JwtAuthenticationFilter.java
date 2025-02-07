package com.cdac.Acts.security;

import com.cdac.Acts.config.CustomDBBasedUserDetailsService;
import com.cdac.Acts.config.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTProvider jwtProvider;

    @Autowired
    private CustomDBBasedUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                
                // Extract email (username) from JWT token
                String email = jwtProvider.extractUsername(token);
                
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // Load user details from database
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    
                    // Validate the token
                    if (jwtProvider.validateToken(token, email)) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    } else {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid/Expired JWT");
                        return;
                    }
                }
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed: " + e.getMessage());
            return;
        }
        
        filterChain.doFilter(request, response);
    }
}

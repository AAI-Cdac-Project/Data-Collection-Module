package com.cdac.Acts.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;

@Configuration
public class InitialAdminSetup {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner createAdminUser(UserRepository userRepository) {
        return args -> {
            // Check if any users exist in the database
            if (userRepository.count() == 0) {
                // Create and save an initial admin user
                User admin = new User();
                admin.setUsername("admin"); // Set a default username
                admin.setPassword(passwordEncoder.encode("admin123")); // Set a default password
                admin.setRole(Role.ADMIN); // Set role to ADMIN
                userRepository.save(admin);
                System.out.println("Initial admin user created with username 'admin' and password 'admin123'");
            }
        };
    }
}

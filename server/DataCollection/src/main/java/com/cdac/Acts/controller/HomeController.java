package com.cdac.Acts.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//Defines API endpoints with different access levels for public, authenticated users, and admin
@RestController
@RequestMapping("/api")
public class HomeController {
 
    @GetMapping("/public/info")
    public String publicEndpoint() {
        return "This is a public endpoint, accessible to everyone.";
    }

    @GetMapping("/auth/info")
    public String authEndpoint() {
        return "This endpoint requires authentication.";
    }

    @GetMapping("/admin/info")
    public String adminEndpoint() {
        return "This endpoint is restricted to users with ADMIN role.";
    }

    @GetMapping("/user/info")
    public String userEndpoint() {
        return "This endpoint is accessible to users with USER or ADMIN roles.";
    }
    @GetMapping("/documents/info")
    public String documentEndpoint() {
        return "This is a document endpoint, accessible to everyone.";
    }
    
}

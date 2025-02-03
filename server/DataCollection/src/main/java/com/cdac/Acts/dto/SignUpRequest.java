package com.cdac.Acts.dto;

import com.cdac.Acts.entities.Role;

import lombok.Data;

@Data
public class SignUpRequest {


    private String username;

    private String password;

    private String fullName;

    private Role role;

    public SignUpRequest() {
    }

    public SignUpRequest(String username, String password, String fullName) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }  
    
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

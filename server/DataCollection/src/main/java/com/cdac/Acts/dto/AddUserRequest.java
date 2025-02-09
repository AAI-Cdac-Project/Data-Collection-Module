package com.cdac.Acts.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddUserRequest {
    private String fullName;
    private String email;
    private String password;
    private String role;

    
}

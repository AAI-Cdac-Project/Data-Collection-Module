package com.cdac.Acts.controller;

import com.cdac.Acts.dto.AddUserRequest;
import com.cdac.Acts.dto.SearchUserRequest;
import com.cdac.Acts.dto.UpdateUserRequest;
import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;
import com.cdac.Acts.Services.AdminService;
import com.cdac.Acts.Services.DocumentService;
import com.cdac.Acts.Services.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private DocumentService documentService;

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody AddUserRequest addUserRequest) {
        User user = new User();
        Role role = Role.valueOf(addUserRequest.getRole().toUpperCase());

        user.setFullName(addUserRequest.getFullName());
        user.setEmail(addUserRequest.getEmail());
        user.setPassword(addUserRequest.getPassword());
        user.setRole(role);
        return adminService.addNewUser(user);
    }

    @PostMapping("/searchUser")
    public ResponseEntity<Optional<User>> searchUser(@RequestBody SearchUserRequest searchUserRequest) {
        Optional<User> user = userService.findByEmail(searchUserRequest.getEmail());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateUser/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UpdateUserRequest updateUserRequest) {
        User userDetails = new User();
        userDetails.setFullName(updateUserRequest.getFullName());
        userDetails.setEmail(updateUserRequest.getEmail());
        userDetails.setPassword(updateUserRequest.getPassword());
        userDetails.setRole(Role.valueOf(updateUserRequest.getRole()));
        return userService.updateUser(userId, userDetails);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    //  method to get admin stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getAdminStats() {
        long totalFiles = documentService.getTotalFileCount();
        long totalUsers = userService.getTotalUserCount(Role.USER);
        long totalVerifiers = userService.getTotalUserCount(Role.VERIFIER);

        Map<String, Long> stats = new HashMap<>();
        stats.put("files", totalFiles);
        stats.put("users", totalUsers);
        stats.put("verifiers", totalVerifiers);

        return ResponseEntity.ok(stats);

        
    }

    @GetMapping("/documentStatus")
    public ResponseEntity<List<Map<String, Object>>> getDocumentStatus() {
        List<Map<String, Object>> documentStatus = documentService.getDocumentStatusOverview();
        return ResponseEntity.ok(documentStatus);
    }

    // New endpoint to fetch recently added verifiers
    @GetMapping("/verifiers/recent")
    public ResponseEntity<List<User>> getRecentVerifiers() {
        List<User> verifiers = userService.getRecentUsersByRole(Role.VERIFIER);
        return ResponseEntity.ok(verifiers);
    }

    @GetMapping("/users/recent")
    public ResponseEntity<List<User>> getRecentUsers() {
        List<User> users = userService.getRecentUsersByRole(Role.USER);
        return ResponseEntity.ok(users);
    }

    // New endpoint to search verifier by email
    @GetMapping("/verifiers")
    public ResponseEntity<Optional<User>> searchVerifierByEmail(@RequestParam String email) {
        Optional<User> verifier = userService.findByEmail(email);
        if (verifier.isPresent() && verifier.get().getRole() == Role.VERIFIER) {
            return ResponseEntity.ok(verifier);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // New endpoint to search verifier by email
    @GetMapping("/users")
    public ResponseEntity<Optional<User>> searchUserByEmail(@RequestParam String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isPresent() && user.get().getRole() == Role.USER) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}
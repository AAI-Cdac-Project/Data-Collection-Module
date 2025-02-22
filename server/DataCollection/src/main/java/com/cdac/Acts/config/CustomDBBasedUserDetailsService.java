package com.cdac.Acts.config;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.cdac.Acts.entities.Role;
import com.cdac.Acts.entities.User;
import com.cdac.Acts.repository.UserRepository;

@Service
public class CustomDBBasedUserDetailsService  implements UserDetailsService{

    @Autowired
    private UserRepository userRepository; 

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // We are providing our own custom logic for verifying user authentication.
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 2. If user is legal return the instance of `UserDetails`---------------------------------------------------------------------
            // a. Mapping custom_role_system to spring_security_compatible role_system 
            Role role = user.getRole() ;
            String authorities = role.name();
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add(new SimpleGrantedAuthority(authorities));

            // b. Returning UserDetails instance having user info and permissions
            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    true,
                    true, // accountNonExpired
                    true, // credentialsNonExpired
                    true, // accountNonLocked
                    grantedAuthorities);
    }
}

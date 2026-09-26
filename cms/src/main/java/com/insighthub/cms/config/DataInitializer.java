package com.insighthub.cms.config;

import com.insighthub.cms.entity.Role;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.RoleRepository;
import com.insighthub.cms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        createRoleIfNotExists("ADMIN");
        createRoleIfNotExists("AUTHOR");
        createRoleIfNotExists("READER");

        assignAdminRole("raj@gmail.com");
    }

    private Role createRoleIfNotExists(String name) {
        return roleRepository.findByName(name).orElseGet(() -> {
            Role role = new Role();
            role.setName(name);
            return roleRepository.save(role);
        });
    }

    private void assignAdminRole(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

            if (user.getRoles() == null) {
                user.setRoles(new HashSet<>());
            }

            user.getRoles().add(adminRole);
            userRepository.save(user);
        });
    }
}
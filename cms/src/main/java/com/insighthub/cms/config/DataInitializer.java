package com.insighthub.cms.config;
import com.insighthub.cms.entity.Role;
import com.insighthub.cms.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
@Component
public class DataInitializer implements CommandLineRunner{
    private final RoleRepository roleRepository;
    public DataInitializer(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }
    @Override
    public void run(String... args){
        createRoleIfNotExists("ADMIN");
        createRoleIfNotExists("AUTHOR");
        createRoleIfNotExists("READER");
    }
    private void createRoleIfNotExists(String name){
        if(roleRepository.findByName(name).isEmpty()){
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
    }
}

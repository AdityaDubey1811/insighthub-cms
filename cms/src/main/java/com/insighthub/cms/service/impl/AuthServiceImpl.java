package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.*;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.security.JwtUtil;
import com.insighthub.cms.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    @Override
    public AuthResponse register(RegisterRequest request){
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
    @Override
    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())

                .orElseThrow(() -> new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}

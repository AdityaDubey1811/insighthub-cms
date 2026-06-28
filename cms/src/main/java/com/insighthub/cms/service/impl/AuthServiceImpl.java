package com.insighthub.cms.service.impl;
import com.insighthub.cms.entity.Role;
import com.insighthub.cms.dto.*;
import com.insighthub.cms.entity.RefreshToken;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.RoleRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.security.JwtUtil;
import com.insighthub.cms.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.insighthub.cms.service.RefreshTokenService;
import java.util.Set;
@Service
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final RoleRepository roleRepository;
    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil,
                           RefreshTokenService refreshTokenService,
                           RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshTokenService = refreshTokenService;
        this.roleRepository = roleRepository;
    }
    @Override
    public AuthResponse register(RegisterRequest request){
        Role authorRole = roleRepository.findByName("AUTHOR")
                .orElseThrow(() -> new RuntimeException("Author role not found"));
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(Set.of(authorRole));
        userRepository.save(user);
        String accessToken = jwtUtil.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getEmail());
        return new AuthResponse(accessToken,refreshToken.getToken());
    }
    @Override
    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())

                .orElseThrow(() -> new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }
        String accessToken = jwtUtil.generateToken(user.getEmail());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken.getToken());
    }
}

package com.insighthub.cms.controller;
import com.insighthub.cms.dto.UserProfileResponse;
import com.insighthub.cms.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }
    @PostMapping("/{userId}/follow")
    public void toggleFollow(@PathVariable Long userId,
                             Authentication authentication){
        userService.toggleFollow(userId, authentication.getName());
    }
    @GetMapping("/{userId}")
    public UserProfileResponse getProfile(@PathVariable Long userId){
        return userService.getProfile(userId);
    }
}

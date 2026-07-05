package com.insighthub.cms.service.impl;
import com.insighthub.cms.dto.UserProfileResponse;
import com.insighthub.cms.entity.Follower;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.FollowerRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.UserService;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;
    public UserServiceImpl(UserRepository userRepository,
                           FollowerRepository followerRepository){
        this.userRepository = userRepository;
        this.followerRepository = followerRepository;
    }
    @Override
    public void toggleFollow(Long userId,String currentUserEmail){
        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Target user not found"));
        if(currentUser.getId() == targetUser.getId()){
            throw new RuntimeException("You cannot follow yourself");
        }
        Optional<Follower> existing = followerRepository
                .findByFollowerIdAndFollowingId(currentUser.getId(), targetUser.getId());
        if(existing.isPresent()){
            followerRepository.delete(existing.get());
            return;
        }
        Follower follower = new Follower();
        follower.setFollower(currentUser);
        follower.setFollowing(targetUser);
        followerRepository.save(follower);
    }
    @Override
    public UserProfileResponse getProfile(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setFollowers(followerRepository.countByFollowingId(userId));
        response.setFollowing(followerRepository.countByFollowerId(userId));
        return response;
    }
}

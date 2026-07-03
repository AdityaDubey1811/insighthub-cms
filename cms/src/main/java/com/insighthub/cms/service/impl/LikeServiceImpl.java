package com.insighthub.cms.service.impl;
import com.insighthub.cms.entity.Post;
import com.insighthub.cms.entity.PostLike;
import com.insighthub.cms.entity.User;
import com.insighthub.cms.repository.PostRepository;
import com.insighthub.cms.repository.PostLikeRepository;
import com.insighthub.cms.repository.UserRepository;
import com.insighthub.cms.service.LikeService;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class LikeServiceImpl implements LikeService {
    private final PostLikeRepository postLikeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public LikeServiceImpl(PostLikeRepository postLikeRepository,
                           PostRepository postRepository,
                           UserRepository userRepository){
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public void toggleLike(Long postId,String userEmail){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Optional<PostLike> existingLike =
                postLikeRepository.findByPostIdAndUserId(postId, user.getId());
        if(existingLike.isPresent()){
            postLikeRepository.delete(existingLike.get());
            return;
        }
        PostLike like = new PostLike();
        like.setPost(post);
        like.setUser(user);
        postLikeRepository.save(like);
    }
    @Override
    public long getLikeCount(Long postId){
        return postLikeRepository.countByPostId(postId);
    }
}

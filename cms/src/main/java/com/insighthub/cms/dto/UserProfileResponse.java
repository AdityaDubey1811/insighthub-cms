package com.insighthub.cms.dto;
import lombok.Data;
import java.util.Set;
@Data
public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private Long followers;
    private long following;
    private Set<String> roles;
}

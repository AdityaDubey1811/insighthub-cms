package com.insighthub.cms.controller;
import com.insighthub.cms.dto.PostVersionResponse;
import com.insighthub.cms.service.VersionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
public class VersionController {
    private final VersionService versionService;
    public VersionController(VersionService versionService){
        this.versionService = versionService;
    }
    @GetMapping("/posts/{postId}/versions")
    @PreAuthorize("hasAnyRole('AUTHOR','ADMIN')")
    public List<PostVersionResponse> getVersions(@PathVariable Long postId){
        return versionService.getVersions(postId);
    }
    @PostMapping("versions/{versionId}/restore")
    @PreAuthorize("hasAnyRole('AUTHOR','ADMIN')")
    public void restoreVersion(@PathVariable Long versionId){
        versionService.restoreVersion(versionId);
    }
}

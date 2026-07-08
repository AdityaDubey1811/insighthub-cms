package com.insighthub.cms.service;
import com.insighthub.cms.dto.PostVersionResponse;
import java.util.List;
public interface VersionService {
    List<PostVersionResponse> getVersions(Long postId);
    void restoreVersion(Long versionId);
}

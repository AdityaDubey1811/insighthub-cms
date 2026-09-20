package com.insighthub.cms.controller;

import com.insighthub.cms.entity.Tag;
import com.insighthub.cms.repository.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

    private final TagRepository tagRepository;
    public TagController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }
    @GetMapping
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
    @PostMapping
    public Tag createTag(@RequestBody Tag tag) {
        return tagRepository.save(tag);
    }
}
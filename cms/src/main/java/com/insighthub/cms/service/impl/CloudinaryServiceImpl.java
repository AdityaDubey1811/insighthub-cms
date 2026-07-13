package com.insighthub.cms.service.impl;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.insighthub.cms.service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;
import com.insighthub.cms.exception.BadRequestException;
@Service
public class CloudinaryServiceImpl implements CloudinaryService{
    private final Cloudinary cloudinary;
    public CloudinaryServiceImpl(Cloudinary cloudinary){
        this.cloudinary = cloudinary;
    }
    @Override
    public String uploadImage(MultipartFile file){
        try{
            Map<?,?> result = cloudinary.uploader()
                    .upload(file.getBytes(),ObjectUtils.emptyMap());
            return result.get("secure_url").toString();
        }catch(IOException e){
            throw new BadRequestException("Image upload failed");
        }
    }
}

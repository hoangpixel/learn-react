package com.backend.flogin.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Lấy đường dẫn động tới thư mục flogin hiện tại
        String uploadPath = "file:" + System.getProperty("user.dir") + "/uploads/";
        
        // Mở cổng cho phép link web móc vào đúng folder vật lý
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}
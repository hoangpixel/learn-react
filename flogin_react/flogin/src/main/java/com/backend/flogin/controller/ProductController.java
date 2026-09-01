package com.backend.flogin.controller;

import com.backend.flogin.entity.Product;
import com.backend.flogin.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
    
    @Autowired
    private ProductRepository repo;

    @GetMapping
    public Page<Product> layDanhSach(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        
        // Spring Boot đếm trang bắt đầu từ số 0
        Pageable pageable = PageRequest.of(page, size);
        return repo.findAll(pageable);
    }
}
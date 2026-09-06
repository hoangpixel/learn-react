package com.backend.flogin.controller;

import com.backend.flogin.entity.Product;
import com.backend.flogin.service.ProductService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired 
    ProductService bus;

    @GetMapping
    public Page<Product> loadProducts(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "5") int size,
        @RequestParam(name = "keyword", required = false) String keyword,
        @RequestParam(name = "price", required = false) Double price
    ) {
        Page<Product> pageList = bus.layDanhSach(keyword, price, page, size);
        return pageList;
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> addProducts(@Valid @ModelAttribute  Product p, @RequestParam(name = "image", required = false) MultipartFile file) {
        bus.addProduct(p, file);
        return ResponseEntity.ok("Thêm thành công");
    }

    @GetMapping("/delete/{id}")
    public String deleteProducts(@PathVariable("id") long id) {
        Product p = bus.layThongTinSanPham(id);
        if(p != null) {
            if(bus.deleteProduct(p)) {
                return "ok";
            }
        }
        return "ko ok";
    }
    
    @GetMapping("/update/{id}")
    public Product loadInfoProduct(@PathVariable("id") long id) {
        Product p = bus.layThongTinSanPham(id);
        if(p != null) {
            return p;
        }
        return null;
    }

    @PatchMapping("/update")
    public String updateProducts(@RequestBody Product p) {
        if(p != null && p.getId() != null) {
            bus.updateProduct(p);
            return "ok";
        }
        return "ko ok";
    }
    
}
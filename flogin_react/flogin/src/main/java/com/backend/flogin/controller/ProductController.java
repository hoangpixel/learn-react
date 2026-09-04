package com.backend.flogin.controller;

import com.backend.flogin.entity.Product;
import com.backend.flogin.repository.ProductRepository;
import com.backend.flogin.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;




@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
    
    private final AuthController authController;

    @Autowired
    private ProductRepository repo;

    @Autowired
    private ProductService bus;

    ProductController(AuthController authController) {
        this.authController = authController;
    }

    @GetMapping
    public Page<Product> getMethodName( 
        @RequestParam(name="page", defaultValue = "0") int page, 
        @RequestParam(name="size", defaultValue = "5") int size,
        @RequestParam(name = "keyword", required = false) String keyword,
        @RequestParam(name = "price", required = false) Double price
    ) {

        Page<Product> pageList = bus.timKiemCoBan(keyword, price,page, size);

        return pageList;
    }
    

    @PostMapping("/add")
    public String themSanPham(@RequestBody Product p) {
        //TODO: process POST request
        if(p != null)
        {
            if(bus.themSanPham(p))
            {
                return "Thêm sản phẩm thành công";
            }
        }
        return "Thêm sản phẩm thất bại";
    }
 
    @GetMapping("/update/{id}")
    public Product loadThongTinSanPham(@PathVariable("id") long id) {
        Product p = bus.layThongTinSanPham(id);
        if(p != null){
            return p;
        }
        return null;
    }

    @PatchMapping("/update")
    public String suaThongTinSanPham(@RequestBody Product p) {
        if(p != null && p.getId() != null){
            if(bus.suaSanPham(p)){
                return "Sửa thông tin sản phẩm thành công";
            }
        }        
        return "Sửa thông tin sản phẩm thất bại";
    }
    
    @DeleteMapping("/delete/{id}")
    public String xoaSanPham(@PathVariable("id") long id) {
        
        Product p = bus.layThongTinSanPham(id);
        if(p != null){
            if(bus.xoaSanPham(p)){
                return "Xóa sản phẩm thành công";
            }
        }
        return "Xóa sản phẩm thất bại";
    }
    
}
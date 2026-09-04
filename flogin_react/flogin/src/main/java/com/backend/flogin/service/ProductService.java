package com.backend.flogin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.flogin.entity.Product;
import com.backend.flogin.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository repo;

    public boolean themSanPham(Product p)
    {
        if(p != null)
        {
            repo.save(p);
            return true;
        }
        return false;
    }

public boolean suaSanPham(Product pMoi) {
    // 1. Chọc thẳng xuống DB tìm đúng 1 dòng bằng ID (nhanh gấp vạn lần findAll)
    Product pCu = repo.findById(pMoi.getId()).orElse(null);

    // 2. Nếu tìm thấy, mới bắt đầu bóc tách dữ liệu mới đè lên dữ liệu cũ
    if (pCu != null) {
        pCu.setName(pMoi.getName());
        pCu.setPrice(pMoi.getPrice());
        
        // 3. Đem cái khuôn đã được vá lỗi đi lưu lại
        repo.save(pCu);
        return true;
    }
    
    // Nếu không tìm thấy ID, trả về false
    return false;
}

    public boolean xoaSanPham(Product p)
    {
        if(p != null){
            repo.delete(p);
            return true;
        }
        return false;
    }

    public Product layThongTinSanPham(long id)
    {
        return repo.findById(id).orElse(null);
    }

    public Page<Product> timKiemCoBan(String name,Double price, int currentPage, int size){
        Sort desc = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(currentPage, size,desc);

        boolean coChu = (name != null && !name.trim().isEmpty());
        boolean coGia = (price != null && price > 0);

        if(coChu && coGia){
            return repo.findByNameContainingAndPriceLessThanEqual(name, price, pageable);
        }else if(coChu){
            return repo.findByNameContaining(name, pageable);
        }else if(coGia){
            return repo.findByPriceLessThanEqual(price, pageable);
        }else{
            return repo.findAll(pageable);
        }
    }
}

package com.backend.flogin.service;

import java.nio.file.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.flogin.entity.Product;
import com.backend.flogin.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    ProductRepository repo;

    public Page<Product> layDanhSach(String name, Double price, int currentPage, int size) {
        Sort desc = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(currentPage, size, desc);
        Page<Product> page;

        boolean hasName = (name != null && !name.trim().isEmpty());
        boolean hasPrice = (price != null);

        if(hasName) {
            page = repo.findByNameContaining(name, pageable);
        } else if(hasPrice) {
            page = repo.findByPriceLessThanEqual(price, pageable);
        } else if(hasName && hasPrice) {
            page = repo.findByNameContainingAndPriceLessThanEqual(name, price, pageable);
        } else {
            page = repo.findAll(pageable);
        }
        return page;
    }

    public boolean addProduct(Product p, MultipartFile file) {
        if(p == null) {
            return false;
        }

        try {
            if(file != null || !file.isEmpty()) {
                String projectDir = System.getProperty("user.dir");
                String uploadDir = projectDir + "/uploads";
                Path uploadPath = Paths.get(uploadDir);

System.out.println("ĐƯỜNG DẪN LƯU ẢNH LÀ: " + uploadPath.toAbsolutePath());

                if(!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                p.setImageUrl(fileName);
            }
            repo.save(p);
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi lưu tên file : " + e.getMessage());
        }
    }

    public boolean updateProduct(Product p) {
        Product pFind = repo.findById(p.getId()).orElse(null);
        if(pFind != null) {
            pFind.setName(p.getName());
            pFind.setPrice(p.getPrice());
            pFind.setDescription(p.getDescription());

            repo.save(pFind);
            return true;
        }
        return false;
    }

    public boolean deleteProduct(Product p) {
        if(p != null) {
            repo.delete(p);
            return true;
        }
        return false;
    }

    public Product layThongTinSanPham(long id) {
        return repo.findById(id).orElse(null);
    }
}

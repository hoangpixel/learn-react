package com.backend.flogin.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.flogin.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    Page<Product> findByNameContaining(String name, Pageable pageable);
}

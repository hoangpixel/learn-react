package com.backend.flogin;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

// Bắt buộc phải có dòng này để Spring nhận diện đây là trạm bắt lỗi toàn cục
@RestControllerAdvice 
public class GlobalExceptionHandler {

    // Phải import đúng class MethodArgumentNotValidException của org.springframework.web...
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDuplicate(DataIntegrityViolationException ex) {
        Map<String, String> error = new HashMap<>();
        // Nhét câu chửi vào đúng biến "name" để React in ra dưới ô Tên sản phẩm
        error.put("name", "Tên sản phẩm này đã tồn tại, vui lòng chọn tên khác!");
        
        return ResponseEntity.badRequest().body(error);
    }
}
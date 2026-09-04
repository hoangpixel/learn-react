package com.backend.flogin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.GrantedAuthority;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtils {

    // Chìa khóa bí mật để ký JWT (Bắt buộc phải dài và khó đoán để chống hack)
    // Spring tự động đọc cấu hình và gắn vào đây
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    // Hàm băm chìa khóa
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 1. TẠO TOKEN: Đổi tham số từ String username -> UserDetails userDetails
    public String generateToken(UserDetails userDetails) {
        
        // Móc toàn bộ quyền (ROLE_ADMIN, PRODUCT_DELETE...) từ UserDetails ra thành 1 mảng
        List<String> authorities = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return Jwts.builder()
                .claim("authorities", authorities) // NHÉT MẢNG QUYỀN VÀO TOKEN Ở ĐÂY
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // 2. LẤY TÊN USER TỪ TOKEN
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 3. KIỂM TRA TOKEN CÒN HẠN HAY KHÔNG
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }
}
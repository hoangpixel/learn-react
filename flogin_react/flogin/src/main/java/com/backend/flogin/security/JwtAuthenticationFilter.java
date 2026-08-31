package com.backend.flogin.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // 1. Lấy Header có tên là "Authorization"
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 2. Nếu không có Header hoặc không bắt đầu bằng "Bearer ", cho đi tiếp (sẽ bị chặn ở cổng sau nếu API yêu cầu bảo mật)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Cắt lấy chuỗi Token thật (bỏ chữ "Bearer " dài 7 ký tự ở đầu)
        jwt = authHeader.substring(7);
        username = jwtUtils.extractUsername(jwt);

        // 4. Nếu có tên User và hệ thống chưa ghi nhận người này đăng nhập
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // 5. Kiểm tra vé hợp lệ không
            if (jwtUtils.isTokenValid(jwt, userDetails)) {
                // Vé thật -> Cấp quyền đi vào hệ thống
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // 6. Cho đi tiếp vào Controller
        filterChain.doFilter(request, response);
    }
}
package com.backend.flogin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.flogin.entity.Permission;
import com.backend.flogin.entity.Role;
import com.backend.flogin.entity.User;
import com.backend.flogin.repository.*;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Dùng cây cuốc đào user lên (Nhờ cấu hình FetchType.EAGER, nó lôi luôn Role và Permission lên theo)
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản: " + username));

        // 2. Chuẩn bị cái túi chứa quyền (Dùng Set để tránh trùng lặp nếu 2 Role có chung 1 Permission)
        Set<GrantedAuthority> authorities = new HashSet<>();
        
        // 3. Khui hộp lấy quyền
        // Lục từng Role của User (Ví dụ: ROLE_ADMIN)
        for (Role role : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role.getName())); // Nhét chữ ROLE_ADMIN vào túi
            
            // Lục tiếp từng Permission nằm trong Role đó (Ví dụ: PRODUCT_DELETE, PRODUCT_UPDATE)
            for (Permission permission : role.getPermissions()) {
                authorities.add(new SimpleGrantedAuthority(permission.getName())); // Nhét quyền vào túi
            }
        }

        // 4. Đóng gói thành UserDetails chuẩn giao cho Spring Security
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities // Thế chỗ cho cái ArrayList rỗng ban nãy
        );
    }
}
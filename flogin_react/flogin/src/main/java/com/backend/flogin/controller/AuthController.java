package com.backend.flogin.controller;

import com.backend.flogin.entity.User;
import com.backend.flogin.repository.UserRepository;
import com.backend.flogin.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        // 1. Nhờ Spring Security kiểm tra tài khoản (Nếu sai pass nó tự ném lỗi)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        // 2. Nếu đúng, móc user đó lên
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // 3. Đưa vào máy in vé VIP
        String jwtToken = jwtUtils.generateToken(userDetails);

        // 4. Trả về cho React
        Map<String, String> response = new HashMap<>();
        response.put("token", jwtToken);
        return response;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        //TODO: process POST request
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return "Tài khoản này đã tồn tại";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // user.setRoles("ROLE_USER");
    
        userRepository.save(user);

        return "Đăng ký thành công";
    }
    
}
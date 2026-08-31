package com.backend.flogin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    // Bộ băm mật khẩu (Mã hóa 1 chiều)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Nơi khai báo để Spring biết dùng CustomUserDetailsService và bộ băm nào
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        // Truyền thẳng userDetailsService vào constructor thay vì dùng hàm set
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        
        // Hàm setPasswordEncoder vẫn giữ nguyên
        authProvider.setPasswordEncoder(passwordEncoder());
        
        return authProvider;
    }

    // Quản lý việc xác thực (dùng bên AuthController để gọi lệnh đăng nhập)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Cấu hình luật lệ ra vào
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Tắt chống giả mạo vì mình xài Token rồi
            .cors(cors -> cors.configure(http)) // Mở cửa cho React cổng 5173 gọi sang
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Thả cửa API đăng nhập, đăng ký
                .anyRequest().authenticated() // Còn lại phải có vé VIP hết
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Không lưu session (stateless)
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Nhét cái lọc JWT của mình lên trước lọc mặc định

        return http.build();
    }
}
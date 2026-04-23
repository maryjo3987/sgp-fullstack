package br.com.sgp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       http
    .cors(cors -> {})
    .csrf(csrf -> csrf.disable())
    .authorizeHttpRequests(auth -> auth
        .requestMatchers(
            "/h2-console/**",
            "/swagger-ui/**",
            "/v3/api-docs/**"
        ).permitAll()
        .anyRequest().permitAll()
    )
    .headers(headers -> headers.frameOptions(frame -> frame.disable()))
    .httpBasic();

        return http.build();
    }
}
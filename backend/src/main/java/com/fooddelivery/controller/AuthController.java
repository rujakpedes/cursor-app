package com.fooddelivery.controller;

import com.fooddelivery.model.dto.response.AuthResponse;
import com.fooddelivery.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> body) {
        String googleId = body.get("googleId");
        String email = body.get("email");
        String name = body.get("name");
        String avatarUrl = body.get("avatarUrl");
        return ResponseEntity.ok(authService.handleGoogleLogin(googleId, email, name, avatarUrl));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<AuthResponse> adminLogin(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(authService.loginAsAdmin(body.get("email")));
    }
}

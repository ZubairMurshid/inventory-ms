package com.example.inventory_backend.controller;

import com.example.inventory_backend.dto.LoginRequest;
import com.example.inventory_backend.dto.SignupRequest;
import com.example.inventory_backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // SIGNUP
    @PostMapping("/signup")
    public String signup(
            @Valid @RequestBody SignupRequest request
    ) {
        return authService.signup(request);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}
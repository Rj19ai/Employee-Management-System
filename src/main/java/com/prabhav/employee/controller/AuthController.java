package com.prabhav.employee.controller;

import com.prabhav.employee.auth.AuthService;
import com.prabhav.employee.dto.LoginRequest;
import com.prabhav.employee.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequest request) {
        String result = authService.register(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPassword());
        return ResponseEntity.ok(result);
    }
}

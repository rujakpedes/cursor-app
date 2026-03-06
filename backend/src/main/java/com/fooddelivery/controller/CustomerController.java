package com.fooddelivery.controller;

import com.fooddelivery.model.dto.request.UpdateProfileRequest;
import com.fooddelivery.model.dto.response.CustomerResponse;
import com.fooddelivery.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/profile")
    public ResponseEntity<CustomerResponse> getProfile(Authentication auth) {
        Long customerId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(customerService.getProfile(customerId));
    }

    @PutMapping("/profile")
    public ResponseEntity<CustomerResponse> updateProfile(
            Authentication auth,
            @RequestBody UpdateProfileRequest req) {
        Long customerId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(customerService.updateProfile(customerId, req));
    }
}

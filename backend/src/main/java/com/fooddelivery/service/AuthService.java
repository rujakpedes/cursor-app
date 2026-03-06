package com.fooddelivery.service;

import com.fooddelivery.model.dto.response.AuthResponse;
import com.fooddelivery.model.dto.response.CustomerResponse;
import com.fooddelivery.model.entity.Customer;
import com.fooddelivery.model.enums.Role;
import com.fooddelivery.repository.CustomerRepository;
import com.fooddelivery.security.JwtTokenProvider;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final CustomerRepository customerRepo;
    private final JwtTokenProvider tokenProvider;

    public AuthService(CustomerRepository customerRepo, JwtTokenProvider tokenProvider) {
        this.customerRepo = customerRepo;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse handleGoogleLogin(String googleId, String email, String name, String avatarUrl) {
        Customer customer = customerRepo.findByGoogleId(googleId)
                .orElseGet(() -> {
                    Customer existing = customerRepo.findByEmail(email).orElse(null);
                    if (existing != null) {
                        existing.setGoogleId(googleId);
                        existing.setAvatarUrl(avatarUrl);
                        return customerRepo.save(existing);
                    }
                    Customer newCustomer = new Customer();
                    newCustomer.setGoogleId(googleId);
                    newCustomer.setEmail(email);
                    newCustomer.setDisplayName(name);
                    newCustomer.setAvatarUrl(avatarUrl);
                    newCustomer.setRole(Role.CUSTOMER);
                    return customerRepo.save(newCustomer);
                });

        String token = tokenProvider.generateToken(customer.getId(), customer.getEmail(), customer.getRole().name());
        return new AuthResponse(token, CustomerResponse.from(customer));
    }

    public AuthResponse loginAsAdmin(String email) {
        Customer admin = customerRepo.findByEmail(email)
                .filter(c -> c.getRole() == Role.ADMIN)
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
        String token = tokenProvider.generateToken(admin.getId(), admin.getEmail(), admin.getRole().name());
        return new AuthResponse(token, CustomerResponse.from(admin));
    }
}

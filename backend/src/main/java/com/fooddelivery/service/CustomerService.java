package com.fooddelivery.service;

import com.fooddelivery.exception.ResourceNotFoundException;
import com.fooddelivery.model.dto.request.UpdateProfileRequest;
import com.fooddelivery.model.dto.response.CustomerResponse;
import com.fooddelivery.model.entity.Customer;
import com.fooddelivery.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    public CustomerResponse getProfile(Long customerId) {
        Customer c = customerRepo.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", customerId));
        return CustomerResponse.from(c);
    }

    @Transactional
    public CustomerResponse updateProfile(Long customerId, UpdateProfileRequest req) {
        Customer c = customerRepo.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer", customerId));
        if (req.displayName() != null) c.setDisplayName(req.displayName());
        if (req.phone() != null) c.setPhone(req.phone());
        if (req.address() != null) c.setAddress(req.address());
        return CustomerResponse.from(customerRepo.save(c));
    }
}

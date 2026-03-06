package com.fooddelivery.repository;

import com.fooddelivery.model.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByGoogleId(String googleId);

    boolean existsByEmail(String email);
}

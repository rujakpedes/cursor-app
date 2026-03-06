package com.fooddelivery.repository;

import com.fooddelivery.model.entity.Promo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PromoRepository extends JpaRepository<Promo, Long> {

    Optional<Promo> findByCode(String code);

    List<Promo> findByActiveTrue();
}

package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.Promo;
import java.time.Instant;

public record PromoResponse(
        Long id,
        String code,
        String description,
        Long discountAmount,
        Long minSpend,
        Instant validFrom,
        Instant validUntil,
        boolean active
) {
    public static PromoResponse from(Promo p) {
        return new PromoResponse(
                p.getId(), p.getCode(), p.getDescription(), p.getDiscountAmount(),
                p.getMinSpend(), p.getValidFrom(), p.getValidUntil(), p.isActive()
        );
    }
}

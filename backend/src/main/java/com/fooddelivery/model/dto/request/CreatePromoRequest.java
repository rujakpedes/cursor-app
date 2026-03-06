package com.fooddelivery.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.Instant;

public record CreatePromoRequest(
        @NotBlank String code,
        @NotBlank String description,
        @NotNull @Positive Long discountAmount,
        Long minSpend,
        Instant validFrom,
        Instant validUntil
) {}

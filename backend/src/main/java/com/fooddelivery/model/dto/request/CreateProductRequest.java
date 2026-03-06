package com.fooddelivery.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CreateProductRequest(
        @NotBlank String name,
        String description,
        @NotNull @Positive Long price,
        String imageUrl,
        String badge,
        Long categoryId
) {}

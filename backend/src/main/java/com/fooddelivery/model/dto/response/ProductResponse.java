package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.Product;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Long price,
        String imageUrl,
        String badge,
        boolean active,
        Long categoryId,
        String categoryName
) {
    public static ProductResponse from(Product p) {
        return new ProductResponse(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageUrl(),
                p.getBadge(),
                p.isActive(),
                p.getCategory() != null ? p.getCategory().getId() : null,
                p.getCategory() != null ? p.getCategory().getName() : null
        );
    }
}

package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.OrderItem;

public record OrderItemResponse(
        Long productId,
        String productName,
        String productImage,
        Integer quantity,
        Long unitPrice,
        Long lineTotal
) {
    public static OrderItemResponse from(OrderItem oi) {
        return new OrderItemResponse(
                oi.getProduct().getId(),
                oi.getProduct().getName(),
                oi.getProduct().getImageUrl(),
                oi.getQuantity(),
                oi.getUnitPrice(),
                oi.getLineTotal()
        );
    }
}

package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.Order;
import com.fooddelivery.model.enums.DeliveryType;
import com.fooddelivery.model.enums.OrderStatus;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,
        OrderStatus status,
        DeliveryType deliveryType,
        Long subtotal,
        Long deliveryFee,
        Long platformFee,
        Long discount,
        Long total,
        String deliveryAddress,
        String contactPhone,
        boolean cutlery,
        boolean greenContribution,
        String notes,
        List<OrderItemResponse> items,
        String customerName,
        String customerEmail,
        Instant createdAt
) {
    public static OrderResponse from(Order o) {
        String name = o.getCustomer() != null ? o.getCustomer().getDisplayName() : o.getGuestName();
        String email = o.getCustomer() != null ? o.getCustomer().getEmail() : o.getGuestEmail();
        return new OrderResponse(
                o.getId(),
                o.getOrderNumber(),
                o.getStatus(),
                o.getDeliveryType(),
                o.getSubtotal(),
                o.getDeliveryFee(),
                o.getPlatformFee(),
                o.getDiscount(),
                o.getTotal(),
                o.getDeliveryAddress(),
                o.getContactPhone(),
                o.isCutlery(),
                o.isGreenContribution(),
                o.getNotes(),
                o.getItems().stream().map(OrderItemResponse::from).toList(),
                name,
                email,
                o.getCreatedAt()
        );
    }
}

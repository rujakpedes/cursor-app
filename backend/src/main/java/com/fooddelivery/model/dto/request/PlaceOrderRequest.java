package com.fooddelivery.model.dto.request;

import com.fooddelivery.model.enums.DeliveryType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record PlaceOrderRequest(
        @NotEmpty List<OrderItemRequest> items,
        @NotNull DeliveryType deliveryType,
        String deliveryAddress,
        String contactPhone,
        boolean cutlery,
        boolean greenContribution,
        String notes,
        String promoCode,
        String guestEmail,
        String guestName
) {}

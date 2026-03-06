package com.fooddelivery.model.dto.response;

public record AuthResponse(
        String token,
        CustomerResponse customer
) {}

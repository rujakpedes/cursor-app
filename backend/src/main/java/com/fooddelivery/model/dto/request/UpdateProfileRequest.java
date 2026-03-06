package com.fooddelivery.model.dto.request;

public record UpdateProfileRequest(
        String displayName,
        String phone,
        String address
) {}

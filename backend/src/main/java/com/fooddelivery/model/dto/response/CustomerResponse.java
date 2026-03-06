package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.Customer;

public record CustomerResponse(
        Long id,
        String email,
        String displayName,
        String phone,
        String address,
        String avatarUrl
) {
    public static CustomerResponse from(Customer c) {
        return new CustomerResponse(
                c.getId(), c.getEmail(), c.getDisplayName(),
                c.getPhone(), c.getAddress(), c.getAvatarUrl()
        );
    }
}

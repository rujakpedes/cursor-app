package com.fooddelivery.model.dto.response;

import com.fooddelivery.model.entity.StoreSettings;

public record StoreSettingsResponse(
        Long id,
        String storeName,
        String location,
        String phone,
        String email,
        String logoUrl,
        Double rating,
        Integer reviewCount,
        Long deliveryFeeStandard,
        Long deliveryFeePriority,
        Long deliveryFeeSaver,
        Long prioritySurcharge,
        Integer deliveryTimeStandard,
        Integer deliveryTimePriority,
        Integer deliveryTimeSaver,
        boolean maintenanceMode,
        String maintenanceMessage
) {
    public static StoreSettingsResponse from(StoreSettings s) {
        return new StoreSettingsResponse(
                s.getId(), s.getStoreName(), s.getLocation(), s.getPhone(), s.getEmail(),
                s.getLogoUrl(), s.getRating(), s.getReviewCount(),
                s.getDeliveryFeeStandard(), s.getDeliveryFeePriority(), s.getDeliveryFeeSaver(),
                s.getPrioritySurcharge(),
                s.getDeliveryTimeStandard(), s.getDeliveryTimePriority(), s.getDeliveryTimeSaver(),
                s.isMaintenanceMode(), s.getMaintenanceMessage()
        );
    }
}

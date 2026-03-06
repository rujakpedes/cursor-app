package com.fooddelivery.service;

import com.fooddelivery.model.dto.response.StoreSettingsResponse;
import com.fooddelivery.model.entity.StoreSettings;
import com.fooddelivery.repository.StoreSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StoreSettingsService {

    private final StoreSettingsRepository storeRepo;

    public StoreSettingsService(StoreSettingsRepository storeRepo) {
        this.storeRepo = storeRepo;
    }

    public StoreSettingsResponse getSettings() {
        StoreSettings s = storeRepo.findAll().stream().findFirst()
                .orElseGet(() -> storeRepo.save(new StoreSettings()));
        return StoreSettingsResponse.from(s);
    }

    @Transactional
    public StoreSettingsResponse updateSettings(StoreSettings updated) {
        StoreSettings s = storeRepo.findAll().stream().findFirst()
                .orElseGet(StoreSettings::new);
        s.setStoreName(updated.getStoreName());
        s.setLocation(updated.getLocation());
        s.setPhone(updated.getPhone());
        s.setEmail(updated.getEmail());
        s.setLogoUrl(updated.getLogoUrl());
        s.setDeliveryFeeStandard(updated.getDeliveryFeeStandard());
        s.setDeliveryFeePriority(updated.getDeliveryFeePriority());
        s.setDeliveryFeeSaver(updated.getDeliveryFeeSaver());
        s.setPlatformFee(updated.getPlatformFee());
        s.setPrioritySurcharge(updated.getPrioritySurcharge());
        s.setDeliveryTimeStandard(updated.getDeliveryTimeStandard());
        s.setDeliveryTimePriority(updated.getDeliveryTimePriority());
        s.setDeliveryTimeSaver(updated.getDeliveryTimeSaver());
        s.setMaintenanceMode(updated.isMaintenanceMode());
        s.setMaintenanceMessage(updated.getMaintenanceMessage());
        return StoreSettingsResponse.from(storeRepo.save(s));
    }

    public boolean isMaintenanceMode() {
        return storeRepo.findAll().stream().findFirst()
                .map(StoreSettings::isMaintenanceMode).orElse(false);
    }
}

package com.fooddelivery.controller;

import com.fooddelivery.model.dto.response.StoreSettingsResponse;
import com.fooddelivery.service.StoreSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/store")
public class StoreController {

    private final StoreSettingsService storeService;

    public StoreController(StoreSettingsService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/settings")
    public ResponseEntity<StoreSettingsResponse> getSettings() {
        return ResponseEntity.ok(storeService.getSettings());
    }

    @GetMapping("/maintenance-status")
    public ResponseEntity<Map<String, Object>> maintenanceStatus() {
        StoreSettingsResponse s = storeService.getSettings();
        return ResponseEntity.ok(Map.of(
                "maintenanceMode", s.maintenanceMode(),
                "message", s.maintenanceMessage() != null ? s.maintenanceMessage() : ""
        ));
    }
}

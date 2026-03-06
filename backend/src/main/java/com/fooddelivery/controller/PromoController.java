package com.fooddelivery.controller;

import com.fooddelivery.model.dto.response.PromoResponse;
import com.fooddelivery.service.PromoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/promos")
public class PromoController {

    private final PromoService promoService;

    public PromoController(PromoService promoService) {
        this.promoService = promoService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<PromoResponse>> getActivePromos() {
        return ResponseEntity.ok(promoService.getActivePromos());
    }

    @PostMapping("/validate")
    public ResponseEntity<PromoResponse> validatePromo(@RequestBody Map<String, Object> body) {
        String code = (String) body.get("code");
        Long subtotal = ((Number) body.get("subtotal")).longValue();
        return ResponseEntity.ok(promoService.validatePromo(code, subtotal));
    }
}

package com.fooddelivery.controller;

import com.fooddelivery.model.dto.request.CreateProductRequest;
import com.fooddelivery.model.dto.request.CreatePromoRequest;
import com.fooddelivery.model.dto.request.UpdateOrderStatusRequest;
import com.fooddelivery.model.dto.response.OrderResponse;
import com.fooddelivery.model.dto.response.ProductResponse;
import com.fooddelivery.model.dto.response.PromoResponse;
import com.fooddelivery.model.dto.response.StoreSettingsResponse;
import com.fooddelivery.model.entity.Category;
import com.fooddelivery.model.entity.StoreSettings;
import com.fooddelivery.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductService productService;
    private final OrderService orderService;
    private final PromoService promoService;
    private final CategoryService categoryService;
    private final StoreSettingsService storeService;

    public AdminController(ProductService productService, OrderService orderService,
                           PromoService promoService, CategoryService categoryService,
                           StoreSettingsService storeService) {
        this.productService = productService;
        this.orderService = orderService;
        this.promoService = promoService;
        this.categoryService = categoryService;
        this.storeService = storeService;
    }

    // --- Products ---
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> allProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody CreateProductRequest req) {
        return ResponseEntity.ok(productService.createProduct(req));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,
                                                         @Valid @RequestBody CreateProductRequest req) {
        return ResponseEntity.ok(productService.updateProduct(id, req));
    }

    @PatchMapping("/products/{id}/toggle")
    public ResponseEntity<Void> toggleProduct(@PathVariable Long id) {
        productService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    // --- Orders ---
    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> allOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long id,
                                                           @Valid @RequestBody UpdateOrderStatusRequest req) {
        return ResponseEntity.ok(orderService.updateStatus(id, req.status()));
    }

    // --- Categories ---
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> allCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(categoryService.create(body.get("name"), body.get("description")));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id,
                                                   @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(categoryService.update(id, body.get("name"), body.get("description")));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.ok().build();
    }

    // --- Promos ---
    @GetMapping("/promos")
    public ResponseEntity<List<PromoResponse>> allPromos() {
        return ResponseEntity.ok(promoService.getAllPromos());
    }

    @PostMapping("/promos")
    public ResponseEntity<PromoResponse> createPromo(@Valid @RequestBody CreatePromoRequest req) {
        return ResponseEntity.ok(promoService.createPromo(req));
    }

    @PutMapping("/promos/{id}")
    public ResponseEntity<PromoResponse> updatePromo(@PathVariable Long id,
                                                     @Valid @RequestBody CreatePromoRequest req) {
        return ResponseEntity.ok(promoService.updatePromo(id, req));
    }

    @PatchMapping("/promos/{id}/toggle")
    public ResponseEntity<Void> togglePromo(@PathVariable Long id) {
        promoService.toggleActive(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/promos/{id}")
    public ResponseEntity<Void> deletePromo(@PathVariable Long id) {
        promoService.deletePromo(id);
        return ResponseEntity.ok().build();
    }

    // --- Store Settings ---
    @GetMapping("/settings")
    public ResponseEntity<StoreSettingsResponse> getSettings() {
        return ResponseEntity.ok(storeService.getSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<StoreSettingsResponse> updateSettings(@RequestBody StoreSettings settings) {
        return ResponseEntity.ok(storeService.updateSettings(settings));
    }

    @PatchMapping("/maintenance")
    public ResponseEntity<StoreSettingsResponse> toggleMaintenance(@RequestBody Map<String, Object> body) {
        StoreSettingsResponse current = storeService.getSettings();
        StoreSettings s = new StoreSettings();
        s.setStoreName(current.storeName());
        s.setLocation(current.location());
        s.setPhone(current.phone());
        s.setEmail(current.email());
        s.setLogoUrl(current.logoUrl());
        s.setDeliveryFeeStandard(current.deliveryFeeStandard());
        s.setDeliveryFeePriority(current.deliveryFeePriority());
        s.setDeliveryFeeSaver(current.deliveryFeeSaver());
        s.setPlatformFee(current.platformFee());
        s.setPrioritySurcharge(current.prioritySurcharge());
        s.setDeliveryTimeStandard(current.deliveryTimeStandard());
        s.setDeliveryTimePriority(current.deliveryTimePriority());
        s.setDeliveryTimeSaver(current.deliveryTimeSaver());
        s.setMaintenanceMode((Boolean) body.get("enabled"));
        s.setMaintenanceMessage((String) body.getOrDefault("message", current.maintenanceMessage()));
        return ResponseEntity.ok(storeService.updateSettings(s));
    }
}

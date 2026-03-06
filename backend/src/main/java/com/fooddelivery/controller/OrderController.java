package com.fooddelivery.controller;

import com.fooddelivery.model.dto.request.PlaceOrderRequest;
import com.fooddelivery.model.dto.response.OrderResponse;
import com.fooddelivery.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @Valid @RequestBody PlaceOrderRequest req,
            Authentication auth) {
        Long customerId = auth != null ? (Long) auth.getPrincipal() : null;
        return ResponseEntity.ok(orderService.placeOrder(req, customerId));
    }

    @GetMapping("/track/{orderNumber}")
    public ResponseEntity<OrderResponse> trackOrder(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.trackOrder(orderNumber));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> myOrders(Authentication auth) {
        Long customerId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }
}

package com.fooddelivery.service;

import com.fooddelivery.exception.BadRequestException;
import com.fooddelivery.exception.ResourceNotFoundException;
import com.fooddelivery.model.dto.request.PlaceOrderRequest;
import com.fooddelivery.model.dto.response.OrderResponse;
import com.fooddelivery.model.entity.*;
import com.fooddelivery.model.enums.DeliveryType;
import com.fooddelivery.model.enums.OrderStatus;
import com.fooddelivery.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final CustomerRepository customerRepo;
    private final PromoRepository promoRepo;
    private final StoreSettingsRepository storeRepo;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo,
                        CustomerRepository customerRepo, PromoRepository promoRepo,
                        StoreSettingsRepository storeRepo, EmailService emailService) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.customerRepo = customerRepo;
        this.promoRepo = promoRepo;
        this.storeRepo = storeRepo;
        this.emailService = emailService;
    }

    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest req, Long customerId) {
        Order order = new Order();
        order.setOrderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        order.setDeliveryType(req.deliveryType());
        order.setDeliveryAddress(req.deliveryAddress());
        order.setContactPhone(req.contactPhone());
        order.setCutlery(req.cutlery());
        order.setGreenContribution(req.greenContribution());
        order.setNotes(req.notes());

        if (customerId != null) {
            Customer customer = customerRepo.findById(customerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Customer", customerId));
            order.setCustomer(customer);
        } else {
            if (req.guestEmail() == null || req.guestEmail().isBlank()) {
                throw new BadRequestException("Guest email is required for guest orders");
            }
            order.setGuestEmail(req.guestEmail());
            order.setGuestName(req.guestName());
        }

        long subtotal = 0;
        for (var itemReq : req.items()) {
            Product product = productRepo.findById(itemReq.productId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", itemReq.productId()));
            OrderItem oi = new OrderItem();
            oi.setProduct(product);
            oi.setQuantity(itemReq.quantity());
            oi.setUnitPrice(product.getPrice());
            order.addItem(oi);
            subtotal += oi.getLineTotal();
        }
        order.setSubtotal(subtotal);

        StoreSettings store = storeRepo.findAll().stream().findFirst().orElse(new StoreSettings());
        long deliveryFee = switch (req.deliveryType()) {
            case PRIORITY -> store.getDeliveryFeePriority();
            case SAVER -> store.getDeliveryFeeSaver();
            default -> store.getDeliveryFeeStandard();
        };
        order.setDeliveryFee(deliveryFee);
        order.setPlatformFee(store.getPlatformFee());

        long discount = 0;
        if (req.promoCode() != null && !req.promoCode().isBlank()) {
            Promo promo = promoRepo.findByCode(req.promoCode())
                    .orElseThrow(() -> new BadRequestException("Invalid promo code"));
            if (!promo.isActive()) throw new BadRequestException("Promo code is expired");
            if (promo.getValidUntil() != null && promo.getValidUntil().isBefore(Instant.now())) {
                throw new BadRequestException("Promo code is expired");
            }
            if (promo.getMinSpend() != null && subtotal < promo.getMinSpend()) {
                throw new BadRequestException("Minimum spend of Rp" + promo.getMinSpend() + " not met");
            }
            discount = promo.getDiscountAmount();
        }
        order.setDiscount(discount);

        long prioritySurcharge = req.deliveryType() == DeliveryType.PRIORITY ? store.getPrioritySurcharge() : 0;
        long greenFee = req.greenContribution() ? 200 : 0;
        order.setTotal(subtotal + deliveryFee + store.getPlatformFee() + prioritySurcharge + greenFee - discount);

        order.setStatus(OrderStatus.PENDING);
        Order saved = orderRepo.save(order);

        String email = saved.getCustomer() != null ? saved.getCustomer().getEmail() : saved.getGuestEmail();
        if (email != null) {
            emailService.sendOrderConfirmation(saved, email);
        }

        return OrderResponse.from(saved);
    }

    public OrderResponse getOrder(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
        return OrderResponse.from(order);
    }

    public OrderResponse trackOrder(String orderNumber) {
        Order order = orderRepo.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderNumber));
        return OrderResponse.from(order);
    }

    public List<OrderResponse> getOrdersByCustomer(Long customerId) {
        return orderRepo.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .map(OrderResponse::from).toList();
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepo.findAllByOrderByCreatedAtDesc().stream()
                .map(OrderResponse::from).toList();
    }

    @Transactional
    public OrderResponse updateStatus(Long id, OrderStatus status) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
        order.setStatus(status);
        return OrderResponse.from(orderRepo.save(order));
    }
}

package com.fooddelivery.service;

import com.fooddelivery.exception.BadRequestException;
import com.fooddelivery.exception.ResourceNotFoundException;
import com.fooddelivery.model.dto.request.CreatePromoRequest;
import com.fooddelivery.model.dto.response.PromoResponse;
import com.fooddelivery.model.entity.Promo;
import com.fooddelivery.repository.PromoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class PromoService {

    private final PromoRepository promoRepo;

    public PromoService(PromoRepository promoRepo) {
        this.promoRepo = promoRepo;
    }

    public List<PromoResponse> getActivePromos() {
        return promoRepo.findByActiveTrue().stream().map(PromoResponse::from).toList();
    }

    public List<PromoResponse> getAllPromos() {
        return promoRepo.findAll().stream().map(PromoResponse::from).toList();
    }

    public PromoResponse validatePromo(String code, Long orderSubtotal) {
        Promo promo = promoRepo.findByCode(code)
                .orElseThrow(() -> new BadRequestException("Invalid promo code"));
        if (!promo.isActive()) throw new BadRequestException("Promo code is no longer active");
        if (promo.getValidUntil() != null && promo.getValidUntil().isBefore(Instant.now())) {
            throw new BadRequestException("Promo code has expired");
        }
        if (promo.getMinSpend() != null && orderSubtotal < promo.getMinSpend()) {
            throw new BadRequestException("Minimum spend of Rp" + promo.getMinSpend() + " not met");
        }
        return PromoResponse.from(promo);
    }

    @Transactional
    public PromoResponse createPromo(CreatePromoRequest req) {
        if (promoRepo.findByCode(req.code()).isPresent()) {
            throw new BadRequestException("Promo code already exists");
        }
        Promo p = new Promo();
        p.setCode(req.code());
        p.setDescription(req.description());
        p.setDiscountAmount(req.discountAmount());
        p.setMinSpend(req.minSpend());
        p.setValidFrom(req.validFrom());
        p.setValidUntil(req.validUntil());
        return PromoResponse.from(promoRepo.save(p));
    }

    @Transactional
    public PromoResponse updatePromo(Long id, CreatePromoRequest req) {
        Promo p = promoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promo", id));
        p.setCode(req.code());
        p.setDescription(req.description());
        p.setDiscountAmount(req.discountAmount());
        p.setMinSpend(req.minSpend());
        p.setValidFrom(req.validFrom());
        p.setValidUntil(req.validUntil());
        return PromoResponse.from(promoRepo.save(p));
    }

    @Transactional
    public void toggleActive(Long id) {
        Promo p = promoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Promo", id));
        p.setActive(!p.isActive());
        promoRepo.save(p);
    }

    @Transactional
    public void deletePromo(Long id) {
        promoRepo.deleteById(id);
    }
}

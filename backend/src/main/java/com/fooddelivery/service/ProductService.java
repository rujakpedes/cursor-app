package com.fooddelivery.service;

import com.fooddelivery.exception.ResourceNotFoundException;
import com.fooddelivery.model.dto.request.CreateProductRequest;
import com.fooddelivery.model.dto.response.ProductResponse;
import com.fooddelivery.model.entity.Category;
import com.fooddelivery.model.entity.Product;
import com.fooddelivery.repository.CategoryRepository;
import com.fooddelivery.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;

    public ProductService(ProductRepository productRepo, CategoryRepository categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }

    public List<ProductResponse> getActiveProducts() {
        return productRepo.findByActiveTrueOrderByIdDesc().stream()
                .map(ProductResponse::from).toList();
    }

    public List<ProductResponse> getAllProducts() {
        return productRepo.findAll().stream()
                .map(ProductResponse::from).toList();
    }

    public ProductResponse getProduct(Long id) {
        return ProductResponse.from(findById(id));
    }

    @Transactional
    public ProductResponse createProduct(CreateProductRequest req) {
        Product p = new Product();
        p.setName(req.name());
        p.setDescription(req.description());
        p.setPrice(req.price());
        p.setImageUrl(req.imageUrl());
        p.setBadge(req.badge());
        if (req.categoryId() != null) {
            Category cat = categoryRepo.findById(req.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", req.categoryId()));
            p.setCategory(cat);
        }
        return ProductResponse.from(productRepo.save(p));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, CreateProductRequest req) {
        Product p = findById(id);
        p.setName(req.name());
        p.setDescription(req.description());
        p.setPrice(req.price());
        p.setImageUrl(req.imageUrl());
        p.setBadge(req.badge());
        if (req.categoryId() != null) {
            Category cat = categoryRepo.findById(req.categoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category", req.categoryId()));
            p.setCategory(cat);
        }
        return ProductResponse.from(productRepo.save(p));
    }

    @Transactional
    public void toggleActive(Long id) {
        Product p = findById(id);
        p.setActive(!p.isActive());
        productRepo.save(p);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product p = findById(id);
        productRepo.delete(p);
    }

    private Product findById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }
}

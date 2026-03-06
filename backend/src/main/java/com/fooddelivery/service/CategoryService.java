package com.fooddelivery.service;

import com.fooddelivery.exception.ResourceNotFoundException;
import com.fooddelivery.model.entity.Category;
import com.fooddelivery.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> getActiveCategories() {
        return categoryRepo.findByActiveTrueOrderBySortOrderAsc();
    }

    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Transactional
    public Category create(String name, String description) {
        Category c = new Category();
        c.setName(name);
        c.setDescription(description);
        return categoryRepo.save(c);
    }

    @Transactional
    public Category update(Long id, String name, String description) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        c.setName(name);
        c.setDescription(description);
        return categoryRepo.save(c);
    }

    @Transactional
    public void delete(Long id) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        categoryRepo.delete(c);
    }
}

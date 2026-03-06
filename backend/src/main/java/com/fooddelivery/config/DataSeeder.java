package com.fooddelivery.config;

import com.fooddelivery.model.entity.*;
import com.fooddelivery.model.enums.Role;
import com.fooddelivery.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(
            StoreSettingsRepository storeRepo,
            CategoryRepository categoryRepo,
            ProductRepository productRepo,
            CustomerRepository customerRepo,
            PromoRepository promoRepo) {
        return args -> {
            if (storeRepo.count() > 0) return;

            StoreSettings store = new StoreSettings();
            store.setStoreName("Pisang Ijo Cendana");
            store.setLocation("Grand Lucky SCBD");
            store.setRating(4.8);
            store.setReviewCount(242);
            storeRepo.save(store);

            Category desserts = new Category();
            desserts.setName("For You");
            desserts.setSortOrder(0);
            categoryRepo.save(desserts);

            String[][] items = {
                {"Kolak Pisang Campur Ubi dan Singkong", "32000", "Most ordered"},
                {"Bubur Sumsum", "32000", "Most liked"},
                {"Bubur Ketan Hitam", "32000", "Most liked"},
                {"Kacang Ijo (Eid/Ramadhan Special)", "32000", null},
                {"Es Pisang Ijo", "28000", null},
                {"Pisang Ijo Original", "25000", "Most ordered"},
            };
            for (String[] item : items) {
                Product p = new Product();
                p.setName(item[0]);
                p.setPrice(Long.parseLong(item[1]));
                p.setBadge(item[2]);
                p.setCategory(desserts);
                productRepo.save(p);
            }

            Customer admin = new Customer();
            admin.setEmail("admin@fooddelivery.com");
            admin.setDisplayName("Admin");
            admin.setRole(Role.ADMIN);
            customerRepo.save(admin);

            Promo p1 = new Promo();
            p1.setCode("DISC3K");
            p1.setDescription("Rp3.000 off");
            p1.setDiscountAmount(3000L);
            p1.setMinSpend(5000L);
            promoRepo.save(p1);

            Promo p2 = new Promo();
            p2.setCode("FREEDELIVERY");
            p2.setDescription("Rp10.000 off Delivery");
            p2.setDiscountAmount(10000L);
            p2.setMinSpend(40000L);
            promoRepo.save(p2);
        };
    }
}

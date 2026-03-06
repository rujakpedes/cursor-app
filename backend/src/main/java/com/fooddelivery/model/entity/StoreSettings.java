package com.fooddelivery.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "store_settings")
public class StoreSettings extends BaseEntity {

    @Column(nullable = false)
    private String storeName;

    private String location;
    private String phone;
    private String email;
    private String logoUrl;

    private Double rating = 0.0;
    private Integer reviewCount = 0;

    private Long deliveryFeeStandard = 21000L;
    private Long deliveryFeePriority = 25000L;
    private Long deliveryFeeSaver = 13000L;
    private Long platformFee = 4500L;
    private Long prioritySurcharge = 4000L;

    private Integer deliveryTimeStandard = 74;
    private Integer deliveryTimePriority = 74;
    private Integer deliveryTimeSaver = 89;

    private boolean maintenanceMode = false;
    private String maintenanceMessage = "We're currently performing maintenance. Please check back soon.";

    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }
    public Long getDeliveryFeeStandard() { return deliveryFeeStandard; }
    public void setDeliveryFeeStandard(Long fee) { this.deliveryFeeStandard = fee; }
    public Long getDeliveryFeePriority() { return deliveryFeePriority; }
    public void setDeliveryFeePriority(Long fee) { this.deliveryFeePriority = fee; }
    public Long getDeliveryFeeSaver() { return deliveryFeeSaver; }
    public void setDeliveryFeeSaver(Long fee) { this.deliveryFeeSaver = fee; }
    public Long getPlatformFee() { return platformFee; }
    public void setPlatformFee(Long platformFee) { this.platformFee = platformFee; }
    public Long getPrioritySurcharge() { return prioritySurcharge; }
    public void setPrioritySurcharge(Long prioritySurcharge) { this.prioritySurcharge = prioritySurcharge; }
    public Integer getDeliveryTimeStandard() { return deliveryTimeStandard; }
    public void setDeliveryTimeStandard(Integer t) { this.deliveryTimeStandard = t; }
    public Integer getDeliveryTimePriority() { return deliveryTimePriority; }
    public void setDeliveryTimePriority(Integer t) { this.deliveryTimePriority = t; }
    public Integer getDeliveryTimeSaver() { return deliveryTimeSaver; }
    public void setDeliveryTimeSaver(Integer t) { this.deliveryTimeSaver = t; }
    public boolean isMaintenanceMode() { return maintenanceMode; }
    public void setMaintenanceMode(boolean maintenanceMode) { this.maintenanceMode = maintenanceMode; }
    public String getMaintenanceMessage() { return maintenanceMessage; }
    public void setMaintenanceMessage(String maintenanceMessage) { this.maintenanceMessage = maintenanceMessage; }
}

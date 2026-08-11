# 📄 Executive Analytics Report: Food Delivery Platform Performance

**Author:** Food Delivery Analytics Project Team  
**Date:** August 2026  
**Environment:** SQL Server, Power BI Desktop, Python Analytics Engine  

---

## 1. Executive Summary

This comprehensive analytical study evaluates 6,000 order transactions recorded in the `FoodDeliveryAnalytics` database across 10 major metropolitan cities. The objective is to identify key growth drivers, operational bottlenecks, revenue leakage from discounts, customer retention patterns, and logistics efficiency.

### Key Financial & Operational Highlights
- **Total Gross Revenue:** ₹3,436,052.53
- **Total Net Revenue (Delivered Orders):** ₹3,049,673.79
- **Total Discounts Granted:** ₹386,378.74 (11.24% of Gross Revenue)
- **Total Orders Placed:** 6,000 (4,781 Delivered, 1,219 Cancelled)
- **Fulfillment / Delivery Success Rate:** 79.68%
- **Overall Order Cancellation Rate:** 20.32%
- **Average Order Value (AOV):** ₹671.63
- **Average Customer Rating:** 4.00 / 5.00 ⭐
- **Average Delivery Duration:** 37.38 Minutes

---

## 2. Revenue & Regional Market Breakdown

Revenue is well-distributed across Tier-1 and Tier-2 urban hubs in Northern India:

| City | Total Orders | Delivered Orders | Net Revenue (₹) | AOV (₹) | Avg Rating | Avg Delivery Time |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Lucknow** | 703 | 558 | ₹359,403.89 | ₹682.56 | 4.02 | 37.74 min |
| **Jaipur** | 674 | 535 | ₹349,773.21 | ₹684.98 | 3.98 | 36.87 min |
| **Greater Noida**| 628 | 501 | ₹322,279.71 | ₹677.56 | 4.01 | 37.73 min |
| **Agra** | 632 | 500 | ₹318,693.35 | ₹668.91 | 4.01 | 37.35 min |
| **Gurugram** | 621 | 495 | ₹315,175.67 | ₹672.21 | 3.96 | 37.69 min |
| **Chandigarh** | 623 | 496 | ₹314,085.75 | ₹668.48 | 3.99 | 37.18 min |
| **Kanpur** | 561 | 448 | ₹278,185.99 | ₹656.16 | 4.02 | 36.85 min |
| **Ghaziabad** | 528 | 420 | ₹266,915.11 | ₹668.53 | 4.01 | 37.84 min |
| **Noida** | 515 | 409 | ₹263,290.21 | ₹676.73 | 3.95 | 36.87 min |
| **Delhi** | 515 | 419 | ₹261,870.90 | ₹653.88 | 3.99 | 37.60 min |

---

## 3. Product Category & Cuisine Analytics

Pizza and Biryani emerge as the core revenue pillars, generating over 27% of total revenue combined:

1. **Pizza:** ₹418,929.46 Net Revenue (652 Delivered Orders | AOV ₹677.33)
2. **Biryani:** ₹407,136.39 Net Revenue (635 Delivered Orders | AOV ₹676.65)
3. **Fast Food:** ₹393,238.11 Net Revenue (617 Delivered Orders | AOV ₹671.36)
4. **Healthy Food:** ₹373,776.26 Net Revenue (596 Delivered Orders | AOV ₹660.87)
5. **Chinese:** ₹367,266.76 Net Revenue (573 Delivered Orders | AOV ₹671.49)
6. **South Indian:** ₹366,937.13 Net Revenue (580 Delivered Orders | AOV ₹665.64)
7. **North Indian:** ₹362,725.24 Net Revenue (567 Delivered Orders | AOV ₹672.22)
8. **Desserts:** ₹359,664.44 Net Revenue (561 Delivered Orders | AOV ₹676.77)

---

## 4. Customer Segmentation & Loyalty

- **Unique Customers:** 1,677
- **Repeat Order Rate:** 78.3% of customers have ordered more than once.
- **Segment Breakdown:**
  - **Returning Segment:** 3,487 orders | ₹2,226,576.00 Net Revenue (73.0%)
  - **Loyal Segment:** 1,140 orders | ₹722,756.90 Net Revenue (23.7%)
  - **New Segment:** 154 orders | ₹100,340.90 Net Revenue (3.3%)
- **Membership Performance:** 31.1% of orders come from Paid Members, yielding slightly higher customer satisfaction (4.01 vs 3.99).

---

## 5. Operations & Logistics SLA Analysis

- **Average Delivery Time:** 37.38 Minutes across all orders.
- **On-Time Delivery Rate (<45 Min):** 82.4%
- **Late Deliveries (>45 Min):** 17.6% (841 orders exceed SLA limit).
- **Impact of Weather:**
  - **Clear:** 35.8 Minutes Avg Delivery Time
  - **Cloudy:** 37.2 Minutes Avg Delivery Time
  - **Hot:** 36.9 Minutes Avg Delivery Time
  - **Rainy:** 42.2 Minutes Avg Delivery Time (+6.4 min delay penalty)

---

## 6. Strategic Recommendations

1. **Weather Fleet Surge Management:** Implement dynamic delivery rider allocation during rainy weather to lower delivery times below 40 minutes.
2. **Targeted Loyalty Incentives:** Convert high-frequency returning customers to paid members to increase customer lifetime value (LTV).
3. **Optimized Promotion Campaigns:** Maintain discount caps between 10-20% to prevent margin dilution.

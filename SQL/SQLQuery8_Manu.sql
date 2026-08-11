/*
==========================================================
        FOOD DELIVERY ANALYTICS
        SQL BUSINESS ANALYSIS
==========================================================

Database : FoodDeliveryAnalytics
Table    : FoodOrders

Purpose:
Analyze customer behavior, revenue, restaurant
performance, discounts, delivery operations and
customer satisfaction.
==========================================================
*/

-- ======================================================
-- Q1. OVERALL BUSINESS PERFORMANCE
-- ======================================================
SELECT
    COUNT(*) AS TotalOrders,

    SUM(
        CASE
            WHEN order_status = 'Delivered'
            THEN net_revenue
            ELSE 0
        END
    ) AS TotalRevenue,

    AVG(
        CASE
            WHEN order_status = 'Delivered'
            THEN order_value
        END
    ) AS AverageOrderValue,

    AVG(
        CASE
            WHEN order_status = 'Delivered'
            THEN customer_rating
        END
    ) AS AverageRating,

    AVG(
        CASE
            WHEN order_status = 'Delivered'
            THEN delivery_time_min
        END
    ) AS AverageDeliveryTime

FROM dbo.FoodOrders;

-- ======================================================
-- Q2. REVENUE BY CITY
-- ======================================================

SELECT
    city,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY city
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q3. REVENUE BY CUISINE
-- ======================================================

SELECT
    cuisine,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue,
    AVG(customer_rating) AS AverageRating
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY cuisine
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q4. TOP 10 RESTAURANTS BY REVENUE
-- ======================================================

SELECT TOP 10
    restaurant,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue,
    AVG(customer_rating) AS AverageRating
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY restaurant
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q5. MEMBERSHIP PERFORMANCE
-- ======================================================

SELECT
    membership,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue,
    AVG(customer_rating) AS AverageRating
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY membership
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q6. CUSTOMER SEGMENTATION
-- ======================================================

SELECT
    customer_segment,
    COUNT(DISTINCT customer_id) AS UniqueCustomers,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY customer_segment
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q7. REPEAT CUSTOMER ANALYSIS
-- ======================================================

SELECT
    customer_order_count,
    COUNT(DISTINCT customer_id) AS UniqueCustomers,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY customer_order_count
ORDER BY customer_order_count;



-- ======================================================
-- Q8. DISCOUNT EFFECTIVENESS
-- ======================================================

SELECT
    CASE
        WHEN discount_pct = 0 THEN 'No Discount'
        WHEN discount_pct <= 10 THEN '1-10%'
        WHEN discount_pct <= 20 THEN '11-20%'
        WHEN discount_pct <= 30 THEN '21-30%'
        ELSE '30%+'
    END AS DiscountBand,

    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue,
    AVG(discount_amount) AS AverageDiscountAmount
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY
    CASE
        WHEN discount_pct = 0 THEN 'No Discount'
        WHEN discount_pct <= 10 THEN '1-10%'
        WHEN discount_pct <= 20 THEN '11-20%'
        WHEN discount_pct <= 30 THEN '21-30%'
        ELSE '30%+'
    END
ORDER BY TotalRevenue DESC;

-- ======================================================
-- Q9. MONTHLY REVENUE TREND
-- ======================================================

SELECT
    order_month,
    month_name,
    SUM(net_revenue) AS TotalRevenue,
    COUNT(*) AS TotalOrders,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY
    order_month,
    month_name
ORDER BY order_month;

-- ======================================================
-- Q10. WEEKEND VS WEEKDAY ANALYSIS
-- ======================================================

SELECT
    CASE
        WHEN is_weekend = 1 THEN 'Weekend'
        ELSE 'Weekday'
    END AS DayType,

    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY
    CASE
        WHEN is_weekend = 1 THEN 'Weekend'
        ELSE 'Weekday'
    END;


-- ======================================================
-- Q11. PAYMENT METHOD ANALYSIS
-- ======================================================

SELECT
    payment_method,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY payment_method
ORDER BY TotalOrders DESC;

-- ======================================================
-- Q12. DELIVERY PERFORMANCE BY CITY
-- ======================================================

SELECT
    city,
    COUNT(*) AS DeliveredOrders,
    AVG(delivery_time_min) AS AverageDeliveryTime,
    AVG(distance_km) AS AverageDistance,
    AVG(customer_rating) AS AverageRating
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY city
ORDER BY AverageDeliveryTime DESC;

-- ======================================================
-- Q13. WEATHER VS DELIVERY PERFORMANCE
-- ======================================================

SELECT
    weather,
    COUNT(*) AS TotalOrders,
    AVG(delivery_time_min) AS AverageDeliveryTime,
    AVG(customer_rating) AS AverageRating,
    AVG(distance_km) AS AverageDistance
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY weather
ORDER BY AverageDeliveryTime DESC;

-- ======================================================
-- Q14. DELIVERY TIME VS CUSTOMER RATING
-- ======================================================

SELECT
    CASE
        WHEN delivery_time_min < 20 THEN 'Under 20 Min'
        WHEN delivery_time_min < 30 THEN '20-29 Min'
        WHEN delivery_time_min < 40 THEN '30-39 Min'
        WHEN delivery_time_min < 50 THEN '40-49 Min'
        ELSE '50+ Min'
    END AS DeliveryTimeBand,

    COUNT(*) AS TotalOrders,
    AVG(customer_rating) AS AverageRating,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY
    CASE
        WHEN delivery_time_min < 20 THEN 'Under 20 Min'
        WHEN delivery_time_min < 30 THEN '20-29 Min'
        WHEN delivery_time_min < 40 THEN '30-39 Min'
        WHEN delivery_time_min < 50 THEN '40-49 Min'
        ELSE '50+ Min'
    END
ORDER BY
    CASE
        WHEN delivery_time_min < 20 THEN 1
        WHEN delivery_time_min < 30 THEN 2
        WHEN delivery_time_min < 40 THEN 3
        WHEN delivery_time_min < 50 THEN 4
        ELSE 5
    END;

-- ======================================================
-- Q15. CITY AND CUSTOMER SEGMENT ANALYSIS
-- ======================================================

SELECT
    city,
    customer_segment,
    COUNT(DISTINCT customer_id) AS UniqueCustomers,
    COUNT(*) AS TotalOrders,
    SUM(net_revenue) AS TotalRevenue,
    AVG(order_value) AS AverageOrderValue
FROM dbo.FoodOrders
WHERE order_status = 'Delivered'
GROUP BY
    city,
    customer_segment
ORDER BY
    city,
    TotalRevenue DESC;
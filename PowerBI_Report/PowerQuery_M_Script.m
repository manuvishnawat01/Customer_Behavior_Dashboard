// Power Query M Script for Importing Food Delivery Analytics Data
let
    Source = Csv.Document(
        File.Contents("C:\Users\manup\Desktop\Notes_Training\Food_Delivery_Analytics\PowerBI_Report\FoodOrders_Cleaned.csv"),
        [Delimiter=",", Columns=32, Encoding=65001, QuoteStyle=QuoteStyle.None]
    ),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Types" = Table.TransformColumnTypes(#"Promoted Headers",{
        {"order_id", Int64.Type},
        {"customer_id", Int64.Type},
        {"order_date", type date},
        {"age", Int64.Type},
        {"gender", type text},
        {"city", type text},
        {"restaurant", type text},
        {"cuisine", type text},
        {"meal_type", type text},
        {"order_value", type number},
        {"discount_pct", type number},
        {"discount_amount", type number},
        {"distance_km", type number},
        {"delivery_time_min", type number},
        {"customer_rating", type number},
        {"membership", type logical},
        {"payment_method", type text},
        {"order_status", type text},
        {"promo_used", type logical},
        {"weather", type text},
        {"device_type", type text},
        {"order_month", Int64.Type},
        {"month_name", type text},
        {"quarter", Int64.Type},
        {"day_name", type text},
        {"is_weekend", Int64.Type},
        {"age_group", type text},
        {"order_value_band", type text},
        {"customer_order_count", Int64.Type},
        {"customer_segment", type text},
        {"gross_revenue", type number},
        {"net_revenue", type number}
    })
in
    #"Changed Types"

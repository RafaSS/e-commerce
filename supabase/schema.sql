-- ShopEase E-commerce Database Schema
-- Following Supabase conventions for auth integration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Product Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    comparison_price DECIMAL(10, 2),
    cost_price DECIMAL(10, 2),
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    inventory_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster product search and filtering
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);

-- Product Images Table (for multiple images per product)
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User Profiles Table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    phone VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policy for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Shopping Cart Items Table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- RLS Policy for cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own cart items" ON cart_items
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart items" ON cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart items" ON cart_items
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart items" ON cart_items
    FOR DELETE USING (auth.uid() = user_id);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address_line1 VARCHAR(255) NOT NULL,
    shipping_address_line2 VARCHAR(255),
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    billing_address_line1 VARCHAR(255) NOT NULL,
    billing_address_line2 VARCHAR(255),
    billing_city VARCHAR(100) NOT NULL,
    billing_state VARCHAR(100) NOT NULL,
    billing_postal_code VARCHAR(20) NOT NULL,
    billing_country VARCHAR(100) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policy for orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policy for order_items through parent order
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- Wish List Table
CREATE TABLE wish_list_items (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- RLS Policy for wish_list_items
ALTER TABLE wish_list_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own wish list" ON wish_list_items
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert to their own wish list" ON wish_list_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete from their own wish list" ON wish_list_items
    FOR DELETE USING (auth.uid() = user_id);

-- Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    comment TEXT,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Policy for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved reviews" ON reviews
    FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "Users can view their own reviews" ON reviews
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Function to update product rating based on reviews
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Add logic here to compute average rating
    -- and update products table if needed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product rating when a review is added/updated
CREATE TRIGGER update_product_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

-- View for product details with category information
CREATE VIEW product_details AS
SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    p.price,
    p.inventory_quantity,
    p.image_url,
    p.is_active,
    p.is_featured,
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Sample data for categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070'),
('Clothing', 'clothing', 'Apparel and fashion items', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070'),
('Home & Kitchen', 'home', 'Home decor and kitchen appliances', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974'),
('Accessories', 'accessories', 'Watches, jewelry, and other accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980');

-- Sample data for products
INSERT INTO products (name, slug, description, price, inventory_quantity, category_id, image_url, is_active, is_featured) VALUES
('Premium Wireless Headphones', 'premium-wireless-headphones', 'Experience premium sound quality with our wireless headphones. These over-ear headphones feature active noise cancellation, a comfortable fit for all-day wear, and up to 30 hours of battery life.', 299.99, 50, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000', true, true),
('Organic Cotton T-Shirt', 'organic-cotton-tshirt', 'Made from 100% organic cotton, this t-shirt is both environmentally friendly and incredibly comfortable.', 29.99, 100, 2, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=387', true, true),
('Smart Watch Series 5', 'smart-watch-series-5', 'Stay connected and track your fitness with our latest smartwatch. Features heart rate monitoring, GPS tracking, and water resistance.', 399.99, 30, 1, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099', true, true),
('Modern Coffee Table', 'modern-coffee-table', 'Elevate your living space with this modern coffee table. Made from high-quality materials with a sleek design.', 249.99, 25, 3, 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?q=80&w=2126', true, true),
('Designer Sunglasses', 'designer-sunglasses', 'Protect your eyes in style with these designer sunglasses. Featuring UV400 protection and polarized lenses.', 129.99, 45, 4, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080', true, false),
('Ergonomic Office Chair', 'ergonomic-office-chair', 'Work in comfort with this ergonomic office chair. Adjustable height, lumbar support, and breathable mesh back.', 349.99, 20, 3, 'https://images.unsplash.com/photo-1505843490578-27522a6a0785?q=80&w=1974', true, false),
('Smartphone Case', 'smartphone-case', 'Protect your smartphone with this durable and stylish case. Available for various models.', 24.99, 150, 4, 'https://images.unsplash.com/photo-1592286927505-1def25115558?q=80&w=2070', true, false),
('Wireless Charging Pad', 'wireless-charging-pad', 'Charge your compatible devices without the hassle of cables. Sleek, compact design fits anywhere.', 49.99, 60, 1, 'https://images.unsplash.com/photo-1618424923839-2788d8d1f667?q=80&w=1000', true, false),
('Men''s Leather Wallet', 'mens-leather-wallet', 'Classic leather wallet with multiple card slots and compartments. Genuine leather construction.', 59.99, 75, 4, 'https://images.unsplash.com/photo-1603060196912-f6c0c68e3dad?q=80&w=1974', true, false),
('Ceramic Plant Pot', 'ceramic-plant-pot', 'Beautiful ceramic pot for indoor plants. Adds a touch of elegance to any room.', 34.99, 40, 3, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072', true, false),
('Denim Jacket', 'denim-jacket', 'Classic denim jacket that never goes out of style. Durable construction and comfortable fit.', 89.99, 55, 2, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2070', true, false),
('Wireless Earbuds', 'wireless-earbuds', 'True wireless earbuds with exceptional sound quality and long battery life. Includes charging case.', 149.99, 35, 1, 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932', true, false);

-- Function to generate RLS policies for all tables
CREATE OR REPLACE FUNCTION create_rls_policies()
RETURNS void AS $$
DECLARE
    admin_role_name TEXT := 'authenticated';
BEGIN
    -- Add additional policies for admins if needed
    -- This is just an example and would need to be adjusted for real admin roles
END;
$$ LANGUAGE plpgsql;

-- Execute the function to create policies
SELECT create_rls_policies();

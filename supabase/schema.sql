-- Create schema for E-Shop database
-- This schema is designed to be imported into Supabase

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(500),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product categories (many-to-many relationship)
CREATE TABLE product_categories (
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100) NOT NULL,
  shipping_state VARCHAR(100) NOT NULL,
  shipping_postal_code VARCHAR(20) NOT NULL,
  shipping_country VARCHAR(100) NOT NULL DEFAULT 'United States',
  shipping_method VARCHAR(100) DEFAULT 'Standard Shipping',
  payment_method VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order items table (items in an order)
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- User profiles (extending Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'United States',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to tables with updated_at
CREATE TRIGGER update_products_timestamp
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_orders_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Create RLS policies for security
-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to products and categories
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view product_categories" ON product_categories
  FOR SELECT USING (true);

-- Allow users to see only their own orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to see only their own order items through the orders relationship
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Allow users to see and update only their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Insert sample data for testing
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets'),
('Clothing', 'clothing', 'Apparel and fashion items'),
('Home & Kitchen', 'home-kitchen', 'Products for your home'),
('Books', 'books', 'Books and reading materials');

INSERT INTO products (name, description, price, image_url, stock_quantity) VALUES
('Smartphone X', 'The latest smartphone with cutting-edge features', 699.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Smartphone', 50),
('Wireless Headphones', 'Premium sound quality wireless headphones', 149.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Headphones', 100),
('Laptop Pro', 'Powerful laptop for work and entertainment', 1299.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Laptop', 30),
('Smart Watch', 'A stylish watch with smart features', 99.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Watch', 75),
('Coffee Maker', 'Premium coffee maker for your morning brew', 89.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Coffee', 60),
('Desk Lamp', 'Stylish desk lamp with adjustable brightness', 49.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Lamp', 120),
('Wireless Speaker', 'Powerful wireless speaker with deep bass', 129.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Speaker', 85),
('Gaming Console', 'Next-gen gaming console with amazing graphics', 499.99, 'https://placehold.co/300x300/e2e8f0/1e293b?text=Console', 40);

INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1), -- Smartphone in Electronics
(2, 1), -- Headphones in Electronics
(3, 1), -- Laptop in Electronics
(4, 1), -- Smart Watch in Electronics
(5, 3), -- Coffee Maker in Home & Kitchen
(6, 3), -- Desk Lamp in Home & Kitchen
(7, 1), -- Wireless Speaker in Electronics
(8, 1); -- Gaming Console in Electronics

import { supabaseClient } from '~/server/utils/supabase';

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

// Order Types
export interface Order {
  id: number;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_method: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  subtotal: number;
}

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  updated_at: string;
}

// Product services
export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id: number): Promise<Product | null> {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getByCategory(categorySlug: string): Promise<Product[]> {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*, product_categories!inner(category_id), categories!inner(id, slug)')
      .eq('categories.slug', categorySlug);

    if (error) throw error;
    return data || [];
  },

  async getFeatured(limit = 4): Promise<Product[]> {
    // In a real app, you might have a "featured" field
    // Here we're just returning the latest products
    const { data, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};

// Category services
export const categoryService = {
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};

// Order services
export const orderService = {
  async getByUser(): Promise<Order[]> {
    const { data, error } = await supabaseClient
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: number): Promise<{ order: Order; items: OrderItem[] } | null> {
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (orderError) throw orderError;

    const { data: items, error: itemsError } = await supabaseClient
      .from('order_items')
      .select('*')
      .eq('order_id', id);

    if (itemsError) throw itemsError;

    return { order, items: items || [] };
  },

  async create(
    orderData: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    orderItems: Omit<OrderItem, 'id' | 'order_id'>[]
  ): Promise<Order> {
    // First, create the order
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // Then, add the order items
    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(itemsWithOrderId);

    if (itemsError) throw itemsError;

    return order;
  },
};

// Profile services
export const profileService = {
  async get(): Promise<Profile | null> {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .single();

    if (error) throw error;
    return data;
  },

  async update(profile: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabaseClient
      .from('profiles')
      .update(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createIfNotExists(userId: string, profile: Partial<Profile> = {}): Promise<Profile> {
    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!fetchError && existingProfile) {
      return existingProfile;
    }

    // If not, create it
    const { data, error } = await supabaseClient
      .from('profiles')
      .insert([{ id: userId, ...profile }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

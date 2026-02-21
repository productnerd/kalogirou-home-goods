export interface Category {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Product {
  id: number;
  title: string;
  description: string | null;
  material: string | null;
  base_price: number;
  sku: string | null;
  category_id: number;
  is_active: boolean;
  is_top_seller: boolean;
  created_at: string;
  updated_at: string;
  kalogirou_product_images?: ProductImage[];
  kalogirou_product_variants?: ProductVariant[];
}

export interface ProductImage {
  id: number;
  product_id: number;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  size: string | null;
  color: string | null;
  pack_size: string | null;
  sku: string;
  price: number;
  stock: number;
  is_active: boolean;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  items: OrderItem[];
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: number;
  variant_id?: number;
  title: string;
  variant_label?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderItem {
  product_id: number;
  variant_id?: number;
  title: string;
  variant_label?: string;
  quantity: number;
  unit_price: number;
}

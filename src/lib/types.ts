export type Product = {
  id: string;
  name: string;
  slug: string;
  weight: string;
  price: number;
  mrp?: number | null;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  spiceLevel: number;
};

export type CartItem = {
  id: string;
  name: string;
  weight: string;
  price: number;
  image: string;
  quantity: number;
};

export type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Delivered";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string | null;
  total: number;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    weight: string;
    price: number;
    quantity: number;
  }[];
  createdAt: string;
};

export const ORDER_STATUSES: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];

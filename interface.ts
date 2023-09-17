export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
}

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
}

export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    total: number;
}

export interface Review {
    id: number;
    userId: number;
    productId: number;
    content: string;
}

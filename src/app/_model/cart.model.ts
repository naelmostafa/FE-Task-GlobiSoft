import { CartItem } from "./cartItem.model";


export interface Cart {
    cartItems: CartItem[];
    customerId: number;
    totalCost?: number;
}
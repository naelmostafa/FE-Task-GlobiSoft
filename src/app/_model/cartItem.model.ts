export interface CartItem {
    quantity: number;
    product:{
        id: number;
        name: string;
        price: number;
    }
}
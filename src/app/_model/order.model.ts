import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface Order {
    id?: number;
    proucts: [{
        product: Product;
        quantity: number;
    }];
    customer: Customer;
}
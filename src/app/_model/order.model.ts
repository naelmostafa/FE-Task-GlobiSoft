import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface Order {
    id?: number;
    createdDate?: Date;
    totalPrice?: number;
    orderItems: [{
        id?: number;
        quantity: number;
        price?: number;
        createdDate?: Date;
        product: Product;
    }];
    customer: Customer;
}

// {
//     "id": 2,
//     "createdDate": "2023-07-14T18:44:56.157+00:00",
//     "totalPrice": 10000.0,
//     "orderItems": [
//         {
//             "id": 6,
//             "quantity": 10,
//             "price": 400.0,
//             "createdDate": "2023-07-14T18:44:56.160+00:00",
//             "product": {
//                 "id": 4,
//                 "name": "Product 4",
//                 "price": 400
//             }
//         }
//     ],
//     "customer": {
//         "id": 2,
//         "name": "Ahmed",
//         "number": "123456789"
//     }
// }
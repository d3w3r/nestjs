import { Product } from './products.entity';
import { Customer } from './customers.entity';

export interface Item {
  index: number;
  product: Product;
  quantity: number;
  total: number;
}

export interface Order {
  id: number;
  client: Customer;
  products: Item[];
  total: number;
}

import { User } from "../../entities/user";
import { Product } from "../../entities/product";

export interface UserRepository {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    listUserForProduct(): Promise<Array<{ user: User, products: Product[] }>>;
    find(id: string): Promise<User | null>;
}
import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import {
    BuyOutputDto,
    CreateOutputDto,
    ListOutputDto,
    ProductService,
    SellOutputDto,
} from "../product.service";

export class ProductServiceImplementation implements ProductService {
    
    private constructor(readonly repository: ProductRepository) {}
    public static build(repository: ProductRepository) {
        return new ProductServiceImplementation(repository);
    }





    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        const product = await this.repository.find(id);

        if (!product) {
            throw new Error(`Product ${id} not found`);
        }

        product.sell(amount);
        await this.repository.update(product);

        const output: SellOutputDto = {
            id: product.id,
            balance: product.quantity,
        };

        return output;
    }


    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        const product = await this.repository.find(id);

        if (!product) {
            throw new Error(`Product ${id} not found`);
        }

        product.buy(amount);
        await this.repository.update(product);

        const output: BuyOutputDto = {
            id: product.id,
            balance: product.quantity,
        };

        return output;
    }


    public async list(): Promise<ListOutputDto> {
        const products = await this.repository.list();

        const output: ListOutputDto = {
            products: products.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                balance: p.quantity,
                userId: p.userId
            })),
        };

        return output;
    }


    public async create(name: string, price: number, userId: string): Promise<CreateOutputDto> {
        const product = Product.create(name, price, userId);

        await this.repository.save(product);

        const output: CreateOutputDto = {
            id: product.id,
            balance: product.quantity,
        };

        return output;
    }

    



    
}

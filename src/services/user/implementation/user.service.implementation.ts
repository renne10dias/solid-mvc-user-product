import { User } from "../../../entities/user";
import { UserRepository } from "../../../repositories/user/user.repository";
import { CreateOutputDto, ListOutputDto, ListUserProductOutputDto, UsertService } from "../user.service";

export class UserServiceImplementation implements UsertService {

    private constructor(readonly repository: UserRepository) {}
    
    public static build(repository: UserRepository) {
        return new UserServiceImplementation(repository);
    }



    public async list(): Promise<ListOutputDto> {
        const users = await this.repository.list();
        
        const output: ListOutputDto = {
            users: users.map(u => ({
                id: u.id,
                name: u.name,
            })),
        };
        
        return output;
    }




    public async listUserForProduct(): Promise<ListUserProductOutputDto> {
        const usersWithProducts = await this.repository.listUserForProduct();

        const output: ListUserProductOutputDto = {
            users: usersWithProducts.map(({ user, products }) => ({
                id: user.id,
                name: user.name,
                products: products.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                }))
            }))
        };

        return output;
    }

    
    
    
    public async create(name: string): Promise<CreateOutputDto> {
        const user = User.create(name); // Assumindo que User.create cria um novo usuário
        await this.repository.save(user);
        
        const output: CreateOutputDto = {
            id: user.id,
        };
        
        return output;
    }


}
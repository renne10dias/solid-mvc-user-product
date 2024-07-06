import { PrismaClient } from "@prisma/client";
import { User } from "../../../entities/user";
import { Product } from "../../../entities/product";
import { UserRepository } from "../user.repository";

export class UserRepositoryPrisma implements UserRepository {

    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma);
    }


    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.name,
        };

        await this.prisma.user.create({
            data,
        });
    }

    public async list(): Promise<User[]> {
        const aUsers = await this.prisma.user.findMany();

        const users: User[] = aUsers.map((u) => {
            const { id, name } = u;
            return User.with(id, name);
        });

        return users;
    }


    public async listUserForProduct(): Promise<Array<{ user: User, products: Product[] }>> {
        const users = await this.prisma.user.findMany({
            include: { products: true }
        });

        return users.map(u => {
            const user = User.with(u.id, u.name);
            const products = u.products.map(p =>
                Product.with(p.id, p.name, p.price, p.quantity, p.userId)
            );
            return { user, products };
        });
    }

    
    public async find(id: string): Promise<User | null> {
        const aUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!aUser) {
            return null;
        }

        const { name } = aUser;
        return User.with(id, name);
    }

}
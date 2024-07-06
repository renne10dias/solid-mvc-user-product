import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../repositories/user/prisma/user.repository.prisma";
import { UserServiceImplementation } from "../../../services/user/implementation/user.service.implementation";
import { prisma } from "../../../util/prisma.util";

export class UserController {
    private constructor() {}

    public static build() {
        return new UserController();
    }


    public async create(request: Request, response: Response) {
        const { name } = request.body;

        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const output = await aService.create(name);

        const data = {
            id: output.id,
            name
        };

        response.status(201).json(data).send();
    }



    public async list(request: Request, response: Response) {
        const aRepository = UserRepositoryPrisma.build(prisma);
        const aService = UserServiceImplementation.build(aRepository);

        const output = await aService.list();

        const data = {
            users: output.users,
        };

        response.status(200).json(data).send();
    }



    public async listUserForProduct(req: Request, res: Response): Promise<Response> {
        try {
            const aRepository = UserRepositoryPrisma.build(prisma);
            const aService = UserServiceImplementation.build(aRepository);

            // Chama o serviço para obter a lista de usuários com produtos
            const output = await aService.listUserForProduct();

             // Formata os dados de saída para JSON
            const formattedUsers = output.users.map(user => ({
                id: user.id,
                name: user.name,
                products: user.products.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                }))
            }));

            const data = { 
                users: formattedUsers 
            };

            // Retorna a resposta com status 200 (OK) e os dados formatados
            return res.status(200).json(data);

        } catch (error) {
            // Trata o erro e retorna uma resposta com status 500 (Erro Interno do Servidor)
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            return res.status(500).json({ error: errorMessage });
        }
    }

}
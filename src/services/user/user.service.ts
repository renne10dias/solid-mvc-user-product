export type CreateOutputDto = {
    id: string;
};

export type ListOutputDto = {
    users: {
        id: string;
        name: string;
    }[];
};


export type ListUserProductOutputDto = {
    users: {
        id: string;
        name: string;
        products: {
            id: string;
            name: string;
            price: number;
            quantity: number;
        }[];
    }[];
};

export interface UsertService {
    list(): Promise<ListOutputDto>;
    listUserForProduct(): Promise<ListUserProductOutputDto>;
    create(name: string): Promise<CreateOutputDto>;
}

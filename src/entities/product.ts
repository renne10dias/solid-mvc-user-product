export type ProductProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    userId: string; // Adiciona o proprietário do produto
};

export class Product {
    private constructor(readonly props: ProductProps) {}

    public static create(name: string, price: number, userId: string) {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            quantity: 0,
            userId,
        });
    }

    public static with(
        id: string,
        name: string,
        price: number,
        quantity: number,
        userId: string
    ) {
        return new Product({
            id,
            name,
            price,
            quantity,
            userId,
        });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get price() {
        return this.props.price;
    }

    public get quantity() {
        return this.props.quantity;
    }

    public get userId() {
        return this.props.userId;
    }

    public buy(amount: number) {
        this.props.quantity += amount;
    }

    public sell(amount: number) {
        if (this.props.quantity < amount) {
            throw new Error(
                "O saldo do produto não é suficiente para a venda."
            );
        }

        this.props.quantity -= amount;
    }
}
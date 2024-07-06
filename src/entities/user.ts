export type UserProps = {
    id: string;
    name: string;
};

export class User {
    private constructor(readonly props: UserProps) {}

    public static create(name: string) {
        return new User({
            id: crypto.randomUUID().toString(),
            name,
        });
    }

    public static with(id: string, name: string) {
        return new User({
            id,
            name,
        });
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }
}

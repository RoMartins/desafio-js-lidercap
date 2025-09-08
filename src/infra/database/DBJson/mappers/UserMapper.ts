import { User } from '@domain/entities/user';

type UserPersistence = {
    id: number;
    name: string;
    username: string;
    email: string;
};

export class UserMapper {
    static toDomain(raw: UserPersistence): User {
        return new User({
            id: raw.id,
            name: raw.name,
            username: raw.username,
            email: raw.email,
        });
    }

    static toPersistence(user: User): UserPersistence {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
    }
}

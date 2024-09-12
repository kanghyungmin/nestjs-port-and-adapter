import { User } from "@core/domain/user/entity/User";
import { TypeOrmUser } from "../TypeOrmUser";


export class TypeOrmUserMapper {
    public static toOrmEntity(domainUser : User) : TypeOrmUser {
        const ormUser = new TypeOrmUser();
        
        ormUser.id = domainUser.getId();
        ormUser.firstName = domainUser.getFirstName();
        ormUser.lastName = domainUser.getLastName();
        ormUser.email = domainUser.getEmail();
        ormUser.password = domainUser.getPassword();

        ormUser.createdAt = domainUser.getCreatedAt();
        ormUser.updatedAt = domainUser.getUpdatedAt() as Date;
        ormUser.removedAt = domainUser.getRemovedAt() as Date;

        ormUser.role = domainUser.getRole();

        return ormUser;
    }

    public static toOrmEntities(domainUsers : User[]) : TypeOrmUser[] {
        return domainUsers.map( domainUser => this.toOrmEntity(domainUser))
    }

    public static toDomainEntity(ormUser : TypeOrmUser) : User {
        const domainUser: User = new User({

            id: ormUser.id,
            firstName: ormUser.firstName,
            lastName: ormUser.lastName,
            email: ormUser.email,
            password: ormUser.password,
            createdAt: ormUser.createdAt,
            updatedAt: ormUser.updatedAt,
            removedAt: ormUser.removedAt,
            role : ormUser.role
        })
        return domainUser
    }
    
    public static toDomainEntities(ormUsers: TypeOrmUser[]) : User[] {
        return ormUsers.map( ormUser => this.toDomainEntity(ormUser))
    }

}
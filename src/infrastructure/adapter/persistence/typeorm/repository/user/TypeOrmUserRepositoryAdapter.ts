import { Optional } from "@core/common/type/CommonType";
import { User } from "@core/domain/user/entity/User";
import { UserRepositoryPort } from "@core/domain/user/port/persistence/UserRepositoryPort"; 
import { TypeOrmUser } from "../../entity/user/TypeOrmUser";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { EntityRepository, InsertResult, SelectQueryBuilder } from "typeorm";
import { TypeOrmUserMapper } from "../../entity/user/mapper/TypeOrmUserMapper";


@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepositoryAdapter extends BaseRepository<TypeOrmUser> implements UserRepositoryPort {
    private readonly userAlias = 'user'

    private buildUserQueryBuilder() : SelectQueryBuilder<TypeOrmUser> {
        return this.createQueryBuilder(this.userAlias).select()
    }
    private extendQueryWithByProperties(
        by : {id?:string, email?: string},
        query : SelectQueryBuilder<TypeOrmUser>
    ) : void {
        if(by.id) {
            query.andWhere(`${this.userAlias}.id = :id`, { id: by.id })
        }
        if(by.email) {
            query.andWhere(`${this.userAlias}.email = :email`, { email: by.email
            })
        }
    }

    public async findUser(
        by : {id?:string, email?: string},
    ) : Promise<Optional<User>> {
        let domainEntity : Optional<User> = null
        const query : SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder()
        this.extendQueryWithByProperties(by, query)

        const ormEntity : Optional<TypeOrmUser> = await query.getOne()
        if(ormEntity) {
            domainEntity = TypeOrmUserMapper.toDomainEntity(ormEntity)
        }

        return domainEntity
    }

    public async addUser(user: User): Promise<{ id: string }> {
        const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user)
    
        const insertResult: InsertResult = await this.createQueryBuilder(this.userAlias)
          .insert()
          .into(TypeOrmUser)
          .values([ormUser])
          .execute()
    
        return {
          id: insertResult.identifiers[0].id,
        }
      }

    public async countUsers(by: { id?: string; email?: string }): Promise<number> {
        const query: SelectQueryBuilder<TypeOrmUser> = this.buildUserQueryBuilder()
    
        this.extendQueryWithByProperties(by, query)
    
        return query.getCount()
    }

    public async updateUser(user: User): Promise<void> {
        const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user)
        await this.update(ormUser.id, ormUser)
    }   
}
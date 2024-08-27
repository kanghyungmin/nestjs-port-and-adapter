import { Optional } from "@core/common/type/CommonType";
import { User } from "@core/domain/user/entity/User";
import { UserRepositoryPort } from "@core/domain/user/port/persistence/UserRepositoryPort"; 
import { TypeOrmUser } from "@infrastructure/adapter/persistence/typeorm/entity/user/TypeOrmUser";
import { InsertResult, Repository, SelectQueryBuilder } from "typeorm";
import { TypeOrmUserMapper } from "@infrastructure/adapter/persistence/typeorm/entity/user/mapper/TypeOrmUserMapper";
import { PostgresDataSource } from "@infrastructure/adapter/persistence/typeorm/DataSource";

export class TypeOrmUserRepositoryAdapter extends Repository<TypeOrmUser> implements UserRepositoryPort {
    private readonly userAlias = 'user';
  
    constructor() {
      super(TypeOrmUser, PostgresDataSource.manager); // TypeOrmUser 엔티티와 AppDataSource의 매니저를 넘겨줍니다.
    }
  
    private buildUserQueryBuilder(): SelectQueryBuilder<TypeOrmUser> {
      return this.createQueryBuilder(this.userAlias).select();
    }
  
    private extendQueryWithByProperties(
      by: { id?: string; email?: string },
      query: SelectQueryBuilder<TypeOrmUser>
    ): void {
      if (by.id) {
        query.andWhere(`${this.userAlias}.id = :id`, { id: by.id });
      }
      if (by.email) {
        query.andWhere(`${this.userAlias}.email = :email`, { email: by.email });
      }
    }
  
    public async findUser(by: { id?: string; email?: string }): Promise<Optional<User>> {
      const query = this.buildUserQueryBuilder();
      this.extendQueryWithByProperties(by, query);
  
      const ormEntity = await query.getOne();
      return ormEntity ? TypeOrmUserMapper.toDomainEntity(ormEntity) : null;
    }
  
    public async addUser(user: User): Promise<{ id: string }> {
      const ormUser = TypeOrmUserMapper.toOrmEntity(user);
  
      const insertResult: InsertResult = await this.createQueryBuilder()
        .insert()
        .into(TypeOrmUser)
        .values([ormUser])
        .execute();
  
      return { id: insertResult.identifiers[0].id };
    }
  
    public async countUsers(by: { id?: string; email?: string }): Promise<number> {
      const query = this.buildUserQueryBuilder();
      this.extendQueryWithByProperties(by, query);
  
      return query.getCount();
    }
  
    public async updateUser(user: User): Promise<void> {
      const ormUser = TypeOrmUserMapper.toOrmEntity(user);
      await this.update(ormUser.id, ormUser);
    }
  }
  
## 비지니스 로직을 구현 시, 참조 사항
  - 일반 비지니스 로직을 구현하듯이, Controller <> Service <> Repository로 구성 
  - 하지만, 이들 사이 의존성을 줄이기 위해 Port와 Adapter을 적용
  - Controller 작성 예제
'''
@Post('account')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: HttpRestApiModelCreateUserBody }) 
    @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
    public async createAccount(@Body() body: HttpRestApiModelCreateUserBody): Promise<CoreApiResponse<UserUseCaseDto>> {
      const adapter: CreateUserAdapter = await CreateUserAdapter.new({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        role: body.role
      })  //도메인 객체로 변환
      
      const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(adapter)
      return CoreApiResponse.success(createdUser)
    }
    1) User Payload 정의 
    2) User Payload 에서 Domain 객체로 변환. 이때 Validation Check이 진행됨
    3) API Response 정의( API Docs, DTO 별도)
'''
  - Service Layer에서는 UseCase별로 Interface 및 Implementation 객체를 구성
'''
    # Usecase 인터페이스 정의(CreateUserUseCase.ts)
    export interface CreateUserUseCase extends TransactionalUseCase<CreateUserPort, UserUseCaseDto> {}

    # Usecase 구현제 정의
    export class CreateUserService implements CreateUserUseCase {
    constructor(
        private readonly UserRepository : UserRepositoryPort,
    ) {}
    
    public async execute(payload : CreateUserPort) : Promise<UserUseCaseDto> {
        const doesUserExist : boolean = !(await this.UserRepository.countUsers({email : payload.email}));
        CoreAssert.isFalse(doesUserExist, Exception.new({
            code : Code.ENTITY_ALREADY_EXISTS,
            overrideMessage : 'User already exists'
        }))
        const user: User = await  User.new({
            firstName : payload.firstName,
            lastName : payload.lastName, 
            email : payload.email,
            password : payload.password,
            role : payload.role
        })
        await this.UserRepository.addUser(user);
        return UserUseCaseDto.newFromUser(user);
        }
    }


    #UserModel에서 인터페이스를 통한 구현체 의존성 주입
     {
      provide   : UserDITokens.CreateUserUseCase,
      useFactory: (userRepository) => { 
        const service  = new CreateUserService(userRepository)
        return new TransactionalUseCaseWrapper(service)
      },
      inject    : [UserDITokens.UserRepository]
    },
'''
  - Repository는 도메인 객체 기준 Interface와 Implementation 객체 구현
'''
    # User Repository 인터페이스 정의
    export interface UserRepositoryPort {
        findUser(by: {id?: string, email?: string, socialID? : string}) : Promise<Optional<User>>;
        countUsers(by:{id?:string, email?: string}) : Promise<number>;
        addUser(user: User): Promise<{id: string}>;
        updateUser(user: User) : Promise<void>;
    }

    # User Repository 인터페이스 구현체 정의
    export class TypeOrmUserRepositoryAdapter extends Repository<TypeOrmUser> implements UserRepositoryPort {
        private readonly userAlias = 'user';
    
        constructor(manager: EntityManager) {
        super(TypeOrmUser, manager);
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
    }

    Repository Layer 역시 인터페이스를 통해서 구현부를 Nest가 주입함.
'''


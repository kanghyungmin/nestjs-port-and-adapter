export class UserDITokens {
    // Use-cases 
    public static readonly CreateUserUseCase = Symbol('CreateUserUseCase');
    public static readonly FindUserUseCase = Symbol('FindUserUseCase');

    // Handlers 
    public static readonly GetUserPreviewQueryHandler = Symbol('GetUserPreviewQueryHandler');   

    // Repositories
    public static readonly UserRepository = Symbol('UserRepository');
}
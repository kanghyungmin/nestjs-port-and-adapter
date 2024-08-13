export interface UseCase<TUseCaseRequest, TUseCaseResponse> {
    execute(request: TUseCaseRequest): Promise<TUseCaseResponse>;
}
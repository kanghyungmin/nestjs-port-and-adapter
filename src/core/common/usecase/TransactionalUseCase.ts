import { UseCase } from '@core/common/usecase/UseCase';

export interface TransactionalUseCase<TUseCaseRequest, TUseCaseResponse> extends UseCase<TUseCaseRequest, TUseCaseResponse> {
    beginTransaction?: () =>Promise<void>;
    commitTransaction?: () => Promise<void>;
    rollbackTransaction?: () => Promise<void>;
    onCommit? : (param : TUseCaseRequest, result: TUseCaseResponse) => Promise<void>;
    onRollback? : (param : TUseCaseRequest, error: Error) => Promise<void>; 
}



import { TransactionalUseCase } from "@core/common/usecase/TransactionalUseCase";
import { UseCase } from "@core/common/usecase/UseCase";
import { runOnTransactionCommit, runOnTransactionRollback, Transactional } from "typeorm-transactional";



export class TransactionalUseCaseWrapper<TUseCasePort, TUseCaseResult> implements UseCase<TUseCasePort, TUseCaseResult> {
    constructor(private readonly useCase : TransactionalUseCase<TUseCasePort, TUseCaseResult>) {}


    @Transactional({connectionName: 'postgres',})
    public async execute(port : TUseCasePort) : Promise<TUseCaseResult> {
        runOnTransactionRollback(async (error: Error) => {
            () => console.log('rollback')
        })
        const result: TUseCaseResult = await this.useCase.execute(port)

        runOnTransactionCommit(
            ()=> console.log('commit')
        )

        return result
        
    }


}
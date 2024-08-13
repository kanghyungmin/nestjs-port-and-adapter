export interface CommandHandler<TCommand> {
    handle(query: TCommand): Promise<void>;
}
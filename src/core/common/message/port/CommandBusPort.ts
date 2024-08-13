export interface CommandBusPort {
    sendCommand<Tcommand extends object>(command : Tcommand) : Promise<void>;
}
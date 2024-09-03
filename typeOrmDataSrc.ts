import { PostgresDataSource } from './src/infrastructure/adapter/persistence/typeorm/DataSource';

export const AppDataSource = PostgresDataSource

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


    //yarn migration:create ./migrations/name
    //yarn migration:generate ./migrations/name
    //yarn migration:run
    //yarn migration:revert



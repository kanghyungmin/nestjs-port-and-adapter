import { join } from 'path';
import { DataSource } from 'typeorm';

console.log(__dirname,'aaä')
console.log('bbb',join(__dirname, 'migrations/*.ts'))
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5454,
    username: "kang",
    password: "1234",
    database: "testDB",
    entities: ["src/infrastructure/adapter/persistence/typeorm/entity/**/*.{ts,js}"],
    migrations: ['migrations/*.{ts,js}'],
    synchronize: true,
    logging: false,
});

// Initialize the data source (this part is optional, but recommended for debugging)
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
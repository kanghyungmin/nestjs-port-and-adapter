
import { DatabaseConfig } from "@infrastructure/config/DatabaseConfig"
import { DataSource } from "typeorm"
import { TypeOrmDirectory } from "./TypeOrmDirectory"

console.log(__dirname)
console.log(TypeOrmDirectory)
export const PostgresDataSource = new DataSource({
    type: 'postgres', 
    host: DatabaseConfig.DB_HOST,
    port: DatabaseConfig.DB_PORT,
    username: DatabaseConfig.DB_USERNAME,
    password: DatabaseConfig.DB_PASSWORD,
    database: DatabaseConfig.DB_NAME,
    entities: [
        `${TypeOrmDirectory}/entity/**/*.ts`,
    ],
    migrations : [
      "dist/migrations/**/*.js"
   ],
    synchronize: true,
    logging: false,
    migrationsRun : true,
    migrationsTransactionMode: 'all',
  }
) 




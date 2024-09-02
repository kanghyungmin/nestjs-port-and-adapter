
import { DatabaseConfig } from "@infrastructure/config/DatabaseConfig"
import { DataSource } from "typeorm"
import { TypeOrmDirectory } from "@infrastructure/adapter/persistence/typeorm/TypeOrmDirectory"
import { TypeOrmLogger } from "@infrastructure/adapter/persistence/typeorm/logger/TypeOrmLogger"


export const PostgresDataSource = new DataSource({
    type: 'postgres', 
    host: DatabaseConfig.DB_HOST,
    port: DatabaseConfig.DB_PORT,
    username: DatabaseConfig.DB_USERNAME,
    password: DatabaseConfig.DB_PASSWORD,
    database: DatabaseConfig.DB_NAME,
    entities: [
        `${TypeOrmDirectory}/entity/**/*.ts`,
        'dist/infrastructure/adapter/persistence/typeorm/entity/**/*.js',
    ],
    migrations : [
      "dist/migrations/**/*.js"
   ],
    synchronize: true,
    logging  : DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
    logger : DatabaseConfig.DB_LOG_ENABLE ? TypeOrmLogger.new() : undefined,
    migrationsRun : true,
    migrationsTransactionMode: 'all',
  }
) 




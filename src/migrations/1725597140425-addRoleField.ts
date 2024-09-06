import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleField1725597140425 implements MigrationInterface {
    name = 'AddRoleField1725597140425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}

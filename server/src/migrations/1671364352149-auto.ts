import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1671364352149 implements MigrationInterface {
    name = 'auto1671364352149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" ALTER COLUMN "dateEnd" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" ALTER COLUMN "dateEnd" SET NOT NULL`);
    }

}

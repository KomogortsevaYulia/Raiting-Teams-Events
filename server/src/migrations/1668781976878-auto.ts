import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668781976878 implements MigrationInterface {
    name = 'auto1668781976878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_functions" ("function" integer NOT NULL, "user" integer NOT NULL, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "functionId" integer, "userId" integer, CONSTRAINT "PK_55b8cbf8c43df0901aaa1c2bcca" PRIMARY KEY ("function", "user"))`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_9a0a812396d7bb9a8d3d6e5395f" FOREIGN KEY ("functionId") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_functions" ADD CONSTRAINT "FK_d6a7a9f08e23cbd0cf3ae5338df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_d6a7a9f08e23cbd0cf3ae5338df"`);
        await queryRunner.query(`ALTER TABLE "user_functions" DROP CONSTRAINT "FK_9a0a812396d7bb9a8d3d6e5395f"`);
        await queryRunner.query(`DROP TABLE "user_functions"`);
    }

}

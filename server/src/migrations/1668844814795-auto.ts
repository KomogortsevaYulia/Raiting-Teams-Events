import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668844814795 implements MigrationInterface {
    name = 'auto1668844814795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "form" ("id" SERIAL NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "fieldsId" integer, "teamId" integer, CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_0442eda3ef6b50b6956d3c21dff" FOREIGN KEY ("fieldsId") REFERENCES "form_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "form" ADD CONSTRAINT "FK_0ae0ce46714d032ae4efe28be5d" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_0ae0ce46714d032ae4efe28be5d"`);
        await queryRunner.query(`ALTER TABLE "form" DROP CONSTRAINT "FK_0442eda3ef6b50b6956d3c21dff"`);
        await queryRunner.query(`DROP TABLE "form"`);
    }

}

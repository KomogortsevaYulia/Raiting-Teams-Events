import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668932443924 implements MigrationInterface {
    name = 'auto1668932443924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "functions" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" "public"."functions_type_enum" NOT NULL DEFAULT 'special', "teamId" integer, CONSTRAINT "PK_203889d2ae5a98ffc137739301e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "functions" ADD CONSTRAINT "FK_f7aa058518abda16495c05be523" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "functions" DROP CONSTRAINT "FK_f7aa058518abda16495c05be523"`);
        await queryRunner.query(`DROP TABLE "functions"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679849101274 implements MigrationInterface {
  name = 'auto1679849101274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "journals" ("id" SERIAL NOT NULL, "dateRegistration" TIMESTAMP, "dateStart" TIMESTAMP, "comment" character varying, "event_id" integer, "team_id" integer, "user_id" integer, CONSTRAINT "PK_157a30136385dd81cdd19111380" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_811c873435715b3eb624d256a11" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_1b4d28fa4b326ecc43128e7d05b" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_1b4d28fa4b326ecc43128e7d05b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_811c873435715b3eb624d256a11"`,
    );
    await queryRunner.query(`DROP TABLE "journals"`);
  }
}

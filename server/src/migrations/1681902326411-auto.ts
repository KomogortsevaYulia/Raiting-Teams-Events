import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681902326411 implements MigrationInterface {
  name = 'auto1681902326411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "achievements" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "points" integer NOT NULL, "date_get" date NOT NULL, "date_add" date NOT NULL, "file" character varying NOT NULL, "date_last_edit" date NOT NULL, "date_status_changed" date NOT NULL, "comment" character varying NOT NULL, "direction_id" integer, "status_id" integer, "type_id" integer, "user_id" integer, CONSTRAINT "PK_1bc19c37c6249f70186f318d71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_e2c799e4fa523f355079e1b06c0" FOREIGN KEY ("direction_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_3e7e91763bdef262e9f727a1208" FOREIGN KEY ("status_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_2888c1257c41913030b59369f96" FOREIGN KEY ("type_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" ADD CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_0c0cd24bc6e722c12cd45750434"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_2888c1257c41913030b59369f96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_3e7e91763bdef262e9f727a1208"`,
    );
    await queryRunner.query(
      `ALTER TABLE "achievements" DROP CONSTRAINT "FK_e2c799e4fa523f355079e1b06c0"`,
    );
    await queryRunner.query(`DROP TABLE "achievements"`);
  }
}

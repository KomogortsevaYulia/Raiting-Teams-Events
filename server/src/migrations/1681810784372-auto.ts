import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681810784372 implements MigrationInterface {
  name = 'auto1681810784372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "level"`);
    await queryRunner.query(`DROP TYPE "public"."events_level_enum"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "direction"`);
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
    await queryRunner.query(`ALTER TABLE "events" ADD "type_id" integer`);
    await queryRunner.query(`ALTER TABLE "events" ADD "level_id" integer`);
    await queryRunner.query(`ALTER TABLE "events" ADD "direction_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_bcb2ce0072504d624725e3ef826" FOREIGN KEY ("type_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_c5a362fc7d682923a6aa8f0072f" FOREIGN KEY ("level_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_bf2f38672c0046c6328e69b71e6" FOREIGN KEY ("direction_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_bf2f38672c0046c6328e69b71e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_c5a362fc7d682923a6aa8f0072f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_bcb2ce0072504d624725e3ef826"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "direction_id"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "level_id"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "type_id"`);
    await queryRunner.query(
      `CREATE TYPE "public"."events_type_enum" AS ENUM('Внешнее', 'Внутреннее')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type" "public"."events_type_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum" AS ENUM('НИД', 'КТД', 'УД', 'СД', 'ОД')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "direction" "public"."events_direction_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_level_enum" AS ENUM('Вузовский', 'Городской', 'Региональный')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "level" "public"."events_level_enum" DEFAULT 'Вузовский'`,
    );
  }
}

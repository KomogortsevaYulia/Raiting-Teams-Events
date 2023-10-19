import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681812791342 implements MigrationInterface {
  name = 'auto1681812791342';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "format"`);
    await queryRunner.query(`DROP TYPE "public"."events_format_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "clarifying_direction"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."events_clarifying_direction_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "character_event"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_character_event_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "type_participation"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."events_type_participation_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type_participation_id" integer`,
    );
    await queryRunner.query(`ALTER TABLE "events" ADD "format_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "clarifying_direction_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "character_event_id" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_b935d793584366f2a3c196ac9d7" FOREIGN KEY ("type_participation_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_fb98daef5570cb124e34c9ea42c" FOREIGN KEY ("format_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_12ab9fec0ea7a5c0bd47f244fb7" FOREIGN KEY ("clarifying_direction_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_9025d02effbcfec592d24236f5c" FOREIGN KEY ("character_event_id") REFERENCES "dictionary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_9025d02effbcfec592d24236f5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_12ab9fec0ea7a5c0bd47f244fb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_fb98daef5570cb124e34c9ea42c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_b935d793584366f2a3c196ac9d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "character_event_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "clarifying_direction_id"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "format_id"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "type_participation_id"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_type_participation_enum" AS ENUM('Пассивное', 'Активное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type_participation" "public"."events_type_participation_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_character_event_enum" AS ENUM('Конференция', 'Образовательное (soft-skills)', 'Концерт', 'Развлекательное', 'Соревнование')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "character_event" "public"."events_character_event_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_clarifying_direction_enum" AS ENUM('Гражданское', 'Патриотическое', 'Духовно - нравственное', 'Физическое', 'Экологическое', 'Трудовое', 'Культурно - просветительское', 'Научно - образовательное', 'Другое')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "clarifying_direction" "public"."events_clarifying_direction_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_format_enum" AS ENUM('Очное', 'Онлайн', 'Смешанное', 'Выездное', 'Заочное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "format" "public"."events_format_enum" DEFAULT 'Очное'`,
    );
  }
}

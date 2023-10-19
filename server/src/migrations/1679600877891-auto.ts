import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679600877891 implements MigrationInterface {
  name = 'auto1679600877891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ADD "control" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "target_audience" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_clarifying_direction_enum" AS ENUM('Гражданское', 'Патриотическое', 'Духовно - нравственное', 'Физическое', 'Экологическое', 'Трудовое', 'Культурно - просветительское', 'Научно - образовательное', 'Другое')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "clarifying_direction" "public"."events_clarifying_direction_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_character_event_enum" AS ENUM('Конференция', 'Образовательное (soft-skills)', 'Концерт', 'Развлекательное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "character_event" "public"."events_character_event_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "character_event"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_character_event_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "clarifying_direction"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."events_clarifying_direction_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "target_audience"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "control"`);
  }
}

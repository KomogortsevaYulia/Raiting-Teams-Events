import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679764639564 implements MigrationInterface {
  name = 'auto1679764639564';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."events_character_event_enum" RENAME TO "events_character_event_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_character_event_enum" AS ENUM('Конференция', 'Образовательное (soft-skills)', 'Концерт', 'Развлекательное', 'Соревнование')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "character_event" TYPE "public"."events_character_event_enum" USING "character_event"::"text"::"public"."events_character_event_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."events_character_event_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."events_character_event_enum_old" AS ENUM('Конференция', 'Образовательное (soft-skills)', 'Концерт', 'Развлекательное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "character_event" TYPE "public"."events_character_event_enum_old" USING "character_event"::"text"::"public"."events_character_event_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_character_event_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."events_character_event_enum_old" RENAME TO "events_character_event_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}

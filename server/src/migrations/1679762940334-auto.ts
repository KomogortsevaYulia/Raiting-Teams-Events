import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679762940334 implements MigrationInterface {
  name = 'auto1679762940334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."events_type_participation_enum" AS ENUM('Пассивное', 'Активное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type_participation" "public"."events_type_participation_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "plan" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
    await queryRunner.query(
      `CREATE TYPE "public"."events_location_enum" AS ENUM('Коворгинг Г-2', 'Конференц-зал Технопарк', 'Коворкинг Студотрядов', 'Актовый зал', 'Спортзал')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "location" "public"."events_location_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."events_format_enum" RENAME TO "events_format_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_format_enum" AS ENUM('Очное', 'Онлайн', 'Смешанное', 'Выездное', 'Заочное')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" TYPE "public"."events_format_enum" USING "format"::"text"::"public"."events_format_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" SET DEFAULT 'Очное'`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_format_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."events_direction_enum" RENAME TO "events_direction_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum" AS ENUM('Культурно-массовая деятельность', 'Общественная деятельность', 'Научная деятельность', 'Спортивная деятельность', 'Учебная деятельность')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum" USING "direction"::"text"::"public"."events_direction_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum_old" AS ENUM('Культурно-массовая', 'Общественная', 'Научная', 'Спортивная', 'Учебная')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum_old" USING "direction"::"text"::"public"."events_direction_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."events_direction_enum_old" RENAME TO "events_direction_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_format_enum_old" AS ENUM('Очное', 'Онлайн', 'Смешанное', 'Выездное', 'Заочный')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" TYPE "public"."events_format_enum_old" USING "format"::"text"::"public"."events_format_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "format" SET DEFAULT 'Очное'`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_format_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."events_format_enum_old" RENAME TO "events_format_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
    await queryRunner.query(`DROP TYPE "public"."events_location_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "location" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "plan"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "type_participation"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."events_type_participation_enum"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679579189617 implements MigrationInterface {
  name = 'auto1679579189617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "repeat"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "users_id"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "size"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "dateStartRegistration" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "dateEndRegistration" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "location" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_level_enum" AS ENUM('Вузовский', 'Городской', 'Региональный')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "level" "public"."events_level_enum" DEFAULT 'Вузовский'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_format_enum" AS ENUM('Очное', 'Онлайн', 'Смешанное', 'Выездное', 'Заочный')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "format" "public"."events_format_enum" DEFAULT 'Очное'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum" AS ENUM('Культурно-массовая', 'Общественная', 'Научная', 'Спортивная', 'Учебная')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "direction" "public"."events_direction_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."events_type_enum" AS ENUM('Внешнее', 'Внутреннее')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type" "public"."events_type_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" SET DEFAULT '"2023-03-23T13:46:39.557Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" SET DEFAULT '"2023-03-23T13:46:39.557Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateEnd" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "dateStart" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."events_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "direction"`);
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "format"`);
    await queryRunner.query(`DROP TYPE "public"."events_format_enum"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "level"`);
    await queryRunner.query(`DROP TYPE "public"."events_level_enum"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "dateEndRegistration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "dateStartRegistration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "size" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "users_id" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "repeat" boolean NOT NULL`,
    );
  }
}

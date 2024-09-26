import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1684393446845 implements MigrationInterface {
  name = 'Auto1684393446845';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "location"`);
    await queryRunner.query(`DROP TYPE "public"."events_location_enum"`);
    await queryRunner.query(
      `ALTER TABLE "events" DROP COLUMN "target_audience"`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "event_place" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "events" ADD "team_size" integer`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "event_goal" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "event_goal"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "team_size"`);
    await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "event_place"`);
    await queryRunner.query(
      `ALTER TABLE "events" ADD "target_audience" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_location_enum" AS ENUM('Коворгинг Г-2', 'Конференц-зал Технопарк', 'Коворкинг Студотрядов', 'Актовый зал', 'Спортзал')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD "location" "public"."events_location_enum"`,
    );
  }
}

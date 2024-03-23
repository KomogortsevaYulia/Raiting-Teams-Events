import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681638546114 implements MigrationInterface {
  name = 'auto1681638546114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."events_direction_enum" RENAME TO "events_direction_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum" AS ENUM('НИД', 'КТД', 'УД', 'СД', 'ОД')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum" USING "direction"::"text"::"public"."events_direction_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."events_direction_enum_old" AS ENUM('Культурно-массовая деятельность', 'Общественная деятельность', 'Научная деятельность', 'Спортивная деятельность', 'Учебная деятельность')`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum_old" USING "direction"::"text"::"public"."events_direction_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."events_direction_enum_old" RENAME TO "events_direction_enum"`,
    );
  }
}

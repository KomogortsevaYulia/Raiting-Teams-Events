import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1670670136270 implements MigrationInterface {
  name = 'auto1670670136270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "type_team" SET DEFAULT 'teams'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams" ALTER COLUMN "type_team" DROP DEFAULT`,
    );
  }
}

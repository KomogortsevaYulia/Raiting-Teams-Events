import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679839434567 implements MigrationInterface {
  name = 'auto1679839434567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_functions" ALTER COLUMN "dateEnd" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_functions" ALTER COLUMN "dateEnd" SET NOT NULL`,
    );
  }
}

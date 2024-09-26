import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1686049180453 implements MigrationInterface {
  name = 'auto1686049180453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "achievements" ALTER COLUMN "comment" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "achievements" ALTER COLUMN "comment" SET NOT NULL`,
    );
  }
}

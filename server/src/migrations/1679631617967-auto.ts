import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1679631617967 implements MigrationInterface {
  name = 'auto1679631617967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3" FOREIGN KEY ("function_id") REFERENCES "functions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" ADD CONSTRAINT "FK_414c47660792aa509c8f55adc7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_forms" ADD CONSTRAINT "FK_dc8c58310d9794b123b514516a3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_forms" DROP CONSTRAINT "FK_dc8c58310d9794b123b514516a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_414c47660792aa509c8f55adc7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_functions" DROP CONSTRAINT "FK_bc78d14d218fc2e57e7a6941ab3"`,
    );
  }
}

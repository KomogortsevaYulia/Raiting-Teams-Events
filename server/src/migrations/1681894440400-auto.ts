import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681894440400 implements MigrationInterface {
  name = 'auto1681894440400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "functions" DROP CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_9c113178e30b117d4ec1db45691"`,
    );
    await queryRunner.query(`ALTER TABLE "functions" DROP COLUMN "roleIdId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "title_role"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "title_role" integer`);
    await queryRunner.query(`ALTER TABLE "functions" ADD "roleIdId" integer`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_9c113178e30b117d4ec1db45691" FOREIGN KEY ("title_role") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "functions" ADD CONSTRAINT "FK_c8b15425a585fcedc6b1f7f734a" FOREIGN KEY ("roleIdId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

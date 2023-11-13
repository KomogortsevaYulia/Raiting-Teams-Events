import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1681794551182 implements MigrationInterface {
  name = 'auto1681794551182';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dictionary" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dictionary"`);
  }
}

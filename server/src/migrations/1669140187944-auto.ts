import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1669140187944 implements MigrationInterface {
    name = 'auto1669140187944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "users_id" text NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "size" character varying NOT NULL, "repeat" boolean NOT NULL, "tags" text NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`);
    }

}

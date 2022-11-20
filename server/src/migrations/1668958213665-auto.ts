import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668958213665 implements MigrationInterface {
    name = 'auto1668958213665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" integer NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "dateStart" TIMESTAMP NOT NULL, "dateEnd" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "size" character varying NOT NULL, "repeat" boolean NOT NULL, "tags" text NOT NULL, "users_id" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_38076437372d15e3a607ce3f621" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_38076437372d15e3a607ce3f621"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}

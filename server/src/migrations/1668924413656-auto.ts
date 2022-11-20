import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1668924413656 implements MigrationInterface {
    name = 'auto1668924413656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" integer NOT NULL, "type" character varying NOT NULL, "title" character varying NOT NULL, "id_users" text NOT NULL, "dateStart" date NOT NULL, "dateEnd" date NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "size" character varying NOT NULL, "repeat" boolean NOT NULL, "tags" text NOT NULL, "idUsersId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_bf741efbbcfee7f6c83a50dc096" FOREIGN KEY ("idUsersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_bf741efbbcfee7f6c83a50dc096"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}

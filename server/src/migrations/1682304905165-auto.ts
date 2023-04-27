import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1682304905165 implements MigrationInterface {
    name = 'auto1682304905165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requisition" ADD "fullname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."events_direction_enum" RENAME TO "events_direction_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."events_direction_enum" AS ENUM('НИД', 'КТД', 'УД', 'СД', 'ОД')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum" USING "direction"::"text"::"public"."events_direction_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_direction_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_direction_enum_old" AS ENUM('Научная деятельность', 'Культурно-массовая деятельность', 'Учебная деятельность', 'Спортивная деятельность', 'Общественная деятельность')`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "direction" TYPE "public"."events_direction_enum_old" USING "direction"::"text"::"public"."events_direction_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."events_direction_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."events_direction_enum_old" RENAME TO "events_direction_enum"`);
        await queryRunner.query(`ALTER TABLE "requisition" DROP COLUMN "fullname"`);
    }

}

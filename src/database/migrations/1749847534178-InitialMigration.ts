import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1749847534178 implements MigrationInterface {
    name = 'InitialMigration1749847534178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cultures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "plantedArea" double precision NOT NULL, "harvestYear" integer NOT NULL, "farmId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d1e898d879d22c4a3c25e4d9e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" double precision NOT NULL, "arableArea" double precision NOT NULL, "vegetationArea" double precision NOT NULL, "producerId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "document" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cultures" ADD CONSTRAINT "FK_a13604b4b1b69905e0b581dad8f" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_a47fa1b0ccf320f4028705ca3dd"`);
        await queryRunner.query(`ALTER TABLE "cultures" DROP CONSTRAINT "FK_a13604b4b1b69905e0b581dad8f"`);
        await queryRunner.query(`DROP TABLE "producers"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TABLE "cultures"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTypeToUserTable1716692755751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.user
            ADD COLUMN type_user integer;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.user
            DROP COLUMN type_user;
        `);
    }

}

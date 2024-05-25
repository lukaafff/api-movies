import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByColumnToMovieTable1716674319624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.movie
            ADD COLUMN user_id integer;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.movie
            DROP COLUMN user_id;
        `);
    }

}

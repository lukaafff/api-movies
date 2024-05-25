import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMovie1716579428220 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.movie (
                id integer NOT NULL,
                title character varying NOT NULL,
                description character varying NOT NULL,
                genre character varying NOT NULL,
                director character varying NOT NULL,
                release_year integer NOT NULL,
                image_url character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );

            CREATE SEQUENCE public.movie_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;
            
            ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.movie;
        `);
    }

}

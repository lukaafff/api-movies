import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'movie' })
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'title', nullable: false })
    title: string;

    @Column({ name: 'description', nullable: false })
    description: string;

    @Column({ name: 'genre', nullable: false })
    genre: string;

    @Column({ name: 'director', nullable: false })
    director: string;

    @Column({ name: 'release_year', nullable: false })
    release_year: number;

    @Column({ name: 'image_url', nullable: false })
    image_url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

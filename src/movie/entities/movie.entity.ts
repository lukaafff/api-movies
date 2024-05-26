import { UserEntity } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'movie' })
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: false })
    user_id: number;

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

    @ManyToMany(() => UserEntity, user => user.movies)
    @JoinTable({
        name: "user_movies",
        joinColumn: { name: "movie_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
    })
    user: UserEntity[];
}

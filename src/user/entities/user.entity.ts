import { MovieEntity } from "src/movie/entities/movie.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => MovieEntity, (movie) => movie.user)
    movies: MovieEntity[];
}

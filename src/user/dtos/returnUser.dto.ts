import { ReturnMoviesDto } from "src/movie/dtos/returnMovies.dto";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDto {
    name:string;
    email:string;
    movies?: ReturnMoviesDto[];

    constructor(userEntity: UserEntity) {
        this.name = userEntity.name;
        this.email = userEntity.email;

        this.movies = userEntity.movies
        ? userEntity.movies.map((movies) => new ReturnMoviesDto(movies))
        : undefined;
    } 
}
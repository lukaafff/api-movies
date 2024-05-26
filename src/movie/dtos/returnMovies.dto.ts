import { MovieEntity } from "../entities/movie.entity";

export class ReturnMoviesDto {
    title: string;
    description: string;
    genre: string;
    director: string;
    release_year: number;
    image_url: string;

    constructor(movies: MovieEntity) {
        this.title = movies.title;
        this.description = movies.description;
        this.genre = movies.genre;
        this.director = movies.director;
        this.release_year = movies.release_year;
        this.image_url = movies.image_url;
    }
}
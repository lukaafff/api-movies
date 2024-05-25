import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dtos/createMovie.dto';

@Controller('movies')
export class MovieController {
    constructor (private readonly movieService: MovieService) {}

    @Get()
    async getAllMovie(): Promise<MovieEntity[]> {
        return this.movieService.getAllMovie();
    }

    @Get('/:genre')
    async getAllMovieByGenre(@Param('genre') genre: string): Promise<MovieEntity[]> {
        return this.movieService.getAllMovieByGenre(genre);
    }

    @Post()
    async createMovie (@Body() createMovie: CreateMovieDto): Promise<MovieEntity> {
        return this.movieService.createMovie(createMovie);
    }
}
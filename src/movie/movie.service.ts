import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/createMovie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>,
    ) {}

    async getAllMovie(): Promise<MovieEntity[]> {
        return this.movieRepository.find();
    }

    async getAllMovieByGenre(genre): Promise<MovieEntity[]> {
        return this.movieRepository.find({
            where: {
                genre
            }
        });
    }

    async createMovie(createMovieDto: CreateMovieDto): Promise<MovieEntity> {

        return this.movieRepository.save({
            ...createMovieDto
        });
    }
}

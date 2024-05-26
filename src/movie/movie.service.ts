import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/createMovie.dto';
import { UpdateMovieDto } from './dtos/updateMovie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>,
    ) {}

    async getAllMovie(): Promise<{ message: string; movies: MovieEntity[] }> {
        try {
            const movies = await this.movieRepository.find();
            if (movies.length === 0) {
                return { message: 'Não foi encontrado nenhum filme.', movies: [] };
            }
            return { message: 'Filmes encontrados com sucesso.', movies };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar os filmes.');
        }
    }

    async getAllMovieByGenre(genre: string): Promise<{ message: string; movies: MovieEntity[] }> {
        try {
            const movies = await this.movieRepository.find({ where: { genre } });
            if (movies.length === 0) {
                return { message: `Não foram encontrados filmes com o gênero "${genre}".`, movies: [] };
            }
            return { message: 'Filmes encontrados com sucesso.', movies };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar os filmes por gênero.');
        }
    }

    async getMovieByTitle(title: string): Promise<{ message: string; movies: MovieEntity[] }> {
        try {
            const movies = await this.movieRepository.find({ where: { title } });
            if (movies.length === 0) {
                return { message: `Não foi encontrado nenhum filme com o título "${title}".`, movies: [] };
            }
            return { message: 'Filmes encontrados com sucesso.', movies };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar o filme pelo título.');
        }
    }

    async getMoviesByDirector(director: string): Promise<{ message: string; movies: MovieEntity[] }> {
        try {
            const movies = await this.movieRepository.find({ where: { director } });
            if (movies.length === 0) {
                return { message: `Não foram encontrados filmes do diretor "${director}".`, movies: [] };
            }
            return { message: 'Filmes encontrados com sucesso.', movies };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar os filmes pelo diretor.');
        }
    }

    async getMoviesByReleaseYear(releaseYear: number): Promise<{ message: string; movies: MovieEntity[] }> {
        try {
            const movies = await this.movieRepository.find({ where: { release_year: releaseYear } });
            if (movies.length === 0) {
                return { message: `Não foram encontrados filmes lançados no ano ${releaseYear}.`, movies: [] };
            }
            return { message: 'Filmes encontrados com sucesso.', movies };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar os filmes pelo ano de lançamento.');
        }
    }

    async createMovie(createMovieDto: CreateMovieDto, userId: number,): Promise<{ message: string; movie: MovieEntity }> {
        try {
            const newMovie = this.movieRepository.create(createMovieDto);
            newMovie.user_id = userId;
            const savedMovie = await this.movieRepository.save(newMovie);
            return { message: 'Filme criado com sucesso.', movie: savedMovie };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao criar o filme.');
        }
    }

    async deleteMovieById(id: number, userId: number): Promise<{ message: string }> {
        try {
            const movie = await this.movieRepository.findOne({ where: { id } });
            if (!movie) {
                throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
            }
    
            if (movie.user_id !== userId) {
                throw new ForbiddenException('Você não tem permissão para excluir este filme.');
            }
    
            await this.movieRepository.remove(movie);
            return { message: `Filme com ID ${id} excluído com sucesso.` };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao excluir o filme.');
        }
    }
    
    async deleteMovieByTitle(title: string, userId: number): Promise<{ message: string }> {
        try {
            const movie = await this.movieRepository.findOne({ where: { title } });
            if (!movie) {
                throw new NotFoundException(`Filme com título "${title}" não encontrado.`);
            }
    
            if (movie.user_id !== userId) {
                throw new ForbiddenException('Você não tem permissão para excluir este filme.');
            }
    
            await this.movieRepository.remove(movie);
            return { message: `Filme com título "${title}" excluído com sucesso.` };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao excluir o filme.');
        }
    }    

    async updateMovieById(id: number, userId: number, updateMovieDto: UpdateMovieDto): Promise<{ message: string; movie: MovieEntity }> {
        try {
            const movie = await this.movieRepository.findOne({ where: { id } });
            if (!movie) {
                throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
            }
    
            if (movie.user_id !== userId) {
                throw new ForbiddenException('Você não tem permissão para editar este filme.');
            }
    
            movie.title = updateMovieDto.title;
            movie.director = updateMovieDto.director;
            movie.genre = updateMovieDto.genre;
            movie.release_year = updateMovieDto.releaseYear;
    
            const updatedMovie = await this.movieRepository.save(movie);
            return { message: 'Filme atualizado com sucesso.', movie: updatedMovie };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar o filme.');
        }
    }
    

    async updateMovieByTitle(title: string, userId: number, updateMovieDto: UpdateMovieDto): Promise<{ message: string; movie: MovieEntity }> {
        try {
            const movie = await this.movieRepository.findOne({ where: { title } });
            if (!movie) {
                throw new NotFoundException(`Filme com título "${title}" não encontrado.`);
            }
    
            if (movie.user_id !== userId) {
                throw new ForbiddenException('Você não tem permissão para editar este filme.');
            }
    
            movie.title = updateMovieDto.title;
            movie.director = updateMovieDto.director;
            movie.genre = updateMovieDto.genre;
            movie.release_year = updateMovieDto.releaseYear;
    
            const updatedMovie = await this.movieRepository.save(movie);
            return { message: 'Filme atualizado com sucesso.', movie: updatedMovie }; 
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar o filme.');
        }
    }
    
}
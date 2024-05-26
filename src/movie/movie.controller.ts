import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dtos/createMovie.dto';
import { UpdateMovieDto } from './dtos/updateMovie.dto';
import { Roles } from 'src/user/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/user/decorators/user-id-decorator';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Roles(UserType.User)
    @Get()
    async getAllMovie(): Promise<{ message: string; movies: MovieEntity[] }> {
        const result = await this.movieService.getAllMovie();
        if (result.movies.length === 0) {
            return { message: 'Não foi encontrado nenhum filme.', movies: [] };
        }
        return { message: 'Filmes encontrados com sucesso.', movies: result.movies };
    }

    @Roles(UserType.User)
    @Get('/genre/:genre')
    async getAllMovieByGenre(@Param('genre') genre: string): Promise<{ message: string; movies: MovieEntity[] }> {
        const result = await this.movieService.getAllMovieByGenre(genre);
        if (result.movies.length === 0) {
            return { message: `Não foram encontrados filmes com o gênero "${genre}".`, movies: [] };
        }
        return { message: 'Filmes encontrados com sucesso.', movies: result.movies };
    }

    @Roles(UserType.User)
    @Get('/title/:title')
    async getMovieByTitle(@Param('title') title: string): Promise<{ message: string; movies: MovieEntity[] }> {
        const result = await this.movieService.getMovieByTitle(title);
        if (result.movies.length === 0) {
            return { message: `Não foi encontrado nenhum filme com o título "${title}".`, movies: [] };
        }
        return { message: 'Filmes encontrados com sucesso.', movies: result.movies };
    }

    @Roles(UserType.User)
    @Get('/director/:director')
    async getMoviesByDirector(@Param('director') director: string): Promise<{ message: string; movies: MovieEntity[] }> {
        const result = await this.movieService.getMoviesByDirector(director);
        if (result.movies.length === 0) {
            return { message: `Não foram encontrados filmes do diretor "${director}".`, movies: [] };
        }
        return { message: 'Filmes encontrados com sucesso.', movies: result.movies };
    }

    @Roles(UserType.User)
    @Get('/releaseYear/:releaseYear')
    async getMoviesByReleaseYear(@Param('releaseYear') releaseYear: number): Promise<{ message: string; movies: MovieEntity[] }> {
        const result = await this.movieService.getMoviesByReleaseYear(releaseYear);
        if (result.movies.length === 0) {
            return { message: `Não foram encontrados filmes lançados no ano ${releaseYear}.`, movies: [] };
        }
        return { message: 'Filmes encontrados com sucesso.', movies: result.movies };
    }

    @Roles(UserType.User)
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createMovie(@Body() createMovie: CreateMovieDto, @UserId() userId: number): Promise<{ message: string; movie: MovieEntity }> {
        return this.movieService.createMovie(createMovie, userId);
    }

    @Roles(UserType.User)
    @Delete('/title/:title')
    async deleteMovieByTitle(
        @Param('title') title: string,
        @UserId() userId: number
    ): Promise<{ message: string }> {
        return this.movieService.deleteMovieByTitle(title, userId);
    }

    @Roles(UserType.User)
    @Delete('/id/:id')
    async deleteMovieById(
        @Param('id') id: number,
        @UserId() userId: number
    ): Promise<{ message: string }> {
        return this.movieService.deleteMovieById(id, userId);
    }

    @Roles(UserType.User)
    @Put('/id/:id')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateMovieById(
        @Param('id') id: number,
        @Body() updateMovieDto: UpdateMovieDto,
        @UserId() userId: number
    ): Promise<{ message: string; movie: MovieEntity }> {
        return this.movieService.updateMovieById(id, userId, updateMovieDto);
    }
    

    @Roles(UserType.User)
    @Put('/title/:title')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateMovieByTitle(
        @Param('title') title: string,
        @Body() updateMovieDto: UpdateMovieDto,
        @UserId() userId: number
    ): Promise<{ message: string; movie: MovieEntity }> {
        return this.movieService.updateMovieByTitle(title, userId, updateMovieDto);
    }
}

import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
    @IsString({ message: 'O título deve ser uma string.' })
    @IsOptional()
    title?: string;

    @IsString({ message: 'O diretor deve ser uma string.' })
    @IsOptional()
    director?: string;

    @IsString({ message: 'O gênero deve ser uma string.' })
    @IsOptional()
    genre?: string;

    @IsInt({ message: 'O ano de lançamento deve ser um número inteiro.' })

    @IsOptional()
    releaseYear?: number;
}

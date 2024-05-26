import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateMovieDto {
    @ApiProperty({ example: 'Ghostbusters: Apocalipse De Gelo' })
    @IsString({ message: 'O título deve ser uma string.' })
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'A família Spengler regressa ao local onde tudo começou – o icónico quartel dos bombeiros de Nova Iorque – para se juntar aos Caça-Fantasmas originais, que desenvolveram um laboratório de investigação ultra-secreto para levar a destruição de fantasmas a um novo nível.'})
    @IsString({ message: 'O diretor deve ser uma string.' })
    @IsOptional()
    director?: string;

    @ApiProperty({ example: 'Comédia' })
    @IsString({ message: 'O gênero deve ser uma string.' })
    @IsOptional()
    genre?: string;

    @ApiProperty({ example: 'Gil Kenan' })
    @IsOptional()
    @IsInt({ message: 'O ano de lançamento deve ser um número inteiro.' })

    @ApiProperty({ example: '2024' })
    @IsOptional()
    releaseYear?: number;

    @ApiProperty({ example: 'https://ingresso-a.akamaihd.net/prd/img/movie/ghostbusters-apocalipse-de-gelo/e6806d06-0578-4eaf-8f7a-c3a896bc2073.webp' })
    @IsUrl({}, { message: 'A URL da imagem é inválida.' })
    image_url: string;
}

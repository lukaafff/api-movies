import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsUrl } from 'class-validator';

export class CreateMovieDto {
    @ApiProperty({ example: 'Ghostbusters: Apocalipse De Gelo' })
    @IsString({ message: 'O título deve ser uma string.' })
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    title: string;

    @ApiProperty({ example: 'A família Spengler regressa ao local onde tudo começou – o icónico quartel dos bombeiros de Nova Iorque – para se juntar aos Caça-Fantasmas originais, que desenvolveram um laboratório de investigação ultra-secreto para levar a destruição de fantasmas a um novo nível. Mas quando a descoberta de um artefato antigo desencadeia uma força maligna, novos e antigos Caça-Fantasmas devem unir forças para proteger seu lar e salvar o mundo de uma segunda Era Glacial.' })
    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    description: string;

    @ApiProperty({ example: 'Aventura' })
    @IsString({ message: 'O gênero deve ser uma string.' })
    @IsNotEmpty({ message: 'O gênero é obrigatório.' })
    genre: string;

    @ApiProperty({ example: 'Gil Kenan' })
    @IsString({ message: 'O diretor deve ser uma string.' })
    @IsNotEmpty({ message: 'O diretor é obrigatório.' })
    director: string;

    @ApiProperty({ example: '2024' })
    @IsInt({ message: 'O ano de lançamento deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ano de lançamento é obrigatório.' })
    release_year: number;

    @ApiProperty({ example: 'https://ingresso-a.akamaihd.net/prd/img/movie/ghostbusters-apocalipse-de-gelo/e6806d06-0578-4eaf-8f7a-c3a896bc2073.webp' })
    @IsUrl({}, { message: 'A URL da imagem é inválida.' })
    @IsNotEmpty({ message: 'A URL da imagem é obrigatória.' })
    image_url: string;

    @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
    user_id: number; 
}

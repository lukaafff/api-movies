import { IsString, IsNotEmpty, IsInt, IsUrl } from 'class-validator';

export class CreateMovieDto {
    @IsString({ message: 'O título deve ser uma string.' })
    @IsNotEmpty({ message: 'O título é obrigatório.' })
    title: string;

    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição é obrigatória.' })
    description: string;

    @IsString({ message: 'O gênero deve ser uma string.' })
    @IsNotEmpty({ message: 'O gênero é obrigatório.' })
    genre: string;

    @IsString({ message: 'O diretor deve ser uma string.' })
    @IsNotEmpty({ message: 'O diretor é obrigatório.' })
    director: string;

    @IsInt({ message: 'O ano de lançamento deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ano de lançamento é obrigatório.' })
    release_year: number;

    @IsUrl({}, { message: 'A URL da imagem é inválida.' })
    @IsNotEmpty({ message: 'A URL da imagem é obrigatória.' })
    image_url: string;

    @IsInt({ message: 'O ID do usuário deve ser um número inteiro.' })
    @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
    user_id: number; 
}

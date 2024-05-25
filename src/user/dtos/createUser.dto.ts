import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
    name: string;

    @IsEmail({}, { message: 'Email inválido.' })
    @IsNotEmpty({ message: 'O email é obrigatório.' })
    email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    password: string;
}

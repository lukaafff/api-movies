import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'luiza' })
    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
    name: string;

    @ApiProperty({ example: 'luiza@gmail.com' })
    @IsEmail({}, { message: 'Email inválido.' })
    @IsNotEmpty({ message: 'O email é obrigatório.' })
    email: string;

    @ApiProperty({ example: '123' })
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    password: string;
}

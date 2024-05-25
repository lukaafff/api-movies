import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsOptional()
    name?: string;

    @IsEmail({}, { message: 'Email inválido.' })
    @IsOptional()
    email?: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @IsOptional()
    password?: string;
}

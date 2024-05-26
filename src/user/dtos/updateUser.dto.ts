import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'luiza garcia' })
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'luizagarcia@gmail.com' })
    @IsEmail({}, { message: 'Email inválido.' })
    @IsOptional()
    email?: string;

    @ApiProperty({ example: '1234' })
    @IsString({ message: 'A senha deve ser uma string.' })
    @IsOptional()
    password?: string;
}

import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUser(): Promise<ReturnUserDto[]> {
        const { users } = await this.userService.getAllUser();
        return users.map(userEntity => new ReturnUserDto(userEntity));
    }

    @Get('/:user_id')
    async getUserById(@Param('user_id') user_id: number): Promise<ReturnUserDto> {
        return new ReturnUserDto (await this.userService.getUserByUsingRelations(user_id));
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async createUser(@Body() createUser: CreateUserDto): Promise<{ message: string; user: UserEntity }> {
        return this.userService.createUser(createUser);
    }

    @Delete('/id/:id')
    async deleteUserById(@Param('id') id: number): Promise<{ message: string }> {
        return this.userService.deleteUserById(id);
    }

    @Delete('/name/:name')
    async deleteUserByname(@Param('name') name: string): Promise<{ message: string }> {
        return this.userService.deleteUserByname(name);
    }

    @Put('/id/:id')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<{ message: string; user: UserEntity }> {
        return this.userService.updateUserById(id, updateUserDto);
    }

    @Put('/name/:name')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async updateUserByname(@Param('name') name: string, @Body() updateUserDto: UpdateUserDto): Promise<{ message: string; user: UserEntity }> {
        return this.userService.updateUserByname(name, updateUserDto);
    }
}

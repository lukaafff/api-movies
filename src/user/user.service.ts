import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllUser(): Promise<{ message: string; users: UserEntity[] }> {
        try {
            const users = await this.userRepository.find();
            if (users.length === 0) {
                return { message: 'Não foram encontrados usuários.', users };
            }
            return { message: 'Usuários encontrados', users };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao buscar os usuários.');
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<{ message: string; user: UserEntity }> {
        try {
            const newUser = this.userRepository.create(createUserDto);
            const savedUser = await this.userRepository.save(newUser);
            return { message: 'Usuário criado com sucesso.', user: savedUser };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao criar o usuário.');
        }
    }

    async deleteUserById(id: number): Promise<{ message: string }> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
            }
            await this.userRepository.remove(user);
            return { message: `Usuário com ID ${id} excluído com sucesso.` };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao excluir o usuário.');
        }
    }

    async deleteUserByname(name: string): Promise<{ message: string }> {
        try {
            const user = await this.userRepository.findOne({ where: { name } });
            if (!user) {
                throw new NotFoundException(`Usuário com nome de usuário "${name}" não encontrado.`);
            }
            await this.userRepository.remove(user);
            return { message: `Usuário com nome de usuário "${name}" excluído com sucesso.` };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao excluir o usuário.');
        }
    }

    async updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; user: UserEntity }> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
            }

            user.name = updateUserDto.name;
            user.email = updateUserDto.email;
            user.password = updateUserDto.password;

            const updatedUser = await this.userRepository.save(user);
            return { message: 'Usuário atualizado com sucesso.', user: updatedUser };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar o usuário.');
        }
    }

    async updateUserByname(name: string, updateUserDto: UpdateUserDto): Promise<{ message: string; user: UserEntity }> {
        try {
            const user = await this.userRepository.findOne({ where: { name } });
            if (!user) {
                throw new NotFoundException(`Usuário com nome de usuário "${name}" não encontrado.`); 
            }

            user.name = updateUserDto.name;
            user.email = updateUserDto.email;
            user.password = updateUserDto.password;

            const updatedUser = await this.userRepository.save(user);
            return { message: 'Usuário atualizado com sucesso.', user: updatedUser };
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu um erro ao atualizar o usuário.');
        }
    }
}

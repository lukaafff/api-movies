import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { hash } from 'bcrypt';
import { UserType } from './enum/user-type.enum';

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

    async getUserByUsingRelations(user_id: number): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { id: user_id },
            relations: ['movies']
        });
    }    

    async createUser(createUserDto: CreateUserDto, userType?: number,): Promise<{ message: string; user: UserEntity }> {
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        const newUser = this.userRepository.create({
          ...createUserDto,
          typeUser: userType ? userType : UserType.User,
          password: passwordHashed,
        });
        const savedUser = await this.userRepository.save(newUser);
        return { message: 'Usuário criado com sucesso.', user: savedUser };
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

    async findUserByEmail(email: string): Promise<UserEntity | undefined> {
        try {
          return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
          throw new InternalServerErrorException('Ocorreu um erro ao buscar o usuário.');
        }
      }
}

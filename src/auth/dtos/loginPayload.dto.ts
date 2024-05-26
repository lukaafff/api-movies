import { UserEntity } from 'src/user/entities/user.entity';

export class LoginPayload {
  id: number;

  constructor(user: UserEntity) {
    this.id = user.id;
  }
}
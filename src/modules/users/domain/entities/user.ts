import { UserRole } from 'src/shared/enums/user-role.enum';
import { AppException } from 'src/shared/exceptions/app.exception';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public password: string,
    public readonly role: UserRole,
  ) {
    if (!email || email.trim().length === 0) {
      throw new AppException('INVALID_EMAIL', 'O email do usuário não pode ser vazio');
    }
    if (!password || password.trim().length === 0) {
      throw new AppException('INVALID_PASSWORD', 'A senha do usuário não pode ser vazia');
    }
    if (!Object.values(UserRole).includes(role)) {
      throw new AppException('INVALID_ROLE', 'O papel do usuário é inválido');
    }
  }
} 
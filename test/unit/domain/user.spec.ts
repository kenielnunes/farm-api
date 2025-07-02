import { User } from 'src/modules/users/domain/entities/user';
import { UserRole } from 'src/shared/enums/user-role.enum';

describe('Entidade Usuário', () => {
  it('deve criar um usuário válido', () => {
    const user = new User(
      '1',
      'usuario@email.com',
      'senhaSegura',
      UserRole.ADMIN,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('usuario@email.com');
    expect(user.role).toBe(UserRole.ADMIN);
  });

  it('deve aceitar os roles válidos', () => {
    expect(() => new User('2', 'gestor@email.com', 'senha', UserRole.GESTOR)).not.toThrow();
    expect(() => new User('3', 'usuario@email.com', 'senha', UserRole.GESTOR)).not.toThrow();
  });

  it('deve lançar erro se o email for vazio', () => {
    expect(() => new User('4', '', 'senha', UserRole.ADMIN)).toThrow();
  });

  it('deve lançar erro se a senha for vazia', () => {
    expect(() => new User('5', 'teste@email.com', '', UserRole.ADMIN)).toThrow();
  });

  it('deve lançar erro se o role for inválido', () => {
    // @ts-expect-error Testando valor inválido propositalmente
    expect(() => new User('6', 'teste@email.com', 'senha', 'Invalido')).toThrow();
  });
}); 
export class UsernameAlreadyExists extends Error {
  constructor(username?: string) {
    super(
      username
        ? `Your username named "${username}" is already taken`
        : 'Username already exists',
    );
  }
}

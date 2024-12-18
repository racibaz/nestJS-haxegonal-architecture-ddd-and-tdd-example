export abstract class AuthRepository {
  abstract isUserExist(email: string): boolean;
}

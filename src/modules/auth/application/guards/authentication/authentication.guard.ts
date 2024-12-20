import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AccessTokenGuard } from '../access-token/access-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../../../domain/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../../decorators/auth/auth.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  // Set the default Auth Type
  private static readonly defaultAuthType = AuthType.Bearer;

  // Create authTypeGuardMap
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // Print authTypeGuardMap
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // Declare the default error
    let error = new UnauthorizedException();

    for (const instance of guards) {
      // Declare a new constant
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorised to access the resource
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });
      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}

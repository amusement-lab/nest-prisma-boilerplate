import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const User = z
  .object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
  })
  .openapi('User');
export class UserDto extends createZodDto(User) {}

export const GetUsers = z.array(User).openapi('GetUsers');
export class GetUsersDto extends createZodDto(GetUsers) {}

export class UpsertUserDto extends createZodDto(
  User.omit({ id: true }).extend({ roleId: z.string() }),
) {}

export class ResponseUpsertDto extends createZodDto(
  z.object({ message: z.string() }),
) {}

export class LoginUserDto extends createZodDto(User.omit({ id: true })) {}

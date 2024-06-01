import { createZodDto } from '@wahyubucil/nestjs-zod-openapi';
import { z } from 'zod';

export const User = z
  .object({
    id: z.string(),
    username: z.string(),
    password: z.string().email(),
  })
  .openapi('User');

export class UserDto extends createZodDto(User) {}

## Nest Prisma CBAC Boilerplate

Same progressive Node.js framework for building efficient and scalable server-side applications you know, but better with prisma, claim based authorization, and several config.</p>

Some highlighted feature:

- Use [claim based authorization (CBAC)](https://docs.nestjs.com/security/authorization#claims-based-authorization) concept for login and authorization
- Configured with Prisma ORM
- Configured with Zod as validator
- Configured with OpenAPI via [@wahyubucil/nestjs-zod-openapi](https://www.npmjs.com/package/@wahyubucil/nestjs-zod-openapi)
- Configured integration testing with [Vite](https://vitejs.dev/) & [Superagent](https://www.npmjs.com/package/superagent)

## Installation

1. Install the depedencies

```bash
$ pnpm install
```

2. Run the docker compose if you want runing postgress and pgadmin in docker environment

```bash
$ docker compose up -d
```

3. Copy the `.env.example` file and config your `env`

```bash
$ cp .env.example .env
```

4. After setup the `.env` then configure the prisma

```bash
$ pnpm exec prisma migrate dev
$ pnpm exec prisma generate
```

5. Run the seeder for initial data

```bash
$ pnpm seed
```

6. Running the app

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

7. If you need doing testing, first you neet set up the env for test

```bash
$ cp .env.example .env.test
```

8. Then you can run:

```bash
# running the environtment only for the test
$ pnpm test:env

# running the test only
$ pnpm test:run

# running both environment and the test
$ pnpm test
```

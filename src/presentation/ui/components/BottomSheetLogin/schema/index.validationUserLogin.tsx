import { z } from "zod";

export const validationUserLoginSchemaPtBR = z.object({
  username: z
    .string({
      required_error: "Usuario é obrigatório",
    })
    .min(2, { message: "Nome de usuário deve ter pelo menos 2 caracteres" }),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(2, { message: "A senha deve ter pelo menos 2 caracteres" }),
});

export const validationUserLoginSchemaEnUS = z.object({
  username: z
    .string({
      required_error: "User is required",
    })
    .min(2, { message: "Username must be at least 2 characters long" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(2, { message: "Password must be at least 2 characters long" }),
});

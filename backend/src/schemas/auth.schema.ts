import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki')
    .max(20, 'Nazwa użytkownika może mieć maksymalnie 20 znaków')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nazwa może zawierać tylko litery, cyfry i podkreślnik'),
  email: z.string().email('Niepoprawny format adresu e-mail'),
  password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków'),
});

export const loginSchema = z.object({
  email: z.string().email('Niepoprawny format adresu e-mail'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});
import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { registerUser, loginUser } from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../config/db';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0].message });
      return;
    }

    const result = await registerUser(parsed.data.username, parsed.data.email, parsed.data.password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Błąd rejestracji' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: parsed.error.issues[0].message });
      return;
    }

    const result = await loginUser(parsed.data.email, parsed.data.password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Błąd logowania' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.userId },
      select: { id: true, username: true, email: true, createdAt: true },
    });

    if (!user) {
      res.status(404).json({ message: 'Nie znaleziono użytkownika' });
      return;
    }

    res.json(user);
  } catch {
    res.status(500).json({ message: 'Błąd serwera' });
  }
};
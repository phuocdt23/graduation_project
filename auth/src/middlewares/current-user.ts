import { UnauthorizedError } from './../errors/unauthorized-error';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
interface UserPayload {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    // throw new UnauthorizedError();
    next();
  }

  try {
    const payload = jwt.verify(req.session!.jwt, process.env.JWT_KEY!);
    if (!payload) throw new UnauthorizedError();

    req.currentUser = payload as UserPayload;
    next();

  } catch (error) {
    throw new UnauthorizedError();
  }






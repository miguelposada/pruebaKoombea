import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
const excludedPaths = ['/auth/login','/auth/register']; // Rutas que deben excluirse del middleware

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const path = req.originalUrl;
    if (excludedPaths.includes(path)) {
      // Si la ruta está en la lista de rutas excluidas, omitir el middleware y pasar al siguiente middleware/ruta
      next();
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req['user'] = decoded;
        next();
      } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }
  }
}

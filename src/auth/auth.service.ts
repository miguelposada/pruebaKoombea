import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks } from './task.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthService {

  constructor(@InjectModel('Tasks') private readonly tasksModel: Model<Tasks>) {}

  /* async validateUser(username: string, password: string): Promise<Tasks | null> {
    const user = await this.tasksModel.findOne({ username }).exec();

    if (!user) {
      return null; // Usuario no encontrado
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user; // Usuario válido
    }

    return null; // Contraseña incorrecta
  } */

  /* async login(username: string, password: string) {
    // Implementa la lógica de inicio de sesión
    const user = await this.tasksModel.findOne({username}).exec();
    
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      // Usuario autenticado
      if (isPasswordValid) {
        const token = await this.generateToken(user);
        return { success: true, message: 'Inicio de sesión exitoso', token };
      }
    } else {
      // Usuario no encontrado o credenciales inválidas
      return { success: false, message: 'Inicio de sesión fallido' };
    }
  } */

 /*  async register(username: string, password: string) {
    const existingUser = await this.tasksModel.findOne({ username }).exec();
  
    if (existingUser) {
      return { success: false, message: 'El nombre de usuario ya está en uso' };
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const user = new this.tasksModel({ username, password: hashedPassword });
    await user.save();
  
    return { success: true, message: 'Registro exitoso' };
  } */

  /* async generateToken(user: User) {
    const payload = { username: user.username };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  } */

  async getTask(id: String){
    const user = await this.tasksModel.findOne({id}).exec();
    console.log(user)
    if (user) {
      // Usuario autenticado
      return { success: true, message: 'Inicio de sesión exitoso' };
      
    } else {
      // Usuario no encontrado o credenciales inválidas
      return { success: false, message: 'Inicio de sesión fallido' };
    }
  }
  
   
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async validateCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    return this.validatePassword(password, user)
  }

  async login(username) {
    return await this.generateToken(username);
  }

  async register(username: string, password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new this.userModel({ username, password: hashedPassword });
    await user.save();
    return { success: true, message: 'Registro exitoso' };
  }

  async generateToken(username) {
    const payload = { username: username };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  async validatePassword(password: String, user: User){
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }else{
      throw new UnauthorizedException('Wrong User Credentials');
    }
  }

  async validateUserName(username: String){
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      return { success: false, message: 'username is already assigned' };
    }else{
      return { success: true, message: 'username available to save' };
    }
  }
}

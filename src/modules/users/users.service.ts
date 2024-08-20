import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Columns } from '../columns/models/column.model';
import { Card } from '../cards/models/card.model';
import { Comment } from '../comments/models/comment.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const hashPassword = await this.hashPassword(dto.password);
      const user = await this.userRepository.create({
        firstName: dto.firstName,
        email: dto.email,
        password: hashPassword,
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllUsers(): Promise<CreateUserDTO[]> {
    const user = await this.userRepository.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Columns,
          include: [
            {
              model: Card,
              include: [Comment],
            },
          ],
        },
      ],
    });
    return user;
  }

  async getOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Columns,
          include: [
            {
              model: Card,
              include: [Comment],
            },
          ],
        },
      ],
    });
    return user;
  }
}

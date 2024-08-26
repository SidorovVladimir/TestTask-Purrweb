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

  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
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
    } catch (e) {
      throw new Error(e);
    }
  }

  async publicUser(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email },
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
    } catch (e) {
      throw new Error(e);
    }
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
  async deleteUser(id: number): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { id } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}

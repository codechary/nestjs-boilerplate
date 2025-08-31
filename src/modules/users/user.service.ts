import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import {comparePasswords} from "../../common/bcrypt.service";
import {LoginPayloadDto} from "./dtos/login-payload.dto";

@Injectable()
export class UserService {
  public readonly repository: Repository<UsersEntity>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UsersEntity);
  }
  async findAll(): Promise<UsersEntity[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<UsersEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async createUser(userData: Partial<UsersEntity>): Promise<UsersEntity> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async login(payload: LoginPayloadDto): Promise<{ status: number; message: string }> {
    const existingUser = await this.repository.findOne({ where: { email: payload.email } });
    if (!existingUser) {
      return { status: 404, message: 'No user exist' };
    }

    const isMatched = await comparePasswords(payload.password, existingUser.password)

    if (isMatched) {
      return { status: 200, message: 'Login successful' };
    }

    return { status: 401, message: 'Invalid credentials' };
  }
}

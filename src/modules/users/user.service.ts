import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

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

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

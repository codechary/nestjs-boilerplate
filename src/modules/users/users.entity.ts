import {Entity, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UsersDto } from './users.dto';
import { UseDto } from '../../common/dto/use-dto.decorator';
import {hashPassword} from "../../common/bcrypt.service";

@Entity('users')
@UseDto(UsersDto)
export class UsersEntity extends AbstractEntity<UsersDto> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, select: false })
  password: string;


  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }

  @BeforeUpdate()
  async hashPasswordOnUpdate()  {
    this.password = await hashPassword(this.password);
  }
}

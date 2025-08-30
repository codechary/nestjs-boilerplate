import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { UsersDto } from './users.dto';
import { UseDto } from '../../common/dto/use-dto.decorator';

@Entity('users')
@UseDto(UsersDto)
export class UsersEntity extends AbstractEntity<UsersDto> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
}

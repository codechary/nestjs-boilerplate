import { AbstractEntity, Constructor } from '../abstract.entity';
import { AbstractDto } from './abstract.dto';
import { BaseSerialDto } from './base-serial.dto';
import { BaseSerialEntity } from '../base-serial.entity';

export function UseDto(
  dtoClass: Constructor<
    AbstractDto | BaseSerialDto,
    [AbstractEntity | BaseSerialEntity, unknown]
  >,
): ClassDecorator {
  return (ctor) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ctor.prototype.dtoClass = dtoClass;
  };
}

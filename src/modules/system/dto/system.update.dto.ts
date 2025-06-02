import { OmitType, PartialType } from '@nestjs/mapped-types';
import { SystemCreateDto } from './system.create.dto';

export class SystemUpdateDto extends PartialType(
  OmitType(SystemCreateDto, ['preset'] as const),
) {}

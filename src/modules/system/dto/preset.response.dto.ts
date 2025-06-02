import { Expose } from 'class-transformer';
import { adafruitMappedType } from '../types';

export class PresetResponseDto {
  @Expose()
  name: string;

  @Expose()
  inps: adafruitMappedType[];

  @Expose()
  outs: adafruitMappedType[];

  @Expose()
  settings: adafruitMappedType[];

  @Expose()
  source: string;
}

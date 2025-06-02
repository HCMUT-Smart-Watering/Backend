import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { adafruitMappedType } from '../types';

@Entity({ name: 'preset' })
export class SystemPreset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  /* list of input devices */
  @Column({ type: 'jsonb', array: true })
  inps: adafruitMappedType[];

  /* list of output devices */
  @Column({ type: 'jsonb', array: true })
  outs: adafruitMappedType[];

  /* list of system settings */
  @Column({ type: 'jsonb', array: true })
  settings: adafruitMappedType[];

  /* link to ohstem source code */
  @Column()
  source: string;
}

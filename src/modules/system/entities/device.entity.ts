import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceType } from '../types';

@Entity()
export abstract class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'system' })
  systemId: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'varchar', array: true, name: 'feed-name' })
  feedNames: string[];

  @Column({ enum: DeviceType })
  type: DeviceType;
}

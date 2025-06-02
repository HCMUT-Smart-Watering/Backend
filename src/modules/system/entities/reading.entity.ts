import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'device' })
  deviceId: string;

  @Column({ type: 'timestamptz' })
  time: Date;

  @Column()
  value: string;
}

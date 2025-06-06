import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class System {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'user' })
  userId: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ name: 'api-key' })
  apiKey: string;

  @Column({ default: true })
  active: boolean = true;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}

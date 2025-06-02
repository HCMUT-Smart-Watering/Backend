import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class System {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'user' })
  userId: string;

  @Column()
  name: string;

  @Column({ name: 'api-key' })
  apiKey: string;

  @Column({ default: true })
  active: boolean = true;
}

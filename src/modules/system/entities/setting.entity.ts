import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'system' })
  systemId: string;

  @Column()
  name: string;

  @Column()
  feedName: string;

  @Column({ nullable: true })
  value: string;
}

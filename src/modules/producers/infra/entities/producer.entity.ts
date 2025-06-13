import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FarmEntity } from '../../../farms/infra/entities/farm.entity';

@Entity('producers')
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @OneToMany(() => FarmEntity, (farm) => farm.producer)
  farms: FarmEntity[];

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

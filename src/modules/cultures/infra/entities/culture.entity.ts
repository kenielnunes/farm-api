import { FarmEntity } from 'src/modules/farms/infra/entities/farm.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cultures')
export class CultureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  plantedArea: number;

  @Column()
  harvestYear: number;

  @ManyToOne(() => FarmEntity, (farm) => farm.cultures)
  farm: FarmEntity;

  @Column()
  farmId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 
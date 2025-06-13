import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CultureEntity } from '../../../cultures/infra/entities/culture.entity';
import { ProducerEntity } from '../../../producers/infra/entities/producer.entity';

@Entity('farms')
export class FarmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  arableArea: number;

  @Column('float')
  vegetationArea: number;

  @ManyToOne(() => ProducerEntity, (producer) => producer.farms)
  producer: ProducerEntity;

  @Column()
  producerId: string;

  @OneToMany(() => CultureEntity, (culture) => culture.farm)
  cultures: CultureEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 
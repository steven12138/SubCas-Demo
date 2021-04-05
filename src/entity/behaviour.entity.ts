import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Behaviour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  behaviour: string;

  @Column()
  UA: string;

  @Column()
  IP: string;

  @Column()
  data: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class account {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  description: string;
}

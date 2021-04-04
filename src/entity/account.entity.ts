import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 数据表设计
@Entity()
export class Account {
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

  @Column()
  emailValidateCode: string | undefined | null;

  @Column()
  forgetPasswordValidateCode: string | undefined | null;
}

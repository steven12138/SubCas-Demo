import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RegisteredSystem {
  @PrimaryColumn()
  url: string;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // table name
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 }) // varchar, 20 char limit
  fullName: string;

  @Column() // default type is varchar
  password: string;

  @Column('varchar', { length: 30, unique: true }) // varchar, unique
  email: string;

  @Column({
    type: 'enum',
    enum: ['solider', 'contributor'],
  })
  userType: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studentstb')
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  email: string;
}

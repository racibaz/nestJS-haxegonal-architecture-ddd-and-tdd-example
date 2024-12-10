import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;
}
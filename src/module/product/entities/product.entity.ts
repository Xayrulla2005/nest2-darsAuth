import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:"Product"})
export class Product {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  title:string

   @Column()
  description:string

   @Column()
  price:number

   @Column({nullable:true})
  image:string

  @UpdateDateColumn()
  updatedAt:Date

  @CreateDateColumn()
  createdAt:Date
  
}

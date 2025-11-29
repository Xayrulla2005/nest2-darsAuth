import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity({name:"user"})
export class User{
  @PrimaryGeneratedColumn()
  id:number
@Column()
username:string

@Column()
email:string

@Column()
password:string

@Column({ type: "int", nullable: true })
otp: number | null;

@Column({ type: "bigint", nullable: true })
otpTime: number | null;

@Column({ default: false })
isVerified: boolean;


@UpdateDateColumn({default:Date})
updatedAt:Date

@CreateDateColumn({default:Date})
createdAt:Date 
  dataValues: any

}
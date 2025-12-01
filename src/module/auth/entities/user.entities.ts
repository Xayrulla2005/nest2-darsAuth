import { UserRole } from "src/common/constans/role"
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

@Column({ default:null, nullable: true })
otp: number ;

@Column({ type: "bigint", nullable: true })
otpTime: number ;

@Column({ default: false })
isVerified: boolean;

@Column({ default: UserRole.USER })
role: UserRole;


@UpdateDateColumn()
updatedAt:Date

@CreateDateColumn()
createdAt:Date 
  dataValues: any

}
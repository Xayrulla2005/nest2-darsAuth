import { Table,Model, Column, DataType,} from "sequelize-typescript";
import { toDefaultValue } from "sequelize/lib/utils";

@Table({timestamps:true})
export class User extends Model{
@Column
username:string

@Column
email:string

@Column
password:string

@Column({ allowNull: true, defaultValue: null })
otp:string

@Column({allowNull: true,type:DataType.BIGINT})
otpTime:number

@Column({ allowNull: true,defaultValue: false })
isVerifide:boolean
}
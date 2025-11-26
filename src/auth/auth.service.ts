import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, LoginDto, VerifayDto } from './dto/create.auth.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from "nodemailer";
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  private transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"xayrullamatyakubov2005@gmail.com",
      pass:process.env.APP_KEY
    }
  })
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService
  ) {}

  ///// register
  async register (createUserDto:CreateUserDto):Promise<{message:string}>{
    const {username,email,password}=createUserDto

    const foundUser=await this.userModel.findOne({where:{email}})

    if(foundUser){
      throw new UnauthorizedException("User alredy exsist")
    }

 
const hash = await bcrypt.hash(password, 10);
const randomNumber=+Array.from({length:6},()=> Math.floor(Math.random()*10)).join("")

await this.transporter.sendMail({
  from:"xayrullamatyakubov2005@gmail.com",
  to:email,
  subject:"Test",
  text:`${randomNumber}`
})

const time=Date.now()+120000

await this.userModel.create(
  {
  username,email,password:hash,otp:randomNumber,otpTime:time
}
)

  return {message:"Registered"}
  }


  /////verifay
   async verifay (verifayDto:VerifayDto):Promise<{message:string}>{
    const {email,otp}=verifayDto

    const foundUser=await this.userModel.findOne({where:{email}})

    if(!foundUser){
      throw new UnauthorizedException("User not found")
    }
    const time =Date.now()
    if(+foundUser.dataValues.otpTime<time){
      throw new BadRequestException("Otp time expired")
    }

    if(+foundUser.dataValues.otp !== +otp){
      throw new BadRequestException("Wrong ottp")
    }
    
    await this.userModel.update({otp:null,otpTime:null,isVerifide:true},{where:{email}})

  return {message:"Verifayed"}
  }

///// login
async login(loginDto:LoginDto): Promise<{ access_token: string }> {
     const {email,password}=loginDto

    const foundUser=await this.userModel.findOne({where:{email}})

    if(!foundUser){
      throw new UnauthorizedException("User not found")
    }

    const decode=await bcrypt.compare(password,foundUser.dataValues.password)
    if(decode && foundUser.dataValues.isVerifide){
      const payload={sub:foundUser.dataValues.id,username:foundUser.dataValues.username}
       return {
      access_token: await this.jwtService.signAsync(payload),
    }
    }else{
      throw new BadRequestException("Inwaled password")
    }
   }
  }

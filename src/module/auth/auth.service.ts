import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entities';
import { CreateUserDto, LoginDto, VerifayDto } from './dto/create.auth.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from "nodemailer";
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  ///// register
  async register (createUserDto:CreateUserDto):Promise<{message:string}>{
    const {username,email,password}=createUserDto

    const foundUser=await this.userRepo.findOne({where:{email}})

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

const newUser= this.userRepo.create({
  username,email,password:hash,otp:randomNumber,otpTime:+time
})

await this.userRepo.save(newUser)
  return {message:"Registred"}
  }


  /////verifay
   async verifay (verifayDto:VerifayDto):Promise<{message:string}>{
    const {email,otp}=verifayDto

    const foundUser=await this.userRepo.findOne({where:{email}})

    if(!foundUser){
      throw new UnauthorizedException("User not found")
    }
    const time =Date.now()
    if(+foundUser.otpTime<time){
      throw new BadRequestException("Otp time expired")
    }

    if(+foundUser.otp !== +otp){
      throw new BadRequestException("Wrong ottp")
    }
    
    await this.userRepo.update(foundUser.id ,{ otp: 0, otpTime: 0, isVerified: true }   
);


  return {message:"Verifayed"}
  }

///// login
async login(loginDto:LoginDto): Promise<{ access_token: string }> {
     const {email,password}=loginDto

    const foundUser=await this.userRepo.findOne({where:{email}})

    if(!foundUser){
      throw new UnauthorizedException("User not found")
    }

    const decode=await bcrypt.compare(password,foundUser.dataValues.password)
    if(decode && foundUser.dataValues.isVerifide){
      const payload={sub:foundUser.id,username:foundUser.username, role:foundUser.role}
       return {
      access_token: await this.jwtService.signAsync(payload),
    }
    }else{
      throw new BadRequestException("Inwaled password")
    }
   }

   async deleteUser(id:number){
    const foundUser=await this.userRepo.findOne({where:{id}})

    if(!foundUser){
      throw new UnauthorizedException("User not found")
    }

    await this.userRepo.delete({id})

    return true

   }

  }

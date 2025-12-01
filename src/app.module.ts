import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ProductModule } from './module/product/product.module';
import { AuthGuard } from './common/guards/auth.guard';



@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:".env",isGlobal:true}),
   TypeOrmModule.forRoot({
    type:"postgres",
    username:"postgres",
    port:5432,
    password:String(process.env.DB_PASSWORD as string),
    database:String(process.env.DB_DATABASE as string),
    synchronize:true,
    autoLoadEntities:true,
    logging:["error","warn","info"]
   }),
   AuthModule,
   ProductModule
  ],
  controllers: [],
  providers: [ {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      
    },
  
  ],
})
export class AppModule {}

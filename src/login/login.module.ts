import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.strategy';
import { PrismaService } from 'src/database/database.service';

@Module({
  imports: [JwtModule.register({ secret: 'todo123' })],
  controllers: [LoginController],
  providers: [LoginService, JwtStategy, PrismaService],
})
export class LoginModule { }

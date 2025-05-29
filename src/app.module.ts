import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/database.service';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [LoginModule, ProductModule, BookingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

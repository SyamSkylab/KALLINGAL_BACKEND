import { Module } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { RazorpayController } from './razorpay.controller';
import { PrismaService } from 'src/database/database.service';

@Module({
  controllers: [RazorpayController],
  providers: [RazorpayService, PrismaService],
})
export class RazorpayModule { }

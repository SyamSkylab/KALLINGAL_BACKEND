import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { Request, Response } from 'express';

@Controller('razorpay')
export class RazorpayController {
  constructor(private readonly razorpayService: RazorpayService) {

  }
  @Post('create')
  async createPayment(@Body() { amount, bookingDetails }: { amount: number, bookingDetails: any }) {
    const order = await this.razorpayService.createOrder(amount, bookingDetails, 'rcpt_' + Date.now());
    return {
      orderId: order.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    };
  }

  @Post('webhook')
  handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-razorpay-signature') razorpaySignature: string,
  ) {
    return this.razorpayService.handleWebhook(req, res, razorpaySignature)
  }
}

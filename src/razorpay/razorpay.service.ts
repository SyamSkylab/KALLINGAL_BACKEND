import { HttpStatus, Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { PrismaService } from 'src/database/database.service';
@Injectable()
export class RazorpayService {
    private razorpay: Razorpay
    constructor(private readonly prismaService: PrismaService) { this.razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET }) }
    async createOrder(amount: number, bookingDetails: any, receipt: string) {
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt,
            payment_capture: 1,
            notes: bookingDetails,
        }
        return this.razorpay.orders.create(options)
    }



    async handleWebhook(
        req: Request,
        res: Response,
        razorpaySignature: string,
    ) {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const body = JSON.stringify(req.body);

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpaySignature) {
            return res.status(HttpStatus.BAD_REQUEST).send('Invalid signature');
        }

        // ✅ Signature verified
        const event = req.body.event;
        const paymentEntity = req.body.payload.payment.entity;

        if (event === 'payment.captured') {
            const { order_id, id: payment_id, status, email, contact } = paymentEntity;

            // TODO: update your order in DB
            console.log('✅ Payment Captured:', {
                order_id,
                payment_id,
                status,
                email,
                contact,
            });
            await this.prismaService.payment.create({ data: { order_id, payment_id, status, email, contact: contact } })
        }

        return res.status(HttpStatus.OK).send('Webhook received');
    }
}

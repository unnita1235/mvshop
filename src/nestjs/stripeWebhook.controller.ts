import {
  Controller,
  Post,
  Req,
  Res,
  HttpStatus,
  Headers,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

const stripeSecret = process.env.STRIPE_SECRET!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(stripeSecret, { apiVersion: '2020-08-27' });

const processedEvents = new Set<string>(); // Simple in-memory idempotency store for demo; use DB in prod

@Controller('stripe')
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string
  ) {
    const buf = await this.getRawBody(req);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    } catch (err) {
      this.logger.warn(`Webhook signature verification failed: ${(err as Error).message}`);
      return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${(err as Error).message}`);
    }

    if (processedEvents.has(event.id)) {
      this.logger.log(`Duplicate event received: ${event.id}`);
      return res.status(HttpStatus.OK).send();
    }

    try {
      switch (event.type) {
        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          // Fulfill order here: update DB, send confirmation, etc.
          this.logger.log(`PaymentIntent succeeded: ${paymentIntent.id}`);
          processedEvents.add(event.id);
          break;
        }
        default:
          this.logger.log(`Unhandled event type: ${event.type}`);
      }

      return res.status(HttpStatus.OK).send();
    } catch (error) {
      this.logger.error(`Error processing webhook event: ${(error as Error).message}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  private getRawBody(req: Request): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on('data', (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', (err) => reject(err));
    });
  }
}

import { Request, Response } from 'express';
import User from '../models/user.model';
import Stripe from 'stripe';
import { sendPremiumConfirmationEmail } from '../services/email.services';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const user = req.user as any;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Life Time Subscription',
            },
            unit_amount: 0, // 0.00 for testing purposes, change to 9999 for $99.99
          },
          quantity: 1,
        },
      ],
      customer_email: user.email,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      client_reference_id: user._id.toString(), // Pass the user ID to the session
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    if (userId) {
      const user = await User.findByIdAndUpdate(
        userId,
        { isPremium: true },
        { new: true }
      );
      if (user && user.email) {
        await sendPremiumConfirmationEmail(user.email, user.displayName);
      }
    }
  }

  res.json({ received: true });
};

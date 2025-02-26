// routes/stripe.route.js
import express from 'express';
import { createCheckoutSession, handleStripeWebhook } from '../controllers/stripe.controller.js';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();

// Route for creating a checkout session
router.post('/create-checkout-session', ClerkExpressWithAuth(), createCheckoutSession);

// Webhook route to handle Stripe events
// This route doesn't need authentication because it's called by Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
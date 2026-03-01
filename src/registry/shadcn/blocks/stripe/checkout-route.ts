import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { checkoutSchema, pricingPlans } from '@/lib/native-bits/pricing';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    })
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY environment variable.' },
      { status: 500 }
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid checkout payload.' }, { status: 400 });
  }

  const plan = pricingPlans[parsed.data.plan];
  if (!plan.priceId) {
    return NextResponse.json(
      { error: `Missing Stripe price id for ${plan.id}.` },
      { status: 500 }
    );
  }

  const origin = request.headers.get('origin');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin ?? 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?canceled=true`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe returned an empty checkout URL.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: 'Stripe checkout session creation failed.' },
      { status: 500 }
    );
  }
}

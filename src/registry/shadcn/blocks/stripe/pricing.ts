import { z } from 'zod';

export const pricingPlanSchema = z.enum(['monthly', 'lifetime']);
export type PricingPlanId = z.infer<typeof pricingPlanSchema>;

export const checkoutSchema = z.object({
  plan: pricingPlanSchema,
});

type StripeCheckoutMode = 'payment' | 'subscription';

interface PricingPlan {
  id: PricingPlanId;
  title: string;
  description: string;
  amount: string;
  interval: string;
  mode: StripeCheckoutMode;
  priceId: string;
  cta: string;
  highlighted?: boolean;
  features: string[];
}

export const pricingPlans: Record<PricingPlanId, PricingPlan> = {
  monthly: {
    id: 'monthly',
    title: 'Monthly',
    description: 'Always get new components and motion packs.',
    amount: '$24',
    interval: '/month',
    mode: 'subscription',
    priceId: process.env.STRIPE_PRICE_MONTHLY ?? '',
    cta: 'Start subscription',
    features: [
      'All premium component drops',
      'Unlimited project usage',
      'Priority issue support',
      'Cancel anytime',
    ],
  },
  lifetime: {
    id: 'lifetime',
    title: 'All-Access',
    description: 'One payment. Lifetime updates and all future releases.',
    amount: '$249',
    interval: 'one-time',
    mode: 'payment',
    priceId: process.env.STRIPE_PRICE_LIFETIME ?? '',
    cta: 'Get lifetime access',
    highlighted: true,
    features: [
      'Everything in monthly',
      'Lifetime updates',
      'Commercial license',
      'Private founder roadmap',
    ],
  },
};

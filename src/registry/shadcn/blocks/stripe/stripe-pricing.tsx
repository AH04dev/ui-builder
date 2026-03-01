'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pricingPlans, PricingPlanId } from '@/lib/native-bits/pricing';
import { cn } from '@/lib/utils';

type CheckoutResponse = { url?: string; error?: string };

export function StripePricing() {
  const [pendingPlan, setPendingPlan] = useState<PricingPlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plans = useMemo(
    () => [pricingPlans.monthly, pricingPlans.lifetime],
    []
  );

  const startCheckout = async (plan: PricingPlanId) => {
    setPendingPlan(plan);
    setError(null);

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const payload = (await response.json()) as CheckoutResponse;
      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? 'Unable to create Stripe checkout session.');
      }

      window.location.assign(payload.url);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Checkout request failed.'
      );
      setPendingPlan(null);
    }
  };

  return (
    <section className="rounded-3xl border border-sky-100/80 bg-gradient-to-b from-sky-50/80 via-white to-cyan-50/70 p-5 md:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="border border-sky-200 bg-sky-100 text-sky-700">
          Stripe ready
        </Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Sell monthly or lifetime access
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
          This block ships with a ready-to-edit Stripe Checkout route for subscriptions and
          one-time purchases.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <Card
              className={cn(
                'h-full border-slate-200/80 bg-white/90 shadow-sm',
                plan.highlighted && 'border-sky-200 bg-sky-50/80'
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900">{plan.title}</CardTitle>
                  {plan.highlighted ? (
                    <Badge className="border border-sky-200 bg-sky-100 text-sky-700">
                      Popular
                    </Badge>
                  ) : null}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-end gap-1">
                  <p className="text-4xl font-semibold tracking-tight text-slate-900">
                    {plan.amount}
                  </p>
                  <p className="pb-1 text-sm text-slate-500">{plan.interval}</p>
                </div>

                <Separator className="my-5" />

                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sky-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  onClick={() => startCheckout(plan.id)}
                  disabled={pendingPlan !== null}
                  className="mt-6 w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600"
                >
                  {pendingPlan === plan.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </section>
  );
}

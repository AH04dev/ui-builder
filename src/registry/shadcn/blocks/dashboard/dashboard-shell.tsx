'use client';

import { motion } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck, Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MetricCard } from '@/components/native-bits/metric-card';

const channels = [
  { name: 'Organic', value: 42 },
  { name: 'Paid', value: 31 },
  { name: 'Referral', value: 18 },
  { name: 'Email', value: 9 },
];

export function DashboardShell() {
  return (
    <section className="rounded-3xl border border-sky-100/80 bg-gradient-to-b from-sky-50/80 via-white to-cyan-50/70 p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge className="border border-sky-200 bg-sky-100 text-sky-700">Mobile analytics</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Weekly dashboard
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            A polished starter for React + Next.js products using shadcn/ui primitives and
            Framer Motion micro-interactions.
          </p>
        </div>

        <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600">
          View reports
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <MetricCard label="Weekly active users" value="184,320" delta="+12.3%" icon={<Activity className="h-4 w-4" />} tone="sky" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <MetricCard label="Crash-free sessions" value="99.94%" delta="+0.2%" icon={<ShieldCheck className="h-4 w-4" />} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <MetricCard label="Avg frame time" value="16.2ms" delta="-4.1%" icon={<Timer className="h-4 w-4" />} />
        </motion.div>
      </div>

      <Card className="mt-5 border-slate-200/80 bg-white/90">
        <CardHeader>
          <CardTitle className="text-slate-900">Traffic mix</CardTitle>
          <CardDescription>Channel contribution across mobile funnels.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="this-week">
            <TabsList className="mb-4">
              <TabsTrigger value="this-week">This week</TabsTrigger>
              <TabsTrigger value="last-week">Last week</TabsTrigger>
            </TabsList>

            <TabsContent value="this-week" className="space-y-4">
              {channels.map((channel) => (
                <div key={channel.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{channel.name}</span>
                    <span className="text-slate-500">{channel.value}%</span>
                  </div>
                  <Progress
                    value={channel.value}
                    className="h-2 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-sky-500 [&>div]:to-cyan-500"
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="last-week" className="text-sm text-slate-500">
              Swap this tab with your own historical analytics data.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

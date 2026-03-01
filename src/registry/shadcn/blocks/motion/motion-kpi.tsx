'use client';

import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MotionKpiProps {
  label: string;
  value: number;
  suffix?: string;
  duration?: number;
}

export function MotionKpi({
  label,
  value,
  suffix,
  duration = 1,
}: MotionKpiProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(() => Math.round(motionValue.get()).toLocaleString());

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    });
    return () => controls.stop();
  }, [duration, motionValue, value]);

  return (
    <Card className="border-sky-100/80 bg-gradient-to-br from-white via-sky-50/80 to-cyan-50/70 shadow-sm">
      <CardHeader className="pb-2">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3">
          <motion.p className="text-4xl font-semibold tracking-tight text-slate-900">
            {rounded}
          </motion.p>
          {suffix ? (
            <Badge className="mb-1 border border-sky-200 bg-sky-100/80 text-sky-700">
              {suffix}
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

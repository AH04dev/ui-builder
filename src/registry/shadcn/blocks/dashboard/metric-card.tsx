import { ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  icon?: ReactNode;
  tone?: 'default' | 'sky';
}

export function MetricCard({
  label,
  value,
  delta,
  icon,
  tone = 'default',
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        'border-slate-200/70 bg-white/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70',
        tone === 'sky' && 'border-sky-200/80 bg-sky-50/80'
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
          <CardTitle className="mt-2 text-3xl font-semibold text-slate-900">
            {value}
          </CardTitle>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 p-2 text-sky-600">
          {icon ?? <TrendingUp className="h-4 w-4" />}
        </div>
      </CardHeader>
      <CardContent>
        <Badge
          variant="secondary"
          className="border border-sky-200 bg-sky-100/70 text-sky-700"
        >
          {delta}
        </Badge>
      </CardContent>
    </Card>
  );
}

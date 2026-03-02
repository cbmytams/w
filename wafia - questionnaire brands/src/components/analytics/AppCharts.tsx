import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';


interface TrendWaveProps {
    data: Record<string, unknown>[];
    dataKey: string;
    color: string;
}

export function TrendWave({ data, dataKey, color }: TrendWaveProps) {
    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 10 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717a', fontSize: 10 }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#a1a1aa' }}
                    />
                    <Area
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#gradient-${dataKey})`}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    tooltip?: string;
    helpText?: string;
}

export function MetricCard({ title, value, change, icon: Icon, tooltip, helpText }: MetricCardProps) {
    const isPositive = change.startsWith('+');
    return (
        <div className="bg-[#0f0f12] border border-white/5 p-5 rounded-xl flex flex-col justify-between h-full relative overflow-hidden group">
            {/* Help Icon with Tooltip */}
            {tooltip && (
                <div className="absolute top-3 right-3 z-10 group/help">
                    <div className="w-5 h-5 rounded-full bg-zinc-800/80 text-zinc-500 hover:text-white hover:bg-zinc-700 flex items-center justify-center text-[10px] font-bold cursor-help transition-all">
                        ?
                    </div>
                    <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-zinc-900 border border-white/10 rounded-lg text-xs text-zinc-400 opacity-0 invisible group-hover/help:opacity-100 group-hover/help:visible transition-all shadow-xl z-50">
                        <div className="font-semibold text-white mb-1">{tooltip}</div>
                        {helpText && <div className="text-[11px] text-zinc-500 mt-2">{helpText}</div>}
                    </div>
                </div>
            )}

            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-12 h-12 text-white" />
            </div>
            <div>
                <div className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">{title}</div>
                <div className="text-3xl font-mono font-medium text-white">{value}</div>
            </div>
            <div className={`text-xs font-mono mt-3 px-2 py-1 rounded w-fit ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {change} depuis le mois dernier
            </div>
        </div>
    );
}

import { motion } from 'framer-motion';

interface FunnelStage {
    id: string;
    label: string;
    value: number;
    color: string;
}

interface Funnel3DProps {
    stages: FunnelStage[];
}

const formatPercent = (value: number) => `${Math.round(value)}%`;

export function Funnel3D({ stages }: Funnel3DProps) {
    const maxValue = Math.max(...stages.map(stage => stage.value), 1);
    const firstValue = stages[0]?.value || 1;

    return (
        <div className="flex flex-col gap-5 funnel-3d">
            {stages.map((stage, index) => {
                const ratio = stage.value / maxValue;
                const pctOfTop = stage.value / firstValue * 100;
                const prevValue = index > 0 ? stages[index - 1].value : firstValue;
                const pctOfPrev = prevValue ? (stage.value / prevValue) * 100 : 100;

                return (
                    <div key={stage.id} className="flex items-center gap-4">
                        <div className="w-24 text-xs uppercase tracking-widest text-zinc-400 font-mono">
                            {stage.label}
                        </div>
                        <div className="flex-1">
                            <motion.div
                                className="relative h-10 rounded-xl overflow-hidden funnel-3d-item"
                                style={{
                                    background: `linear-gradient(120deg, ${stage.color}, rgba(255,255,255,0.15))`,
                                    boxShadow: `0 12px 30px -18px ${stage.color}`
                                }}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: `${Math.max(ratio * 100, 12)}%`, opacity: 1 }}
                                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                            </motion.div>
                        </div>
                        <div className="w-28 text-right text-xs font-mono text-zinc-300">
                            <div className="font-bold text-white">{stage.value}</div>
                            <div className="text-[10px] text-zinc-500">
                                {formatPercent(pctOfTop)} total • {formatPercent(pctOfPrev)} prev
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

import { useState, useMemo, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONSOLE_URL } from '../config/site';
import { GPU_FLEET, type GpuNode } from '../data/gpuData';
import { calculateCost } from '../utils/pricing';
import { useLanguage } from '../context/LanguageContext';

export interface PricingEstimatorProps {
  selectedGpuId?: string;
  onGpuChange?: (gpuId: string) => void;
  showSpotToggle?: boolean;
}

export function PricingEstimator({
  selectedGpuId,
  onGpuChange,
  showSpotToggle = false,
}: PricingEstimatorProps) {
  const { t, language } = useLanguage();
  const [selectedGpu, setSelectedGpu] = useState<GpuNode>(() => {
    const match = GPU_FLEET.find((g) => g.id === selectedGpuId);
    return match ?? GPU_FLEET[0]!;
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [hours, setHours] = useState<number>(24);
  const [isSpot, setIsSpot] = useState<boolean>(false);

  // Sync if external selectedGpuId changes
  useEffect(() => {
    if (selectedGpuId) {
      const match = GPU_FLEET.find((g) => g.id === selectedGpuId);
      if (match) setSelectedGpu(match);
    }
  }, [selectedGpuId]);

  const handleGpuSelect = (gpu: GpuNode) => {
    setSelectedGpu(gpu);
    onGpuChange?.(gpu.id);
  };

  // Safe boundary clamping
  const safeQuantity = Number.isNaN(quantity) || quantity < 1 ? 1 : Math.min(8, Math.floor(quantity));
  const safeHours = Number.isNaN(hours) || hours < 1 ? 1 : Math.min(720, Math.floor(hours));

  const pricing = useMemo(() => {
    return calculateCost({
      gpu: selectedGpu,
      quantity: safeQuantity,
      hours: safeHours,
      isSpot,
    });
  }, [selectedGpu, safeQuantity, safeHours, isSpot]);

  return (
    <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          <span className="apple-gradient-text">{t.pricing.titleDynamic}</span>{' '}
          <span className="apple-accent-gradient-text">{t.pricing.titleEstimator}</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">{t.pricing.subtitle}</p>
      </div>

      <div className="apple-glass-card rounded-3xl p-6 sm:p-10 border border-white/10 max-w-4xl mx-auto">
        {/* GPU Model Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t.pricing.selectGpu}
            </label>
            <span className="text-[11px] text-zinc-500 font-medium">
              {language === 'zh' ? '优先展示消费级，支持全系列扩展' : 'Consumer Fleet Prioritized'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 max-h-80 overflow-y-auto pr-1">
            {GPU_FLEET.map((gpu) => {
              const isSelected = gpu.id === selectedGpu.id;
              const rate = isSpot ? gpu.spotPriceHourly : gpu.onDemandPriceHourly;
              return (
                <button
                  key={gpu.id}
                  type="button"
                  onClick={() => handleGpuSelect(gpu)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                    isSelected
                      ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-md shadow-brand-cyan/20 font-semibold'
                      : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <div className="font-semibold truncate">{gpu.shortName ?? gpu.name.replace('NVIDIA ', '')}</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">¥{rate.toFixed(2)}/h</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders Grid: Quantity & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Quantity Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="gpu-quantity" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {t.pricing.gpuInstances}
              </label>
              <span className="text-sm font-mono font-bold text-brand-cyan px-2.5 py-0.5 rounded-md bg-brand-cyan/10 border border-brand-cyan/25">
                {safeQuantity} {language === 'zh' ? '卡' : safeQuantity === 1 ? 'Node' : 'Nodes'}
              </span>
            </div>
            <input
              id="gpu-quantity"
              aria-label="GPU Quantity"
              type="range"
              min="1"
              max="8"
              step="1"
              value={safeQuantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>1 {language === 'zh' ? '卡' : 'Node'}</span>
              <span>2 {language === 'zh' ? '卡' : 'Nodes'}</span>
              <span>4 {language === 'zh' ? '卡' : 'Nodes'}</span>
              <span>8 {language === 'zh' ? '卡' : 'Nodes'}</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="instance-duration" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {t.pricing.duration}
              </label>
              <span className="text-sm font-mono font-bold text-brand-violet px-2.5 py-0.5 rounded-md bg-brand-violet/10 border border-brand-violet/25">
                {safeHours} {language === 'zh' ? '小时' : 'Hours'}{' '}
                {safeHours >= 24 && `(${Math.round(safeHours / 24)}${language === 'zh' ? '天' : 'd'})`}
              </span>
            </div>
            <input
              id="instance-duration"
              aria-label="Instance Duration"
              type="range"
              min="1"
              max="720"
              step="1"
              value={safeHours}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-violet"
            />
            {/* Quick Presets */}
            <div className="flex gap-2 mt-2">
              {[
                { label: language === 'zh' ? '1小时' : '1h', value: 1 },
                { label: language === 'zh' ? '24小时 (1天)' : '24h (1d)', value: 24 },
                { label: language === 'zh' ? '168小时 (1周)' : '168h (1w)', value: 168 },
                { label: language === 'zh' ? '720小时 (1月)' : '720h (1m)', value: 720 },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setHours(p.value)}
                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                    safeHours === p.value
                      ? 'bg-brand-violet/20 border-brand-violet text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spot Toggle Bar (Optional) */}
        {showSpotToggle && (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 mb-8">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                role="switch"
                aria-label="Spot Instance"
                aria-checked={isSpot}
                onClick={() => setIsSpot(!isSpot)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-emerald/50 ${
                  isSpot ? 'bg-brand-emerald' : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`bg-zinc-950 w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    isSpot ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <div>
                <span className="text-sm font-semibold text-white">
                  {isSpot ? t.pricing.spotDiscount : t.pricing.onDemandGuaranteed}
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-emerald/15 text-brand-emerald border border-brand-emerald/30">
                  {language === 'zh' ? '最高立省 45%' : 'Save 30-45%'}
                </span>
              </div>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              {language === 'zh' ? '支持 Checkpoint 容错任务' : 'Checkpoint-tolerant fault-resilient workloads'}
            </span>
          </div>
        )}

        {/* Live Calculation Output Card */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs text-zinc-400">{t.pricing.summary}</div>
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              ¥{pricing.totalCost.toFixed(2)}
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              ¥{pricing.effectiveHourlyRateTotal.toFixed(2)}/{language === 'zh' ? '小时 (共)' : 'hr total'} (¥{pricing.hourlyRatePerGpu.toFixed(2)}/{language === 'zh' ? '小时/单卡' : 'hr per GPU'})
            </div>
            {isSpot && pricing.savingsVsOnDemand > 0 && (
              <div className="text-xs font-semibold text-brand-emerald font-mono">
                {language === 'zh'
                  ? `相比按需实例立省 ¥${pricing.savingsVsOnDemand.toFixed(2)}！`
                  : `You save ¥${pricing.savingsVsOnDemand.toFixed(2)} vs On-Demand!`}
              </div>
            )}
          </div>

          <a
            href={CONSOLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Launch with Estimated Specs"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-base font-semibold bg-brand-cyan text-zinc-950 hover:bg-cyan-300 transition-all shadow-xl shadow-brand-cyan/25 hover:shadow-brand-cyan/40"
          >
            <span>{t.pricing.launchWithConfig}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Pricing Disclaimer */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          {t.pricing.disclaimer}
        </p>
      </div>
    </section>
  );
}

export default PricingEstimator;

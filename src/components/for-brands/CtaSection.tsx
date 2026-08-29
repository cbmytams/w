"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealAnimation } from "@/components/common/RevealAnimation";

type CtaSectionProps = {
  estimateHref?: string;
};

export function CtaSection({
  estimateHref = "/contact/brands",
}: CtaSectionProps) {
  return (
    <section className="py-24 md:py-32 px-4">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <RevealAnimation>
            <h2 className="text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white mb-8">
              Votre prochaine campagne{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                mérite mieux.
              </span>
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={0.2}>
            <p className="text-2xl text-slate-600 dark:text-slate-400 mb-12">
              Parlons de vos objectifs. On vous montre exactement comment on les
              atteint.
            </p>
          </RevealAnimation>

          <RevealAnimation delay={0.4}>
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                asChild
                className="h-16 px-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xl font-semibold shadow-2xl shadow-orange-500/25"
              >
                <a href={estimateHref}>Réserver un appel stratégique</a>
              </Button>
            </div>
          </RevealAnimation>
        </div>
      </Container>
    </section>
  );
}

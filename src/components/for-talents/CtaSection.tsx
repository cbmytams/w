"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OrbLink } from "@/components/navigation/OrbLink";
import { TALENT_CTA } from "@/constants";
export function CtaSection() {
  const ctaHref = "/contact/talents";

  return (
    <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 relative z-10">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-10 shadow-xl dark:border-white/10 sm:p-14"
          >
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {TALENT_CTA.title}
              </h2>

              {TALENT_CTA.description && (
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  {TALENT_CTA.description}
                </p>
              )}

              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-white px-8 text-base font-semibold text-slate-950 hover:bg-slate-200"
              >
                <OrbLink href={ctaHref}>
                  {TALENT_CTA.ctaText} <ArrowRight className="h-5 w-5" />
                </OrbLink>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

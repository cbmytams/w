import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  X,
  Check,
  ArrowRight,
  Sparkles,
  User,
  Camera,
  Zap,
  Music,
  Tv,
  Palette,
  Mail,
  Smartphone,
  Link as LinkIcon,
  Instagram,
  Linkedin,
  Clapperboard,
  Twitter,
  Ghost,
  Globe,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../utils/cn";
import { upsertLocalLead } from "../lib/localLeads";

interface TalentAcquisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TalentDomain =
  | "music"
  | "model"
  | "acting"
  | "influence"
  | "art"
  | "other";
type SocialNetwork =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "linkedin"
  | "twitter"
  | "snapchat"
  | "portfolio"
  | "other";

interface FormData {
  domains: TalentDomain[];
  firstName: string;
  lastName: string;
  city: string;
  hasAgency: boolean;
  agencyName: string;
  socials: {
    instagram: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    twitter: string;
    snapchat: string;
    portfolio: string;
    otherName: string;
    otherHandle: string;
  };
  email: string;
  phone: string;
}

const DOMAINS: { id: TalentDomain; label: string; icon: LucideIcon }[] = [
  { id: "music", label: "Musique", icon: Music },
  { id: "model", label: "Mannequinat", icon: Camera },
  { id: "acting", label: "Acting / Théâtre", icon: Clapperboard },
  { id: "influence", label: "Influence / Content", icon: Zap },
  { id: "art", label: "Art / Performance", icon: Palette },
  { id: "other", label: "Autre", icon: User },
];

const SOCIALS: {
  id: SocialNetwork;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  isLink?: boolean;
}[] = [
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "pseudo",
  },
  { id: "tiktok", label: "TikTok", icon: Zap, placeholder: "pseudo" },
  { id: "youtube", label: "YouTube", icon: Tv, placeholder: "chaîne" },
  { id: "snapchat", label: "Snapchat", icon: Ghost, placeholder: "pseudo" },
  { id: "twitter", label: "X / Twitter", icon: Twitter, placeholder: "pseudo" },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "pseudo/url",
    isLink: true,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: LinkIcon,
    placeholder: "https://...",
    isLink: true,
  },
];

export function TalentAcquisitionModal({
  isOpen,
  onClose,
}: TalentAcquisitionModalProps) {
  type Step = 1 | 2 | 3 | 4 | 5 | 6;
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSocials, setActiveSocials] = useState<SocialNetwork[]>([
    "instagram",
  ]); // Default
  const [showOtherSocial, setShowOtherSocial] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    domains: [],
    firstName: "",
    lastName: "",
    city: "",
    hasAgency: false,
    agencyName: "",
    socials: {
      instagram: "",
      tiktok: "",
      youtube: "",
      linkedin: "",
      twitter: "",
      snapchat: "",
      portfolio: "",
      otherName: "",
      otherHandle: "",
    },
    email: "",
    phone: "",
  });

  // Escape key handler for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step < 6) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, step]);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 6) as Step);
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  const toggleDomain = (id: TalentDomain) => {
    setFormData((prev) => ({
      ...prev,
      domains: prev.domains.includes(id)
        ? prev.domains.filter((d) => d !== id)
        : [...prev.domains, id],
    }));
  };

  const toggleSocialVisibility = (id: SocialNetwork) => {
    setActiveSocials((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (network: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [network]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const sessionId =
        typeof window !== "undefined"
          ? localStorage.getItem("wafia_session_id")
          : null;
      const leadId = sessionId || `talent_${Date.now()}`;

      upsertLocalLead({
        id: leadId,
        session_id: sessionId || undefined,
        name: "Anonymous",
        email: "",
        answers: {
          talent_domains: formData.domains.join(", "),
          talent_city: formData.city,
          talent_has_agency: formData.hasAgency ? "yes" : "no",
          talent_agency_name: formData.agencyName,
          talent_channel_count: activeSocials.length,
        },
      });
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("Failed to store local talent lead", err);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(6);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.5 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-[var(--bg-elevated)] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col max-h-[90vh]"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]" />

            <div className="flex items-center justify-between p-6 pb-0 z-20">
              {step > 1 && step < 6 ? (
                <button
                  onClick={handleBack}
                  className="text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-wider"
                >
                  Retour
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {/* STEP 1: HOOK */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center text-center space-y-6 h-full justify-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] flex items-center justify-center shadow-lg shadow-[var(--heat-end)]/20 mb-2">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                      The Wafia{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)]">
                        Roster
                      </span>
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      Nous connectons les talents (Musique, Mode, Acting,
                      Influence) aux marques et projets les plus ambitieux.
                      <br className="hidden md:block" />
                      Rejoins le listing privé.
                    </p>
                    <button
                      onClick={handleNext}
                      className="w-full btn-gradient py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group mt-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--heat-start), var(--heat-end))",
                      }}
                    >
                      Commencer
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: DOMAINS */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left">
                      <span className="text-xs font-mono text-[var(--heat-start)] uppercase tracking-widest">
                        Étape 1/5
                      </span>
                      <h2 className="text-2xl font-bold mt-2">
                        Quel est ton terrain de jeu ?
                      </h2>
                      <p className="text-zinc-500 text-sm">
                        Sélectionne tes domaines d'activité (Choix multiples).
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {DOMAINS.map((domain) => (
                        <button
                          key={domain.id}
                          onClick={() => toggleDomain(domain.id)}
                          className={cn(
                            "p-4 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-3 aspect-square group",
                            formData.domains.includes(domain.id)
                              ? "bg-[var(--heat-start)]/10 border-[var(--heat-start)]"
                              : "bg-white/5 border-white/5 hover:border-white/20"
                          )}
                        >
                          <domain.icon
                            className={cn(
                              "w-8 h-8 transition-colors",
                              formData.domains.includes(domain.id)
                                ? "text-[var(--heat-start)]"
                                : "text-zinc-400 group-hover:text-white"
                            )}
                          />
                          <span
                            className={cn(
                              "font-bold text-sm text-center",
                              formData.domains.includes(domain.id)
                                ? "text-white"
                                : "text-zinc-300 group-hover:text-white"
                            )}
                          >
                            {domain.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={formData.domains.length === 0}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors mt-4"
                    >
                      Suivant
                    </button>
                  </motion.div>
                )}

                {/* STEP 3: IDENTITY */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left">
                      <span className="text-xs font-mono text-[var(--heat-start)] uppercase tracking-widest">
                        Étape 2/5
                      </span>
                      <h2 className="text-2xl font-bold mt-2">Qui es-tu ?</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-zinc-400">
                            Prénom
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] outline-none"
                            placeholder="Sasha"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-zinc-400">
                            Nom
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] outline-none"
                            placeholder="V."
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-400">
                          Ville de résidence
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] outline-none"
                          placeholder="Paris, France"
                        />
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-sm font-bold text-white mb-4">
                          Représentation
                        </h3>
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => updateField("hasAgency", false)}
                            className={cn(
                              "w-full p-3 rounded-lg border text-left flex items-center justify-between",
                              !formData.hasAgency
                                ? "bg-white/10 border-white"
                                : "border-white/10 text-zinc-500 hover:text-zinc-300"
                            )}
                          >
                            <span>Je suis indépendant / Freelance</span>
                            {!formData.hasAgency && (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => updateField("hasAgency", true)}
                            className={cn(
                              "w-full p-3 rounded-lg border text-left flex items-center justify-between",
                              formData.hasAgency
                                ? "bg-white/10 border-white"
                                : "border-white/10 text-zinc-500 hover:text-zinc-300"
                            )}
                          >
                            <span>J'ai une agence / Agent</span>
                            {formData.hasAgency && (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {formData.hasAgency && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4"
                          >
                            <label className="text-sm font-semibold text-zinc-400">
                              Nom de l'agence / Agent
                            </label>
                            <input
                              type="text"
                              value={formData.agencyName}
                              onChange={(e) =>
                                updateField("agencyName", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] outline-none mt-2"
                              placeholder="Elite, Universal, etc."
                            />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!formData.firstName || !formData.lastName}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors mt-6"
                    >
                      Suivant
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: SOCIALS (REFACTORED) */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left">
                      <span className="text-xs font-mono text-[var(--heat-start)] uppercase tracking-widest">
                        Étape 3/5
                      </span>
                      <h2 className="text-2xl font-bold mt-2">
                        Ta présence digitale
                      </h2>
                      <p className="text-zinc-500 text-sm">
                        Clique sur les icônes pour ajouter tes réseaux.
                      </p>
                    </div>

                    {/* SOCIAL SELECTOR GRID */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {SOCIALS.map((social) => (
                        <button
                          key={social.id}
                          onClick={() => toggleSocialVisibility(social.id)}
                          className={cn(
                            "p-3 rounded-full border transition-all flex items-center justify-center",
                            activeSocials.includes(social.id)
                              ? "bg-[var(--heat-start)] border-[var(--heat-start)] text-white shadow-[0_0_15px_-5px_var(--heat-start)]"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                          )}
                          title={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </button>
                      ))}
                      <button
                        onClick={() => setShowOtherSocial(!showOtherSocial)}
                        className={cn(
                          "p-3 rounded-full border transition-all flex items-center justify-center",
                          showOtherSocial
                            ? "bg-white border-white text-black"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
                        )}
                        title="Autre"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* ACTIVE INPUTS LIST */}
                    <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                      <AnimatePresence>
                        {/* Standard Inputs */}
                        {activeSocials.map((socialId) => {
                          const social = SOCIALS.find((s) => s.id === socialId);

                          // Safety check to prevent crashes if icon or data is missing
                          if (!social || !social.icon) return null;

                          const IconComponent = social.icon;

                          return (
                            <motion.div
                              key={socialId}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-2">
                                <label className="text-sm font-semibold text-zinc-400 flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-[var(--heat-start)]" />{" "}
                                  {social.label}
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={
                                      formData.socials[
                                        socialId as keyof typeof formData.socials
                                      ]
                                    }
                                    onChange={(e) =>
                                      updateSocial(socialId, e.target.value)
                                    }
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white focus:border-[var(--heat-start)] outline-none placeholder-white/20"
                                    placeholder={social.placeholder}
                                  />
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                    {social.isLink ? (
                                      <Globe className="w-4 h-4" />
                                    ) : (
                                      "@"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}

                        {/* "Autre" Custom Input */}
                        {showOtherSocial && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 pt-2 border-t border-white/10"
                          >
                            <label className="text-sm font-semibold text-white flex items-center gap-2">
                              <Plus className="w-4 h-4" /> Autre Réseau
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={formData.socials.otherName}
                                onChange={(e) =>
                                  updateSocial("otherName", e.target.value)
                                }
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] outline-none placeholder-zinc-500"
                                placeholder="Nom (ex: Twitch)"
                              />
                              <div className="relative">
                                <input
                                  type="text"
                                  value={formData.socials.otherHandle}
                                  onChange={(e) =>
                                    updateSocial("otherHandle", e.target.value)
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-8 text-white focus:border-[var(--heat-start)] outline-none placeholder-zinc-500"
                                  placeholder="pseudo"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                                  @
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={handleNext}
                      className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black hover:bg-zinc-200 transition-colors mt-6"
                    >
                      Suivant
                    </button>
                  </motion.div>
                )}

                {/* STEP 5: CONTACT */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center md:text-left">
                      <span className="text-xs font-mono text-[var(--heat-start)] uppercase tracking-widest">
                        Étape 4/5
                      </span>
                      <h2 className="text-2xl font-bold mt-2">
                        On reste en contact
                      </h2>
                      <p className="text-zinc-500 text-sm">
                        Pour t'envoyer les opportunités et la Newsletter
                        Insider.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="talent@exemple.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pl-12 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--heat-start)]"
                          />
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-300">
                          Numéro de téléphone
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                            placeholder="+33 6 ..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pl-12 text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--heat-start)]"
                          />
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 mt-4">
                        <div className="mt-1 min-w-[20px]">
                          <div className="w-5 h-5 rounded border border-zinc-600 bg-[var(--heat-start)] flex items-center justify-center">
                            <Check
                              className="w-3 h-3 text-white"
                              strokeWidth={4}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Inscription à la Newsletter et référencement
                          commercial chez Wafia. Nous vous contacterons
                          uniquement si l'un de nos clients est intéressé par
                          votre profil.
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={
                          !formData.email || !formData.phone || isSubmitting
                        }
                        className="w-full btn-gradient py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--heat-start), var(--heat-end))",
                        }}
                      >
                        {isSubmitting ? (
                          <span className="animate-pulse">Validation...</span>
                        ) : (
                          <>
                            <span className="mr-2">Valider mon profil</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STEP 6: SUCCESS */}
                {step === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center justify-center space-y-8 h-full py-12"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[var(--heat-end)] blur-xl opacity-20 rounded-full" />
                      <div className="relative w-24 h-24 bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] rounded-full flex items-center justify-center text-5xl">
                        💎
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black text-white">
                        Profil Enregistré.
                      </h2>
                      <p className="text-zinc-400 text-lg leading-relaxed max-w-xs mx-auto">
                        Ton dossier a été transmis à l'équipe Casting. Surveille
                        tes mails pour le premier{" "}
                        <span className="text-white font-bold">Insider</span>.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                      Retour au Dashboard
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

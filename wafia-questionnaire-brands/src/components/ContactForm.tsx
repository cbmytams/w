/**
 * WAFIA BRAND DIAGNOSTIC - CONTACT RAPIDE
 * Formulaire de recontact simplifié (pas de diagnostic)
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, CheckCircle } from "lucide-react";

interface ContactFormProps {
  onBack: () => void;
}

const SERVICE_OPTIONS = [
  { value: "strategy", label: "Stratégie de marque" },
  { value: "content", label: "Production de contenu" },
  { value: "ads", label: "Publicité & Acquisition" },
  { value: "consulting", label: "Conseil personnalisé" },
  { value: "other", label: "Autre" },
];

export function ContactForm({ onBack }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    need: "",
  });

  const isValid = form.name.trim() && form.email.trim() && form.company.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full min-h-0 flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--heat-start)]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--heat-end)]/10 blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-full max-w-lg"
          >
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            {/* Header */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Être recontacté
            </h2>
            <p className="text-sm text-zinc-400 mb-8">
              Laissez-nous vos coordonnées, on vous rappelle sous 24h.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1.5"
                >
                  Nom & prénom{" "}
                  <span className="text-[var(--heat-start)]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Marie Dupont"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-[var(--heat-start)] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1.5"
                >
                  Email professionnel{" "}
                  <span className="text-[var(--heat-start)]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="nom@entreprise.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-[var(--heat-start)] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone + Company (side by side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1.5"
                  >
                    Téléphone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="06 XX XX XX XX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-[var(--heat-start)] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1.5"
                  >
                    Entreprise{" "}
                    <span className="text-[var(--heat-start)]">*</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme Corp"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-[var(--heat-start)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Need Dropdown */}
              <div>
                <label
                  htmlFor="contact-need"
                  className="block text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1.5"
                >
                  De quoi avez-vous besoin ?
                </label>
                <select
                  id="contact-need"
                  value={form.need}
                  onChange={(e) => update("need", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--heat-start)] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900">
                    Sélectionner…
                  </option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-zinc-900"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!isValid}
                whileHover={isValid ? { scale: 1.02 } : {}}
                whileTap={isValid ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 mt-6 ${
                  isValid
                    ? "bg-gradient-to-r from-[var(--heat-start)] to-[var(--heat-end)] text-white shadow-[0_0_30px_-8px_rgba(249,115,22,0.5)] hover:shadow-[0_0_50px_-8px_rgba(249,115,22,0.7)]"
                    : "bg-white/5 text-zinc-600 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
                Envoyer
              </motion.button>
            </form>

            <p className="text-[11px] text-zinc-600 text-center mt-4">
              En soumettant ce formulaire, vous acceptez d&apos;être recontacté
              par Wafia.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative z-10 text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--heat-start)] to-[var(--heat-end)] flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Merci {form.name.split(" ")[0]} !
            </h2>
            <p className="text-zinc-400 mb-8">
              Nous avons bien reçu votre demande. Notre équipe vous recontacte
              sous 24h.
            </p>

            <button
              onClick={onBack}
              className="px-8 py-3 rounded-full border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium transition-all"
            >
              Retour à l&apos;accueil
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

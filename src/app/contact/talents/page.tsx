import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Talents | Wafia",
  description: "Parlez-nous de votre carrière. Réponse sous 24h.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactTalentsPage() {
  return <ContactForm variant="talents" />;
}

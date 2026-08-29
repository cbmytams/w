import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Marques | Wafia",
  description: "Parlez-nous de votre campagne créateurs. Réponse sous 24h.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactBrandsPage() {
  return <ContactForm variant="brands" />;
}

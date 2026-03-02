import type { Metadata } from "next";
import { ContactFormPanel } from "@/components/contact/ContactFormPanel";

type ContactSearchParams = Promise<{
  type?: string;
  objective?: string;
  action?: string;
}>;

const objectiveLabels: Record<string, string> = {
  awareness: "Notoriété",
  conversion: "Conversion",
  retention: "Fidélisation"
};

function sanitizeType(value: string | undefined) {
  if (value === "agency") return "agency";
  return "brand";
}

export const metadata: Metadata = {
  title: "Contact | Wafia",
  description: "Parlez à l'équipe Wafia pour lancer votre projet influence, studio ou acquisition.",
  openGraph: {
    title: "Contact | Wafia",
    description: "Parlez à l'équipe Wafia pour lancer votre projet influence, studio ou acquisition."
  },
  twitter: {
    card: "summary",
    title: "Contact | Wafia",
    description: "Parlez à l'équipe Wafia pour lancer votre projet influence, studio ou acquisition."
  }
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: ContactSearchParams;
}) {
  const params = await searchParams;
  const contactType = sanitizeType(params.type);
  const objective = params.objective ? objectiveLabels[params.objective] : null;

  return <ContactFormPanel contactType={contactType} objective={objective} />;
}

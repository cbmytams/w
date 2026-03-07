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

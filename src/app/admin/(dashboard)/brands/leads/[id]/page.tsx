import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, CheckCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

type BrandDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BrandDetailPage({
  params,
}: BrandDetailPageProps) {
  const { id } = await params;

  const talent = await prisma.talent.findUnique({
    where: { id },
    include: {
      contacts: { take: 1, orderBy: { createdAt: "desc" } },
      questionnaireResponses: {
        take: 5,
        orderBy: { submittedAt: "desc" },
        where: { type: "BRANDS" },
      },
    },
  });

  if (!talent) notFound();

  const contact = talent.contacts[0];
  const latestResponse = talent.questionnaireResponses[0];

  // Try to extract company info from latest response
  const answersData =
    (latestResponse?.answersJson as Record<string, unknown>) || {};
  const companyName = (answersData["ql_company"] as string) || talent.name;
  const contactName = (answersData["ql_name"] as string) || "";
  const email = (answersData["ql_email"] as string) || contact?.email || "";
  const phone = (answersData["ql_phone"] as string) || contact?.phone || "";
  const website = (answersData["ql_website"] as string) || "";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link
        href="/admin/brands/leads"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm font-medium backdrop-blur-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux Marques
      </Link>

      {/* Header */}
      <div className="surface-card p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-xl font-bold">
              {companyName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{companyName}</h1>
              {contactName && (
                <p className="text-sm text-muted">{contactName}</p>
              )}
              <p className="text-xs text-soft mt-1">
                Créé le {talent.createdAt.toLocaleDateString("fr-FR")} • ID:{" "}
                {talent.id.slice(0, 8)}…
              </p>
            </div>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              talent.approvalStatus === "APPROVED"
                ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                : talent.approvalStatus === "REJECTED"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                  : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
            }`}
          >
            {talent.approvalStatus === "APPROVED"
              ? "Approuvé"
              : talent.approvalStatus === "REJECTED"
                ? "Rejeté"
                : "En attente"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact */}
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">
            Contact
          </h2>
          <div className="space-y-3 text-sm">
            {email ? (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:underline truncate"
                >
                  {email}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="italic">Pas d'email</span>
              </div>
            )}
            {phone ? (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted shrink-0" />
                <span>{phone}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="italic">Pas de téléphone</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 text-muted shrink-0 text-center text-xs">
                  🌐
                </span>
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-questionnaire-primary hover:underline truncate"
                >
                  {website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Info from questionnaire */}
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">
            Informations clés
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
              <span className="text-muted">Statut</span>
              <span className="font-medium">{talent.status}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-black/5 dark:border-white/5">
              <span className="text-muted">Date d'inscription</span>
              <span className="font-medium">
                {talent.createdAt.toLocaleDateString("fr-FR")}
              </span>
            </div>
            {latestResponse && (
              <div className="flex justify-between py-1">
                <span className="text-muted">Complétion questionnaire</span>
                <span className="font-semibold">
                  {Math.round(latestResponse.completionRate)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Questionnaire responses */}
      <div className="surface-card p-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">
          Réponses au Questionnaire
        </h2>
        {talent.questionnaireResponses.length > 0 ? (
          <div className="space-y-3">
            {talent.questionnaireResponses.map(
              (response: (typeof talent.questionnaireResponses)[number]) => (
                <Link
                  key={response.id}
                  href={`/admin/brands/questionnaires/${response.id}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition group"
                >
                  <div className="flex items-center gap-3">
                    {response.completionRate >= 100 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-orange-500" />
                    )}
                    <div>
                      <div className="text-sm font-medium group-hover:underline">
                        Projet Marque
                      </div>
                      <div className="text-xs text-muted">
                        Soumis le{" "}
                        {response.submittedAt.toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">
                      {Math.round(response.completionRate)}%
                    </span>
                    <span className="text-xs text-muted">→</span>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-muted italic py-4 text-center">
            Aucune réponse au questionnaire
          </p>
        )}
      </div>
    </div>
  );
}

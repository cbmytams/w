import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, User, CheckCircle, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

type TalentDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TalentDetailPage({ params }: TalentDetailPageProps) {
  const { id } = await params;

  const talent = await prisma.talent.findUnique({
    where: { id },
    include: {
      contacts: { take: 1, orderBy: { createdAt: 'desc' } },
      questionnaireResponses: {
        take: 5,
        orderBy: { submittedAt: 'desc' },
        where: { type: 'TALENTS' }
      },
      platformAccounts: true,
      rateCards: { take: 1, orderBy: { createdAt: 'desc' } }
    }
  });

  if (!talent) notFound();

  const contact = talent.contacts[0];
  const rateCard = talent.rateCards[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link
        href="/admin/talents/leads"
        className="inline-flex items-center gap-2 text-xs font-medium text-soft hover:text-black dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux Talents
      </Link>

      {/* Header */}
      <div className="surface-card p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-xl font-bold">
              {talent.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{talent.name}</h1>
              <p className="text-sm text-muted mt-1">
                Créé le {talent.createdAt.toLocaleDateString('fr-FR')} • ID: {talent.id.slice(0, 8)}…
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold border ${talent.approvalStatus === 'APPROVED'
                ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                : talent.approvalStatus === 'REJECTED'
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                  : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20'
              }`}>
              {talent.approvalStatus === 'APPROVED' ? 'Approuvé' : talent.approvalStatus === 'REJECTED' ? 'Rejeté' : 'En attente'}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold border ${talent.status === 'ACTIVE'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                : 'bg-black/5 dark:bg-white/5 text-muted border-black/10 dark:border-white/10'
              }`}>
              {talent.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact info */}
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">Contact</h2>
          <div className="space-y-3 text-sm">
            {contact?.email ? (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-black dark:text-white hover:underline truncate">{contact.email}</a>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="italic">Pas d'email</span>
              </div>
            )}
            {contact?.phone ? (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted shrink-0" />
                <span>{contact.phone}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="italic">Pas de téléphone</span>
              </div>
            )}
            {contact?.agentName && (
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted shrink-0" />
                <span>Agent : {contact.agentName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Platforms */}
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">Plateformes</h2>
          {talent.platformAccounts.length > 0 ? (
            <div className="space-y-3 text-sm">
              {talent.platformAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between">
                  <span className="font-medium">{account.platform} @{account.handle}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${account.syncStatus === 'OK' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                    {account.syncStatus}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted italic">Aucune plateforme liée</p>
          )}
        </div>

        {/* Tarification */}
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">Tarification</h2>
          {rateCard ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Fourchette</span>
                <span className="font-semibold">
                  {rateCard.priceMin ?? '—'}€ – {rateCard.priceMax ?? '—'}€
                </span>
              </div>
              {rateCard.priceNotes && (
                <p className="text-muted text-xs mt-2">{rateCard.priceNotes}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted italic">Pas de grille tarifaire</p>
          )}
        </div>
      </div>

      {/* Questionnaire responses */}
      <div className="surface-card p-6">
        <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">Réponses au Questionnaire</h2>
        {talent.questionnaireResponses.length > 0 ? (
          <div className="space-y-3">
            {talent.questionnaireResponses.map((response) => (
              <Link
                key={response.id}
                href={`/admin/talents/questionnaires/${response.id}`}
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
                      Diagnostic Talents
                    </div>
                    <div className="text-xs text-muted">
                      Soumis le {response.submittedAt.toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{Math.round(response.completionRate)}%</span>
                  <span className="text-xs text-muted">→</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted italic py-4 text-center">Aucune réponse au questionnaire</p>
        )}
      </div>

      {/* Internal notes */}
      {talent.notesInternal && (
        <div className="surface-card p-6">
          <h2 className="text-xs uppercase tracking-[0.3em] text-soft mb-4">Notes internes</h2>
          <p className="text-sm whitespace-pre-wrap">{talent.notesInternal}</p>
        </div>
      )}
    </div>
  );
}

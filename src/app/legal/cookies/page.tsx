import type { Metadata } from "next"
import { siteConfig, sitePaths } from "@/lib/site"
import { LegalContainer, LegalHeader, LegalSection } from "@/components/legal/LegalComponents"

export const metadata: Metadata = {
    title: "Politique des cookies",
    description: "Informations détaillées sur les cookies utilisés par Wafia, leur finalité, leur durée de conservation et vos droits en matière de consentement (RGPD/CNIL).",
    alternates: {
        canonical: sitePaths.legalCookies,
    },
    openGraph: {
        title: "Politique des cookies | Wafia",
        description: "Informations détaillées sur les cookies utilisés par Wafia, leur finalité, leur durée de conservation et vos droits en matière de consentement (RGPD/CNIL).",
        url: sitePaths.legalCookies,
        siteName: siteConfig.name,
        type: "article",
    },
}

export default function CookiesPolicy() {
    return (
        <LegalContainer>
            <LegalHeader
                title="Politique des Cookies"
                subtitle="Nous utilisons les cookies avec parcimonie, uniquement pour le bon fonctionnement du site et la mesure d'audience anonyme, dans le respect du RGPD et des recommandations de la CNIL."
                date="17 Mars 2026"
            />

            <LegalSection title="Qu'est-ce qu'un cookie ?">
                <p>
                    Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet au site de mémoriser des informations sur votre navigation, comme vos préférences ou votre identifiant de session.
                </p>
                <p>
                    Les cookies peuvent être déposés directement par le site visité (<strong>cookies first-party</strong>) ou par des services tiers intégrés à la page (<strong>cookies third-party</strong>). Conformément à l&apos;article 82 de la loi Informatique et Libertés et au RGPD, certains cookies nécessitent votre consentement préalable.
                </p>
            </LegalSection>

            <LegalSection title="Cookies que nous utilisons">
                <p>
                    Le tableau ci-dessous recense l&apos;ensemble des cookies susceptibles d&apos;être déposés lors de votre visite sur <strong>wafia.fr</strong>.
                </p>
                <div className="overflow-x-auto mt-6">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-black/10 dark:border-white/10">
                                <th className="text-left py-3 pr-4 font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Nom</th>
                                <th className="text-left py-3 pr-4 font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Finalité</th>
                                <th className="text-left py-3 pr-4 font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Durée</th>
                                <th className="text-left py-3 pr-4 font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Type</th>
                                <th className="text-left py-3 font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Tiers</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            <tr>
                                <td className="py-4 pr-4 font-mono text-xs text-purple-600 dark:text-purple-400 align-top whitespace-nowrap">
                                    wafia_cookie_consent
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Mémorise votre choix de consentement aux cookies afin de ne pas redemander à chaque visite.
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top whitespace-nowrap">
                                    1 an
                                </td>
                                <td className="py-4 pr-4 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                        Fonctionnel
                                    </span>
                                </td>
                                <td className="py-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Non
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 pr-4 font-mono text-xs text-purple-600 dark:text-purple-400 align-top whitespace-nowrap">
                                    _ga, _ga_*
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Mesure d&apos;audience anonyme via Google Analytics. Permet de distinguer les sessions et de produire des statistiques agrégées sur l&apos;utilisation du site.
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top whitespace-nowrap">
                                    2 ans
                                </td>
                                <td className="py-4 pr-4 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                        Analytique
                                    </span>
                                </td>
                                <td className="py-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Google LLC
                                </td>
                            </tr>
                            <tr>
                                <td className="py-4 pr-4 font-mono text-xs text-purple-600 dark:text-purple-400 align-top whitespace-nowrap">
                                    _gid
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Distinction des utilisateurs au sein d&apos;une même journée (Google Analytics).
                                </td>
                                <td className="py-4 pr-4 text-slate-600 dark:text-slate-300/80 align-top whitespace-nowrap">
                                    24 heures
                                </td>
                                <td className="py-4 pr-4 align-top">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                        Analytique
                                    </span>
                                </td>
                                <td className="py-4 text-slate-600 dark:text-slate-300/80 align-top">
                                    Google LLC
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                    Les cookies analytiques ne sont déposés qu&apos;avec votre consentement explicite. En l&apos;absence de consentement, aucun cookie analytique n&apos;est activé.
                </p>
            </LegalSection>

            <LegalSection title="Cookies tiers">
                <p>
                    Nous utilisons <strong>Google Analytics</strong> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis) pour mesurer l&apos;audience de notre site de façon anonyme. Ce service peut déposer des cookies sur votre terminal lorsque vous avez consenti à leur utilisation.
                </p>
                <p>
                    Le transfert de données vers les États-Unis est encadré par les <strong>Clauses Contractuelles Types (SCC)</strong> de la Commission Européenne, conformément à l&apos;article 46 du RGPD. Google Analytics est configuré avec l&apos;anonymisation des adresses IP activée : aucune adresse IP complète n&apos;est transmise à Google.
                </p>
                <p>
                    Pour en savoir plus sur la façon dont Google traite vos données, vous pouvez consulter la{" "}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                    >
                        politique de confidentialité de Google
                    </a>
                    {" "}ainsi que la page{" "}
                    <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                    >
                        d&apos;opt-out Google Analytics
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection title="Vos droits et choix">
                <p>
                    Conformément à la réglementation RGPD et aux recommandations de la CNIL, vous disposez des droits et moyens suivants pour gérer vos préférences cookies :
                </p>

                <div className="space-y-6 mt-2">
                    <div className="pl-4 border-l-2 border-purple-500/30">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Bannière de consentement</h3>
                        <p>
                            Lors de votre première visite sur wafia.fr, une bannière vous invite à accepter ou refuser les cookies analytiques. Votre choix est enregistré localement et respecté pour toutes vos visites ultérieures.
                        </p>
                    </div>

                    <div className="pl-4 border-l-2 border-purple-500/30">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Modifier ou retirer votre consentement</h3>
                        <p>
                            Vous pouvez retirer votre consentement à tout moment. Pour réinitialiser vos préférences, il vous suffit de vider le <strong>localStorage</strong> de votre navigateur pour le domaine wafia.fr (via les outils développeur, rubrique &laquo;&nbsp;Application&nbsp;&raquo; &gt; &laquo;&nbsp;Local Storage&nbsp;&raquo;). La bannière réapparaîtra à votre prochaine visite.
                        </p>
                    </div>

                    <div className="pl-4 border-l-2 border-purple-500/30">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Configuration de votre navigateur</h3>
                        <p>
                            Vous pouvez paramétrer votre navigateur pour bloquer ou supprimer les cookies à tout moment. Voici les liens vers les instructions des principaux navigateurs :
                        </p>
                        <ul className="mt-3 space-y-1.5 text-base list-none">
                            <li>
                                <a
                                    href="https://support.google.com/chrome/answer/95647"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                                >
                                    Google Chrome
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                                >
                                    Mozilla Firefox
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                                >
                                    Safari
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                                >
                                    Microsoft Edge
                                </a>
                            </li>
                        </ul>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Attention : le blocage de certains cookies peut affecter le bon fonctionnement du site.
                        </p>
                    </div>

                    <div className="pl-4 border-l-2 border-purple-500/30">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Nous contacter</h3>
                        <p>
                            Pour toute question relative à notre utilisation des cookies ou pour exercer vos droits (accès, rectification, effacement, opposition), vous pouvez nous écrire à :{" "}
                            <a
                                href="mailto:contact@wafia.fr"
                                className="text-purple-600 dark:text-purple-400 underline underline-offset-4 hover:text-purple-800 dark:hover:text-purple-200 transition-colors"
                            >
                                contact@wafia.fr
                            </a>
                        </p>
                    </div>
                </div>
            </LegalSection>
        </LegalContainer>
    )
}

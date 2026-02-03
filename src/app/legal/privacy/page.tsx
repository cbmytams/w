import { Container } from "@/components/ui/container"

export default function PrivacyPolicy() {
    return (
        <div className="py-24 bg-white">
            <Container className="prose prose-slate max-w-3xl mx-auto">
                <h1>Politique de Confidentialité</h1>
                <p>Dernière mise à jour : [Date]</p>

                <h2>1. Collecte des données</h2>
                <p>
                    Nous collectons les données que vous nous transmettez via nos formulaires de contact et de candidature (nom, email, téléphone, réseaux sociaux).
                </p>

                <h2>2. Utilisation des données</h2>
                <p>
                    Ces données sont utilisées uniquement pour :
                    <ul>
                        <li>Répondre à vos demandes de contact.</li>
                        <li>Traiter vos candidatures talents.</li>
                        <li>Vous envoyer des newsletters si vous y avez consenti.</li>
                    </ul>
                </p>

                <h2>3. Vos droits</h2>
                <p>
                    Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à privacy@wafia.agency.
                </p>
            </Container>
        </div>
    )
}

import { Container } from "@/components/ui/container"

export default function CookiesPolicy() {
    return (
        <div className="py-24 bg-white">
            <Container className="prose prose-slate max-w-3xl mx-auto">
                <h1>Politique des Cookies</h1>
                <p>
                    Ce site utilise des cookies pour améliorer votre expérience et mesurer l&apos;audience (via Google Analytics / Plausible).
                </p>
                <p>
                    Vous pouvez configurer votre navigateur pour refuser les cookies.
                </p>
            </Container>
        </div>
    )
}

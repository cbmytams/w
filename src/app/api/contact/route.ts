import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

const requestBuckets = new Map<string, { count: number; resetAt: number }>()

interface ContactRequestBody {
    name?: string
    email?: string
    company?: string
    message?: string
    type?: "agency" | "brand"
    objective?: string | null
}

function normalizeField(value: unknown) {
    return typeof value === "string" ? value.trim() : ""
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getClientKey(request: NextRequest) {
    const forwardedFor = request.headers.get("x-forwarded-for")
    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "unknown"
    }
    return request.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(clientKey: string) {
    const now = Date.now()
    const current = requestBuckets.get(clientKey)

    if (!current || current.resetAt <= now) {
        requestBuckets.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
        return true
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
        return false
    }

    current.count += 1
    requestBuckets.set(clientKey, current)
    return true
}

async function forwardToWebhook(payload: Record<string, unknown>) {
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    if (!webhookUrl) {
        throw new Error("CONTACT_WEBHOOK_URL is not configured")
    }

    const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(process.env.CONTACT_WEBHOOK_TOKEN
                ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
                : {}),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    })

    if (!webhookResponse.ok) {
        throw new Error(`Webhook error (${webhookResponse.status})`)
    }
}

export async function POST(request: NextRequest) {
    const clientKey = getClientKey(request)
    if (!checkRateLimit(clientKey)) {
        return NextResponse.json(
            { error: "Trop de tentatives. Merci de patienter une minute avant de recommencer." },
            { status: 429 }
        )
    }

    let body: ContactRequestBody
    try {
        body = (await request.json()) as ContactRequestBody
    } catch {
        return NextResponse.json({ error: "Payload invalide." }, { status: 400 })
    }

    const name = normalizeField(body.name)
    const email = normalizeField(body.email)
    const company = normalizeField(body.company)
    const message = normalizeField(body.message)
    const type = body.type === "agency" ? "agency" : "brand"
    const objective = typeof body.objective === "string" ? body.objective.trim() : null

    if (!name || !email || !company || !message) {
        return NextResponse.json({ error: "Tous les champs sont obligatoires." }, { status: 400 })
    }

    if (name.length < 2 || name.length > 80) {
        return NextResponse.json({ error: "Le nom doit contenir entre 2 et 80 caractères." }, { status: 400 })
    }

    if (!isValidEmail(email) || email.length > 160) {
        return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 })
    }

    if (company.length > 120) {
        return NextResponse.json({ error: "Le nom de société est trop long." }, { status: 400 })
    }

    if (message.length < 20 || message.length > 3000) {
        return NextResponse.json({ error: "Le message doit contenir entre 20 et 3000 caractères." }, { status: 400 })
    }

    const payload = {
        name,
        email,
        company,
        message,
        type,
        objective,
        createdAt: new Date().toISOString(),
        source: "wafia-website-contact",
    }

    try {
        await forwardToWebhook(payload)
    } catch (error) {
        console.error("[contact-api] forwarding failed", error)
        return NextResponse.json(
            { error: "Le service de contact est temporairement indisponible. Merci de réessayer." },
            { status: 502 }
        )
    }

    return NextResponse.json({ ok: true })
}

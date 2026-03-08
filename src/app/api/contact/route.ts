import { NextRequest, NextResponse } from "next/server"
import { ContactFormSchema } from "@/lib/validations"
import { validateBody, apiError } from "@/lib/api-response"

export const runtime = "nodejs"

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

const requestBuckets = new Map<string, { count: number; resetAt: number }>()

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

    const body = await request.json().catch(() => null)
    if (!body) return apiError("Payload invalide.")

    const validation = validateBody(ContactFormSchema, body)
    if (!validation.success) return validation.response

    const { name, email, company, message, type, objective } = validation.data

    const payload = {
        name,
        email,
        company,
        message,
        type,
        objective: objective ?? null,
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

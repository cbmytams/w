import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  return apiSuccess({
    status: "ok",
    version: process.env.npm_package_version ?? "unknown",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}

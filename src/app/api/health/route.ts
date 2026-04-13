import { apiSuccess } from "@/lib/api-response";

export async function GET() {
  return apiSuccess({
    timestamp: new Date().toISOString(),
  });
}

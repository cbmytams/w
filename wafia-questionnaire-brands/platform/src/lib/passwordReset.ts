import { createHash, randomBytes } from "crypto";
import { prisma } from "./db";

type PasswordResetClient = Pick<typeof prisma, "passwordResetToken">;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("base64url");
}

function makeToken() {
  return randomBytes(32).toString("base64url");
}

export async function createPasswordResetToken(
  userId: string,
  ttlHours = 24,
  client: PasswordResetClient = prisma
) {
  const token = makeToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await client.passwordResetToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt
    }
  });

  return { token, expiresAt };
}

export async function consumePasswordResetToken(token: string) {
  const tokenHash = hashToken(token);
  const now = new Date();

  const row = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: {
      user: {
        select: {
          id: true,
          tenantId: true,
          email: true
        }
      }
    }
  });

  if (!row) return null;
  if (row.usedAt) return null;
  if (row.expiresAt <= now) return null;

  await prisma.passwordResetToken.update({
    where: { id: row.id },
    data: { usedAt: now }
  });

  return {
    userId: row.userId,
    tenantId: row.user.tenantId,
    email: row.user.email
  };
}

type LockoutStateInput = {
  nowMs: number;
  lastFailedLoginAt: Date | null;
  failedLoginCount: number;
  windowMs: number;
  lockoutAttempts: number;
  lockoutDurationMs: number;
};

type LockoutStateOutput = {
  failedLoginCount: number;
  lockedUntil: Date | null;
};

export function computeLoginFailureState(
  input: LockoutStateInput
): LockoutStateOutput {
  const insideWindow = Boolean(
    input.lastFailedLoginAt &&
    input.nowMs - input.lastFailedLoginAt.getTime() <= input.windowMs
  );
  const previousCount = insideWindow ? input.failedLoginCount : 0;
  const nextCount = previousCount + 1;

  if (nextCount >= input.lockoutAttempts) {
    return {
      failedLoginCount: 0,
      lockedUntil: new Date(input.nowMs + input.lockoutDurationMs),
    };
  }

  return {
    failedLoginCount: nextCount,
    lockedUntil: null,
  };
}

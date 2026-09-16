"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function useReducedMotion() {
  const framerValue = useFramerReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // False until mount so server HTML and the hydration pass always match.
  // The real preference kicks in on the re-render right after mount.
  return mounted && framerValue;
}

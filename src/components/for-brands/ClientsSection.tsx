import Image from "next/image";
import { CornerRightDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import clsx from "clsx";
import { CLIENTS, type Client } from "@/constants/clients";
import styles from "./ClientsSection.module.css";
import motionStyles from "./ClientsSection.motion.module.css";

const LOGO_OPTICAL_CLASSES = {
  letterbox: styles.letterbox,
  squareMark: styles.squareMark,
} as const;

const CLIENT_ROW_SPLIT = Math.ceil(CLIENTS.length / 2);
const CLIENT_ROWS = [
  CLIENTS.slice(0, CLIENT_ROW_SPLIT),
  CLIENTS.slice(CLIENT_ROW_SPLIT),
] as const;

type LogoSequenceProps = {
  readonly clients: readonly Client[];
  readonly duplicate?: boolean;
};

function LogoSequence({ clients, duplicate = false }: LogoSequenceProps) {
  return (
    <div
      className={clsx(
        styles.logoSequence,
        duplicate && motionStyles.duplicateSequence
      )}
      aria-hidden={duplicate || undefined}
    >
      {clients.map((client) => (
        <div className={styles.logoFrame} key={client.name}>
          <Image
            src={client.logoLight}
            alt={duplicate ? "" : client.name}
            className={clsx(
              styles.logo,
              client.logoClass && LOGO_OPTICAL_CLASSES[client.logoClass]
            )}
            width={184}
            height={56}
            sizes="(max-width: 700px) 132px, 184px"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export async function ClientsSection() {
  const t = await getTranslations("clients");

  return (
    <section
      id="trusted-brands"
      className={styles.section}
      aria-labelledby="trusted-brands-title"
      data-nav-tone="light"
    >
      <header className={styles.header}>
        <div className={styles.trustSignal}>
          <h2 id="trusted-brands-title">{t("title")}</h2>
          <CornerRightDown
            className={styles.signalArrow}
            aria-hidden="true"
            size={31}
            strokeWidth={1.35}
          />
        </div>
      </header>

      <div
        className={clsx(styles.corridor, motionStyles.corridor)}
        aria-label={t("corridorAriaLabel")}
      >
        <div className={styles.logoRows}>
          {CLIENT_ROWS.map((clients, rowIndex) => (
            <div className={styles.logoRow} key={rowIndex}>
              <div
                className={clsx(
                  motionStyles.marqueeTrack,
                  rowIndex === 1 && motionStyles.reverseTrack
                )}
              >
                <LogoSequence clients={clients} />
                <LogoSequence clients={clients} duplicate />
              </div>
            </div>
          ))}
        </div>
        <div className={motionStyles.scanner} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}

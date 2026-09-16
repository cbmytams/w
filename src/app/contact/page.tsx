import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./contact-hub.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlons de vos objectifs de marque et de croissance.",
};

export default function ContactPage() {
  return (
    <main className={styles.section}>
      <div className={styles.top}>
        <Link href="/" aria-label="Wafia, accueil" className={styles.logo}>
          <Image
            src="/wafia.svg"
            alt="Wafia"
            width={104}
            height={34}
            priority
          />
        </Link>
        <Link href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" size={15} />
          Retour
        </Link>
      </div>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Contact</p>
        <h1 className={styles.title}>Parlons de votre projet.</h1>
        <p className={styles.intro}>
          Une campagne de marque ou un parcours de talent : choisissez votre
          entrée, nous revenons vers vous sous 24h.
        </p>
        <div className={styles.choices}>
          <Link href="/contact/brands" className={styles.primary}>
            Je suis une marque
          </Link>
          <Link href="/contact/talents" className={styles.secondary}>
            Je suis un talent
          </Link>
        </div>
      </div>
    </main>
  );
}

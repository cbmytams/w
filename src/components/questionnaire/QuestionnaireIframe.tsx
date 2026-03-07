"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";

function IframeRenderer({ type }: { type: "talents" | "brands" }) {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const basePath = type === "talents" ? "/questionnaire/#/" : "/questionnaire-brands/#/";
    const src = queryString ? `${basePath}?${queryString}` : basePath;

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [showAdmin, setShowAdmin] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            try {
                if (iframeRef.current && iframeRef.current.contentWindow) {
                    const hash = iframeRef.current.contentWindow.location.hash;
                    // If there's no hash, or it's exactly '#/' or '#', we are on the intro screen.
                    // Also account for query parameters like '#/?entry=site'
                    const hashPath = hash.split('?')[0];
                    const isMain = !hashPath || hashPath === '#/' || hashPath === '#';
                    setShowAdmin(isMain);
                }
            } catch (e) {
                // Cross-origin block (should not happen since it's same origin, but safe fallback)
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Top Right Floating Actions */}
            <div className="fixed top-6 right-6 z-[999999] flex items-center gap-3">
                <a
                    href={type === "talents" ? "/for-talents" : "/for-brands"}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm font-medium backdrop-blur-xl"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour au site
                </a>
                <div
                    className={`transition-all duration-500 ease-in-out ${showAdmin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                        }`}
                >
                    <a
                        href="/admin/login"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/70 hover:text-white text-sm font-medium backdrop-blur-xl"
                    >
                        <Shield className="w-4 h-4" />
                        Admin
                    </a>
                </div>
            </div>

            <iframe
                ref={iframeRef}
                src={src}
                className="fixed inset-0 w-screen h-screen z-[99999] bg-[#020202] border-none"
                title={`Questionnaire ${type === "talents" ? "Talents" : "Marques"} Wafia`}
                allow="camera; microphone; geolocation"
            />
        </>
    );
}

export function QuestionnaireIframe({ type }: { type: "talents" | "brands" }) {
    return (
        <Suspense fallback={<div className="fixed inset-0 w-screen h-screen z-[99999] bg-[#020202]" />}>
            <IframeRenderer type={type} />
        </Suspense>
    );
}

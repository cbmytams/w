"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface StudioVideoProps {
    src: string
    className?: string
}

export function StudioVideo({ src, className }: StudioVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    // React bug: the `muted` prop on <video> is not applied to the DOM attribute.
    // We must set it imperatively via the ref.
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted
        }
    }, [isMuted])

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(videoRef.current.muted)
        }
    }

    return (
        <div
            className={cn("relative overflow-hidden group/video", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                ref={videoRef}
                src={encodeURI(src)}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-105"
            />

            {/* Controls Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered || !isMuted ? 1 : 0 }}
                className="absolute bottom-4 right-4 z-10"
            >
                <button
                    onClick={toggleMute}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-lg"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </motion.div>

            {/* Cinematic Gradient Vignette at bottom for text readability if needed, though mostly visual here */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>
    )
}

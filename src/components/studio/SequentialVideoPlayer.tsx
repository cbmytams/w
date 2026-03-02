import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, ChevronRight, ChevronLeft, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface SequentialVideoPlayerProps {
    videos: string[]
    className?: string
}

export function SequentialVideoPlayer({ videos, className }: SequentialVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMuted, setIsMuted] = useState(false) // Try unmuted by default
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const total = videoRef.current.duration
            if (!isNaN(total)) {
                // Update progress only if we are playing
                setProgress((current / total) * 100)
            }
        }
    }

    const handleEnded = () => {
        setProgress(0)
        setIsPlaying(true)
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            // Loop back to start
            setCurrentIndex(0)
        }
    }

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(videoRef.current.muted)
        }
    }

    const nextVideo = (e: React.MouseEvent) => {
        e.stopPropagation()
        setProgress(0)
        setIsPlaying(true)
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const prevVideo = (e: React.MouseEvent) => {
        e.stopPropagation()
        setProgress(0)
        setIsPlaying(true)
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        } else {
            setCurrentIndex(videos.length - 1)
        }
    }

    if (!videos || videos.length === 0) return null

    return (
        <div className={cn("relative group/player overflow-hidden bg-black", className)}>
            {/* Main Video */}
            <AnimatePresence mode="wait">
                <motion.video
                    key={videos[currentIndex]}
                    ref={videoRef}
                    src={videos[currentIndex]}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                    muted={isMuted}
                    playsInline
                    autoPlay
                />
            </AnimatePresence>

            {/* Top Progress Bars (Story Style) */}
            <div className="absolute top-4 left-4 right-4 flex gap-2 z-20">
                {videos.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={{ width: idx < currentIndex ? "100%" : "0%" }}
                            animate={{
                                width: idx < currentIndex ? "100%" :
                                    idx === currentIndex ? `${progress}%` : "0%"
                            }}
                            transition={{ ease: "linear", duration: idx === currentIndex ? 0.1 : 0.3 }}
                        />
                    </div>
                ))}
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                    type="button"
                    onClick={prevVideo}
                    className="min-h-11 min-w-11 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white pointer-events-auto backdrop-blur-sm transition-colors flex items-center justify-center"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                {/* Center Play/Pause Indicator (Optional, maybe just on click) */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={nextVideo}
                    className="min-h-11 min-w-11 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white pointer-events-auto backdrop-blur-sm transition-colors flex items-center justify-center"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-4">
                <button
                    type="button"
                    onClick={toggleMute}
                    className="min-h-11 min-w-11 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all shadow-lg flex items-center justify-center"
                >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        </div>
    )
}

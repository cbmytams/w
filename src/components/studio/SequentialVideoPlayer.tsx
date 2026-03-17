import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, ChevronRight, ChevronLeft, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface SequentialVideoPlayerProps {
    videos: string[]
    className?: string
}

export function SequentialVideoPlayer({ videos, className }: SequentialVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const progressRefs = useRef<Array<HTMLDivElement | null>>([])
    const animationFrameRef = useRef<number | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMuted, setIsMuted] = useState(true) // MUST be true by default for browsers to allow autoplay
    const [isPlaying, setIsPlaying] = useState(false)

    // React bug: the `muted` prop on <video> is not applied to the DOM attribute.
    // We must set it imperatively via the ref.
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted
        }
    }, [isMuted])

    const stopProgressLoop = useCallback(() => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = null
        }
    }, [])

    const syncProgressBars = useCallback(() => {
        const video = videoRef.current
        const total = video?.duration ?? 0
        const ratio = total > 0 ? (video?.currentTime ?? 0) / total : 0

        progressRefs.current.forEach((node, index) => {
            if (!node) return

            const scale = index < currentIndex ? 1 : index === currentIndex ? ratio : 0
            node.style.transform = `scaleX(${scale})`
        })
    }, [currentIndex])

    const startProgressLoop = useCallback(() => {
        stopProgressLoop()

        const tick = () => {
            syncProgressBars()
            animationFrameRef.current = window.requestAnimationFrame(tick)
        }

        animationFrameRef.current = window.requestAnimationFrame(tick)
    }, [stopProgressLoop, syncProgressBars])

    const handleTimeUpdate = () => {
        if (animationFrameRef.current === null) {
            syncProgressBars()
        }
    }

    const handlePlay = () => {
        setIsPlaying(true)
        startProgressLoop()
    }

    const handlePause = () => {
        setIsPlaying(false)
        stopProgressLoop()
        syncProgressBars()
    }

    const handleLoadedMetadata = () => {
        syncProgressBars()

        if (videoRef.current && !videoRef.current.paused) {
            startProgressLoop()
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        syncProgressBars()
        // Re-apply muted when video element remounts (Framer Motion AnimatePresence)
        if (videoRef.current) {
            videoRef.current.muted = isMuted
        }
    }, [currentIndex, syncProgressBars, videos.length, isMuted])

    useEffect(() => {
        return () => {
            stopProgressLoop()
        }
    }, [stopProgressLoop])

    const playVideo = async () => {
        if (videoRef.current) {
            try {
                await videoRef.current.play()
            } catch {
                setIsPlaying(false)
            }
        }
    }

    const handleEnded = () => {
        syncProgressBars()
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
                void playVideo()
            }
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
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const prevVideo = (e: React.MouseEvent) => {
        e.stopPropagation()
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
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                    muted={isMuted}
                    playsInline
                    autoPlay
                    preload="metadata"
                />
            </AnimatePresence>

            {/* Top Progress Bars (Story Style) */}
            <div className="absolute top-4 left-4 right-4 flex gap-2 z-20">
                {videos.map((_, idx) => (
                    <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            ref={(node) => {
                                progressRefs.current[idx] = node
                            }}
                            className="h-full origin-left bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={false}
                            style={{ transform: idx < currentIndex ? "scaleX(1)" : "scaleX(0)" }}
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

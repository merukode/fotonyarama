"use client"

import { useState, useRef, useEffect } from "react"
import { Music, Pause, Play } from "lucide-react"

export default function VinylPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const tracks = [
        "/music/Glassy-sky.mp3",
        "/music/Alone.mp3"
    ]

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Mainkan / pause musik saat state berubah
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Kalau lagu selesai → otomatis lanjut ke berikutnya
    const handleEnded = () => {
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    // Ganti lagu saat currentTrack berubah
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
        }
    }, [currentTrack]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <>
            {/* Vinyl Player */}
            <div className="fixed bottom-6 right-6 md:top-8 md:right-8 z-40 md:z-40">
                <button
                    onClick={togglePlay}
                    className="relative w-14 h-14 md:w-24 md:h-24 group"
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {/* Vinyl Record */}
                    <div
                        className={`absolute inset-0 rounded-full border-4 border-black bg-black shadow-lg transition-transform ${isPlaying ? "animate-spin" : ""
                            }`}
                        style={{
                            animationDuration: isPlaying ? "3s" : "0s",
                            animationIterationCount: "infinite",
                            animationTimingFunction: "linear",
                        }}
                    >
                        {/* Vinyl grooves effect */}
                        <div className="absolute inset-2 rounded-full border-2 border-gray-800 opacity-50" />
                        <div className="absolute inset-4 rounded-full border border-gray-700 opacity-30" />

                        {/* Center label */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 border-black flex items-center justify-center">
                                <Music className="w-4 h-4 md:w-5 md:h-5 text-black" />
                            </div>
                        </div>
                    </div>

                    {/* Play/Pause Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40 rounded-full">
                        {isPlaying ? (
                            <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        ) : (
                            <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                        )}
                    </div>
                </button>
            </div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                autoPlay
                loop={false}
                onEnded={handleEnded}
                src={tracks[currentTrack]}
                crossOrigin="anonymous"
            />
        </>
    )
}

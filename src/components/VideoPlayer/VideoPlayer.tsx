import {useEffect, useRef, useState} from "react";
import PlayButton from "./PlayButton.tsx";
import MuteButton from "./MuteButton.tsx";

interface VideoPlayerProps {
    video: string | undefined
    className?: string
    buttonType?: 'play' | 'mute'
}

const VideoPlayer = ({video, className, buttonType = 'play'}:VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(buttonType === 'mute');
    const [isHovered, setIsHovered] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && buttonType === 'mute' && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Автовоспроизведение не удалось:", e));
            setIsPlaying(true);
        }
    }, [isInView, buttonType]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play().catch(e => console.log("Воспроизведение не удалось:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden flex items-center justify-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <video
                className="object-cover w-full h-full"
                ref={videoRef}
                preload="metadata"
                playsInline
                loop
                muted={isMuted}
                width="100%"
                height="100%"
            >
                <source src={video} type="video/mp4" />
            </video>

            {isInView && (
                <div className="absolute">
                    {buttonType === "play" && <PlayButton isHovered={isHovered} isPlaying={isPlaying} togglePlay={togglePlay}/>}
                    {buttonType === "mute" && <MuteButton isHovered={isHovered} isMuted={isMuted} toggleMute={toggleMute}/>}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
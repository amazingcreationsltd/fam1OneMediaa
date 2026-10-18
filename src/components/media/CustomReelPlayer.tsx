import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface CustomReelPlayerProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  tag: string;
  views: string;
  meta: string;
  metric: string;
}

export const CustomReelPlayer: React.FC<CustomReelPlayerProps> = ({
  videoSrc,
  posterSrc,
  title,
  tag,
  views,
  meta,
  metric,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Always muted by default

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolume = () => setIsMuted(video.muted);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolume);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolume);
    };
  }, []);

  return (
    <div className="p-5 sm:p-6 flex flex-col justify-between hover:bg-white/[0.02] transition-colors h-full">
      {/* Top Header Row */}
      <div className="flex items-center justify-between font-tech text-xs mb-3 uppercase tracking-wider font-semibold">
        <span className="text-[#FACC15]">{tag}</span>
        <span className="text-neutral-400">{views}</span>
      </div>

      {/* Centered Scaled-Down 9:16 Video Container (max-w-[260px] to keep it compact and architectural) */}
      <div className="w-full flex justify-center my-auto py-2">
        <div
          onClick={togglePlay}
          className="relative overflow-hidden w-full max-w-[240px] sm:max-w-[260px] aspect-[9/16] bg-black border border-white/15 group cursor-pointer select-none"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            loop
            playsInline
            muted={true}
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

          {/* Top Controls: Icon-only Mute button positioned top right (removed PAUSED/PLAYING tag) */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <button
              type="button"
              onClick={toggleMute}
              className="w-8 h-8 bg-black/70 backdrop-blur-[6px] hover:bg-[#FACC15] hover:text-black text-white border border-white/20 transition-colors flex items-center justify-center cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#FACC15] hover:text-black transition-colors" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#10B981] hover:text-black transition-colors" />
              )}
            </button>
          </div>

          {/* Bottom Dock with 10px Backdrop Blur for maximum readability & aesthetic */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-black/60 backdrop-blur-[10px] border-t border-white/10 z-20 flex items-center justify-between gap-3">
            {/* Left Aligned Text Info */}
            <div className="text-left font-sans text-xs text-white min-w-0 flex-1 pointer-events-none">
              <div className="text-[10px] text-[#FACC15] uppercase tracking-wider font-semibold truncate">
                {metric}
              </div>
              <div className="font-bold uppercase text-xs sm:text-sm mt-0.5 font-tech truncate text-[#F4F3EF]">
                {title}
              </div>
            </div>

            {/* Bottom-Right Shifted Play/Pause Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-9 h-9 shrink-0 bg-[#FACC15] text-[#0D0D0D] hover:bg-white hover:text-black border border-black/30 transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="mt-4 pt-3 border-t border-white/10 font-sans text-xs text-neutral-400 flex justify-between font-medium">
        <span className="truncate pr-2">{meta}</span>
        <span className="text-[#34D399] shrink-0">4K Mastered</span>
      </div>
    </div>
  );
};

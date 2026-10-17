import React, { useRef, useState, useEffect } from 'react';

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

          {/* Controls Bar Top */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-20">
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-black/75 border border-white/20 text-white/80">
              {isPlaying ? 'PLAYING' : 'PAUSED'}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 bg-black/80 hover:bg-[#FACC15] hover:text-black text-white border border-white/20 transition-colors flex items-center justify-center font-mono text-[10px]"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? '🔇 MUTED' : '🔊 LIVE'}
            </button>
          </div>

          {/* Center Play/Pause Overlay Affordance */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-200 ${
              isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-11 h-11 bg-black/85 border border-white/30 text-[#FACC15] flex items-center justify-center font-sans text-xs group-hover:bg-[#FACC15] group-hover:text-black transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? '❚❚' : '►'}
            </button>
          </div>

          {/* Bottom Title & Metric inside Video */}
          <div className="absolute bottom-3 left-3 right-3 text-left font-sans text-xs text-white z-10 pointer-events-none">
            <div className="text-[10px] text-[#FACC15] uppercase tracking-wider font-semibold">
              {metric}
            </div>
            <div className="font-bold uppercase text-xs sm:text-sm mt-0.5 font-tech truncate">
              {title}
            </div>
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

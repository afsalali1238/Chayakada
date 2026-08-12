"use client";

import { useEffect, useRef, useState } from "react";
import { Station, Provider } from "@/data/stations";
import { Play, Pause, SkipBack, SkipForward, ExternalLink, ListMusic, Music } from "lucide-react";

interface PlayerProps {
  station: Station;
  provider: Provider;
  onOpenSelector: () => void;
}

export default function Player({ station, provider, onOpenSelector }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [title, setTitle] = useState("Loading...");
  const [artist, setArtist] = useState("...");
  
  const ytPlayerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube API
  useEffect(() => {
    if (provider === "youtube") {
      setTitle("Loading Station...");
      setArtist(station.nameMalayalam);
      
      const loadYT = () => {
        if (!window.YT) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
          
          window.onYouTubeIframeAPIReady = initPlayer;
        } else {
          initPlayer();
        }
      };

      const initPlayer = () => {
        if (ytPlayerRef.current) {
          ytPlayerRef.current.destroy();
        }
        
        const isVideo = station.youtubePlaylistId.length === 11;
        
        ytPlayerRef.current = new window.YT.Player("yt-player", {
          height: "0",
          width: "0",
          videoId: isVideo ? station.youtubePlaylistId : undefined,
          playerVars: {
            playsinline: 1,
            controls: 0,
            autoplay: 1,
            ...(isVideo ? {} : { listType: "playlist", list: station.youtubePlaylistId })
          },
          events: {
            onReady: (event: any) => {
              // event.target.playVideo();
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                // Loop the video automatically when it ends
                event.target.playVideo();
              } else if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setDuration(event.target.getDuration());
                
                // Get video data
                const videoData = event.target.getVideoData();
                setTitle(videoData.title || station.nameEnglish);
                setArtist(videoData.author || station.nameMalayalam);
                
                if (progressInterval.current) clearInterval(progressInterval.current);
                progressInterval.current = setInterval(() => {
                  setProgress(event.target.getCurrentTime());
                }, 1000);
              } else {
                setIsPlaying(false);
                if (progressInterval.current) clearInterval(progressInterval.current);
              }
            },
          },
        });
      };

      loadYT();
    }

    return () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.destroy === 'function') {
        ytPlayerRef.current.destroy();
      }
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [provider, station.youtubePlaylistId, station.nameMalayalam, station.nameEnglish]);


  const togglePlay = () => {
    if (provider === "youtube" && ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    }
  };

  const nextTrack = () => {
    if (provider === "youtube" && ytPlayerRef.current) {
      ytPlayerRef.current.nextVideo();
    }
  };

  const prevTrack = () => {
    if (provider === "youtube" && ytPlayerRef.current) {
      ytPlayerRef.current.previousVideo();
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcut for play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, provider]);

  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[720px] z-50">
      
      {/* Container to hold the button slightly above */}
      <div className="relative w-full">
        <button 
          onClick={onOpenSelector}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-2 shadow-lg"
        >
          <ListMusic className="w-3 h-3" />
          Change Mood
        </button>
      </div>

      <div className="glass-panel w-full rounded-2xl md:rounded-[2rem] p-3 md:p-4 flex flex-col md:flex-row items-center gap-4 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        
        {/* Hidden YT Player */}
        <div id="yt-player" className="hidden"></div>

        {provider === "spotify" ? (
          // Spotify Native Embed
          <div className="w-full h-[80px] md:h-[152px] rounded-xl overflow-hidden bg-black/20">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${station.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="border-0 rounded-xl"
            ></iframe>
          </div>
        ) : (
          // Custom YouTube Player UI
          <>
            {/* Artwork */}
            <div className="hidden md:flex w-16 h-16 rounded-xl bg-slate-800 border border-white/10 shrink-0 shadow-inner items-center justify-center overflow-hidden relative">
              <div 
                className="absolute inset-0 opacity-50"
                style={{ backgroundColor: station.accentColor }}
              ></div>
              <Music className="w-6 h-6 text-white/50 relative z-10" />
            </div>

            {/* Info */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left overflow-hidden px-2">
              <div className="text-white/50 text-[10px] uppercase tracking-widest font-semibold mb-1 truncate">
                {station.nameMalayalam} — {provider}
              </div>
              <h4 className="text-white font-medium truncate text-sm md:text-base">
                {title}
              </h4>
              <p className="text-white/60 text-xs truncate mt-0.5">
                {artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 shrink-0">
              <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors p-2" aria-label="Previous">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full transition-all hover:scale-105" aria-label="Play/Pause">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>
              
              <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors p-2" aria-label="Next">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Progress & Link */}
            <div className="hidden md:flex items-center gap-3 w-1/4 shrink-0 ml-4 border-l border-white/10 pl-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/80 rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium font-mono">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <a 
                href={station.youtubePlaylistUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                title="Open in YouTube Music"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Progress (absolute bottom) */}
            <div className="absolute bottom-0 left-4 right-4 md:hidden">
              <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/60 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add window type for YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

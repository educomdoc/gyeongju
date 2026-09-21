import React, { useRef, useState } from 'react';
import {
  Play,
  Compass,
  Trees,
  Building2,
  Sparkles,
  Footprints
} from 'lucide-react';

interface RetreatVideoPlayerProps {
  videoSrc: string | null;
  onVideoChange: (src: string | null) => void;
}

export const RetreatVideoPlayer: React.FC<RetreatVideoPlayerProps> = ({
  videoSrc
}) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const chapters = [
    {
      time: '00:00',
      title: '부드럽 과정 인트로',
      desc: '부부가 함께 더 부드럽게 성장하는 시간',
      icon: Compass,
      tag: '2026 부드럽',
      color: 'bg-[#9e4334]'
    },
    {
      time: '00:05',
      title: '군위 사유원 (思惟園)',
      desc: '자연과 건축, 그리고 쉼이 하나 되는 곳',
      icon: Trees,
      tag: '1일차 힐링 산책',
      color: 'bg-[#2e5944]'
    },
    {
      time: '00:19',
      title: '경주 힐튼호텔 (Hilton Gyeongju)',
      desc: '보문호의 아름다움과 품격 있는 휴식 & 디너',
      icon: Building2,
      tag: '5성급 특급 숙소',
      color: 'bg-[#916b34]'
    },
    {
      time: '00:28',
      title: '경주 감성 미술관',
      desc: '자연과 현대 예술의 감성 테라피',
      icon: Sparkles,
      tag: '2일차 문화 예술',
      color: 'bg-[#405473]'
    },
    {
      time: '00:50',
      title: '황리단길 & 대릉원',
      desc: '걷고, 보고, 맛보는 부부만의 자유로운 즐거움',
      icon: Footprints,
      tag: '경주 명소 데이트',
      color: 'bg-[#a3513b]'
    },
  ];

  const isGoogleDrivePreview = videoSrc && videoSrc.includes('drive.google.com');
  const isYoutube = videoSrc && (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be'));

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url;
  };

  return (
    <div className="w-full mt-4 bg-white rounded-3xl border border-[#ebdccd] shadow-xl p-4 sm:p-5 overflow-hidden animate-in fade-in duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#f1e6db]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#faece8] text-[#a03f31] flex items-center justify-center font-bold">
            <Play className="w-4 h-4 fill-[#a03f31]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2d2926]">
              2026 부드럽 과정 공식 안내 영상
            </h4>
            <p className="text-[11px] text-[#786d64]">
              군위 사유원 · 경주 힐튼호텔 · 경주 미술관 · 황리단길
            </p>
          </div>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div className="relative rounded-2xl overflow-hidden bg-[#181615] aspect-video flex items-center justify-center group shadow-inner">
        {videoSrc ? (
          <>
            {isGoogleDrivePreview ? (
              <iframe
                src={videoSrc}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; fullscreen"
                title="부드럽 과정 공식 안내 영상 (Google Drive)"
              />
            ) : isYoutube ? (
              <iframe
                src={getYoutubeEmbedUrl(videoSrc)}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="부드럽 과정 공식 안내 영상 (YouTube)"
              />
            ) : (
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-contain"
                playsInline
                controls
                autoPlay
              />
            )}
          </>
        ) : (
          /* Interactive Storyboard Preview Screen */
          <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 text-white bg-gradient-to-br from-[#2b2623] via-[#3d332d] to-[#1f1a18]">
            {/* Background Mood Visual Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e0c5b5_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e89083] animate-ping" />
                {chapters[activeChapter].tag}
              </span>
              <span className="text-xs text-white/70 font-mono">
                {chapters[activeChapter].time} / 01:17
              </span>
            </div>

            {/* Center Play Button & Title */}
            <div className="relative z-10 text-center my-auto py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#a03f31] text-white shadow-2xl flex items-center justify-center mx-auto mb-3">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
              </div>
              <h5 className="text-lg sm:text-xl font-bold font-serif-kr text-white drop-shadow">
                {chapters[activeChapter].title}
              </h5>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md mx-auto">
                {chapters[activeChapter].desc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Chapter Timeline Selector */}
      <div className="mt-3.5">
        <div className="text-[11px] font-bold text-[#655b52] mb-1.5 flex items-center justify-between">
          <span>영상 주요 코스 타임라인</span>
          <span className="text-[#a03f31] text-[10px]">총 1분 17초 구성</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {chapters.map((ch, idx) => {
            const isSelected = activeChapter === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`p-2 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-[#faece8] border-[#a03f31] text-[#2d2926]'
                    : 'bg-[#faf6f0] border-[#ede2d5] hover:bg-white text-[#5c5249]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono font-bold text-[#8b3d2f]">
                    {ch.time}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${ch.color}`} />
                </div>
                <div className="font-bold text-[11px] truncate leading-tight">
                  {ch.title.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


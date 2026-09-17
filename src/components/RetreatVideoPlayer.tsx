import React, { useRef, useState } from 'react';
import {
  Play,
  Upload,
  Info,
  Link as LinkIcon,
  Check,
  HelpCircle,
  X,
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
  videoSrc,
  onVideoChange
}) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [showUrlModal, setShowUrlModal] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onVideoChange(url);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      let finalUrl = inputUrl.trim();
      // Google Drive link handling
      if (finalUrl.includes('drive.google.com/file/d/')) {
        const fileIdMatch = finalUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
          finalUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
        }
      }
      onVideoChange(finalUrl);
      setShowUrlModal(false);
      setInputUrl('');
    }
  };

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

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Permanent Embedding Guide Button */}
          <button
            onClick={() => setShowGuideModal(true)}
            className="text-[11px] font-medium text-[#786d64] hover:text-[#2d2926] px-2.5 py-1.5 rounded-lg bg-[#f7f2ec] hover:bg-[#ede3d7] flex items-center gap-1 transition-colors"
            title="웹 및 GitHub 영구 탑재 방법 안내"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#8b3d2f]" />
            <span>영구 탑재 가이드</span>
          </button>

          {/* Web / Drive Link Button */}
          <button
            onClick={() => setShowUrlModal(true)}
            className="text-[11px] font-semibold text-[#5c5249] hover:text-[#2d2926] px-2.5 py-1.5 rounded-lg bg-[#f3ede4] hover:bg-[#e8decb] flex items-center gap-1 transition-colors"
            title="구글 드라이브 또는 영상 URL 연결"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>링크 연결</span>
          </button>

          {/* Local File Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-semibold text-[#8b3d2f] hover:text-[#6a291e] px-2.5 py-1.5 rounded-lg bg-[#faece8] hover:bg-[#f5ded7] flex items-center gap-1.5 transition-colors"
            title="직접 영상 파일(MP4/WebM) 선택 또는 변경"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{videoSrc ? '영상 교체' : '파일 로드'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            className="hidden"
            onChange={handleFileUpload}
          />
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
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#a03f31] hover:bg-[#b84838] text-white shadow-2xl flex items-center justify-center mx-auto mb-3 transition-transform hover:scale-105 active:scale-95 group/btn"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5 group-hover/btn:scale-110 transition-transform" />
              </button>
              <h5 className="text-lg sm:text-xl font-bold font-serif-kr text-white drop-shadow">
                {chapters[activeChapter].title}
              </h5>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-md mx-auto">
                {chapters[activeChapter].desc}
              </p>
            </div>

            {/* Bottom Quick Call to Action */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-white/70">
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#e89083]" />
                영상 파일을 로드하면 창을 닫았다 열어도 영상이 유지됩니다
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowUrlModal(true)}
                  className="text-white hover:text-[#f4d1c9] underline underline-offset-2 font-medium"
                >
                  드라이브/URL 링크
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white hover:text-[#f4d1c9] underline underline-offset-2 font-semibold"
                >
                  동영상 파일 선택
                </button>
              </div>
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

      {/* URL Input Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#e8d8c9] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f1e6db]">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#a03f31]" />
                <h3 className="font-bold text-sm text-[#2d2926]">동영상 URL / 구글 드라이브 링크 연결</h3>
              </div>
              <button
                onClick={() => setShowUrlModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleApplyUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#5c5249] mb-1">
                  구글 드라이브 공유 링크 또는 비디오 URL (MP4 / YouTube)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/... 또는 https://..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#dec9b8] rounded-xl focus:outline-none focus:border-[#a03f31] focus:ring-1 focus:ring-[#a03f31]"
                  required
                />
              </div>
              <div className="p-2.5 bg-[#faf6f1] rounded-xl text-[11px] text-[#6d6258] space-y-1">
                <p className="font-semibold text-[#2d2926]">💡 구글 드라이브 링크 설정 팁:</p>
                <p>1. 구글 드라이브에서 파일 우클릭 → <strong>[공유]</strong> → <strong>'링크가 있는 모든 사용자에게 공개'</strong> 설정</p>
                <p>2. 복사한 링크를 그대로 위 입력창에 넣으시면 자동으로 임베드 뷰어로 전환되어 재생됩니다.</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-3 py-1.5 text-xs text-[#72675e] hover:bg-gray-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-[#a03f31] hover:bg-[#883327] text-white font-semibold rounded-lg shadow-sm"
                >
                  적용하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GitHub / Web Permanent Embedding Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#e8d8c9] animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f1e6db]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#faece8] text-[#a03f31] flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#2d2926]">웹 & GitHub 영구 탑재 방법 가이드</h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#524941] leading-relaxed">
              <div className="p-3 bg-[#faf6f1] rounded-xl border border-[#ede1d3]">
                <p className="font-bold text-sm text-[#8b3d2f] mb-1">
                  💡 왜 '영상 닫기'를 누르면 동영상이 사라졌었나요?
                </p>
                <p>
                  브라우저의 파일 업로드는 보안상 임시 메모리(Blob URL)로 유지되어, 컴포넌트가 닫히면 메모리가 해제되었기 때문입니다. <strong className="text-[#2d2926]">이번 수정으로 부모 컴포넌트 메모리에 안전하게 유지되도록 개선</strong>되었습니다.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#2d2926] flex items-center gap-1.5 mb-2">
                  <span className="w-4 h-4 rounded-full bg-[#a03f31] text-white flex items-center justify-center text-[10px]">1</span>
                  방법 1. 프로젝트 폴더에 동영상 파일 넣기 (가장 추천 - GitHub 동기화)
                </h4>
                <div className="bg-[#f5efe8] p-3 rounded-xl space-y-1.5 font-mono text-[11px] text-[#4a3f37]">
                  <p>1. 영상 파일 이름을 <code className="bg-white px-1.5 py-0.5 rounded border border-[#dec9b8] text-[#a03f31] font-bold">retreat_video.mp4</code> 로 변경</p>
                  <p>2. 프로젝트의 <code className="bg-white px-1.5 py-0.5 rounded border border-[#dec9b8] font-bold">public/assets/</code> 폴더에 파일을 넣습니다.</p>
                  <p>3. <code className="bg-white px-1.5 py-0.5 rounded border border-[#dec9b8] font-bold">src/data/retreatData.ts</code> 파일의 <code className="text-[#a03f31] font-bold">videoUrl: '/assets/retreat_video.mp4'</code> 로 한 줄만 설정하면 끝납니다!</p>
                </div>
                <p className="text-[11px] text-[#7d736a] mt-1.5">
                  * 이렇게 하면 GitHub에 푸시할 때 영상이 같이 업로드되어 GitHub Pages나 Vercel 배포 시 영구적으로 항상 자동 로드됩니다. (용량 50MB 이하 권장)
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#2d2926] flex items-center gap-1.5 mb-2">
                  <span className="w-4 h-4 rounded-full bg-[#a03f31] text-white flex items-center justify-center text-[10px]">2</span>
                  방법 2. Google 드라이브 링크 연결 (대용량 영상에 적합)
                </h4>
                <div className="bg-[#f5efe8] p-3 rounded-xl space-y-1 text-[11px]">
                  <p>1. 동영상을 회사 구글 드라이브에 업로드</p>
                  <p>2. 우클릭 → <strong>[공유]</strong> → 일반 액세스를 <strong>'링크가 있는 모든 사용자'</strong>로 변경</p>
                  <p>3. 복사한 링크를 플레이어 상단의 <strong>[링크 연결]</strong>에 붙여넣거나, <code className="bg-white px-1 py-0.5 rounded border">retreatData.ts</code>의 <code className="text-[#a03f31]">videoUrl</code>에 지정</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#2d2926] flex items-center gap-1.5 mb-2">
                  <span className="w-4 h-4 rounded-full bg-[#a03f31] text-white flex items-center justify-center text-[10px]">3</span>
                  방법 3. 유튜브 미등록(일부 공개) 링크
                </h4>
                <div className="bg-[#f5efe8] p-3 rounded-xl space-y-1 text-[11px]">
                  <p>유튜브에 '일부 공개(Unlisted)'로 업로드 후 해당 URL을 지정하면, 모바일/PC 스트리밍 버퍼링 없이 가장 빠르고 안정적으로 재생됩니다.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 mt-2 border-t border-[#f1e6db]">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-[#a03f31] hover:bg-[#883327] text-white text-xs font-semibold rounded-xl"
              >
                확인했습니다
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


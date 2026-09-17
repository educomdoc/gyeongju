import React, { useState } from 'react';
import { Calendar, MapPin, Users, Sparkles, Heart, Clock, ArrowRight, CheckCircle2, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { RETREAT_INFO } from '../data/retreatData';
import { RetreatVideoPlayer } from './RetreatVideoPlayer';

interface HeroSectionProps {
  onExplorePrograms: () => void;
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplorePrograms, onOpenInquiry }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(RETREAT_INFO.videoUrl || null);

  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden bg-hanji">
      {/* Background Decorative Traditional Gradients & Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#f9d7cf]/40 via-[#faebe5]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-gradient-to-tr from-[#ece2d6]/60 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Left Typography & Content, Right Visual Poster Motif */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Core Details (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Sub-slogan with vertical bar aesthetic */}
            <div className="inline-block mb-3">
              <p className="text-base sm:text-lg text-[#8e4537] font-serif-kr font-medium tracking-wide">
                부부가 함께 더 부드럽게 성장하는 시간
              </p>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#262320] font-serif-kr tracking-tight leading-[1.15] mb-5">
              도레이첨단소재
              <br />
              <span className="text-[#a83d2d] relative inline-block">
                부드럽 과정
                {/* Underline accent */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#d97768]/40"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C50 3 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-[#595048] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              도레이첨단소재 현장의 안전과 품질을 지켜온 든든한 주역,{' '}
              <strong className="text-[#2c2926] font-semibold">현장 반장님</strong>과
              곁에서 묵묵히 버팀목이 되어준{' '}
              <strong className="text-[#2c2926] font-semibold">소중한 배우자</strong>분들을 위한
              1박 2일 프리미엄 힐링 리트릿 입니다.
            </p>

            {/* Key Fact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
              <div className="bg-white/90 border border-[#e8ded3] rounded-2xl p-3.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b4134] mb-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>참가 대상</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#2d2926] truncate">
                  현장 반장님
                </div>
                <div className="text-[11px] text-[#7d736a] mt-0.5 truncate">
                  약 200명 [부부동반]
                </div>
              </div>

              <div className="bg-white/90 border border-[#e8ded3] rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b4134] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>행사 일정</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#2d2926] truncate">
                  1박 2일
                </div>
                <div className="text-[11px] text-[#7d736a] mt-0.5 truncate">
                  가을 힐링 리트릿
                </div>
              </div>

              <div className="bg-white/90 border border-[#e8ded3] rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b4134] mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>행사 장소</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#2d2926] truncate">
                  사유원 & 힐튼호텔
                </div>
                <div className="text-[11px] text-[#7d736a] mt-0.5 truncate">
                  군위 & 경주 보문단지
                </div>
              </div>
            </div>

            {/* Quick Action Button & Embedded Video Player */}
            <div className="w-full">
              <button
                onClick={() => setShowVideo(!showVideo)}
                id="hero-explore-programs-btn"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#a03f31] hover:bg-[#8c3427] text-white font-semibold text-sm shadow-md shadow-[#a03f31]/20 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Play className={`w-4 h-4 transition-transform ${showVideo ? 'scale-110 fill-white' : 'fill-white'}`} />
                  <span>프로그램 안내 동영상</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs bg-white/15 px-3 py-1 rounded-full font-medium">
                  <span>{showVideo ? '영상 닫기' : '영상 바로보기'}</span>
                  {showVideo ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </div>
              </button>

              {/* Embedded Retreat Video Player */}
              {showVideo && (
                <RetreatVideoPlayer
                  videoSrc={videoSrc}
                  onVideoChange={setVideoSrc}
                />
              )}
            </div>
          </div>

          {/* Right Column: Visual Poster Card & Round Selector (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 rounded-3xl border border-[#ebdccd] shadow-xl p-6 relative overflow-hidden backdrop-blur-sm">
              {/* Traditional Norigae Decorative Ribbon SVG in top right */}
              <div className="absolute -top-3 right-6 flex flex-col items-center pointer-events-none opacity-80">
                <div className="w-7 h-7 rounded-sm bg-[#c95d4d] rotate-45 border border-[#eed0cb] shadow-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#e89083] rotate-45" />
                </div>
                <div className="w-0.5 h-6 bg-[#b24f40]" />
                <div className="w-3 h-10 bg-gradient-to-b from-[#b24f40] to-[#803126] rounded-b-md shadow-sm" />
              </div>

              {/* Couple Birds Illustration Visual Card */}
              <div className="bg-gradient-to-b from-[#f9ece8] to-[#f4ded6] rounded-2xl p-5 mb-5 border border-[#edd7ce] relative text-center">
                <div className="flex items-center justify-center gap-4 py-2">
                  {/* Husband Duck Representation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#4a7266] text-white flex items-center justify-center text-2xl shadow-md border-2 border-white relative">
                      <span>🦆</span>
                      <div className="absolute -bottom-1.5 bg-[#253c35] text-[9px] text-white font-bold px-1.5 py-0.2 rounded-full">
                        나비넥타이
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#354f48] mt-2">
                      든든한 반장님
                    </span>
                  </div>

                  {/* Heart Union */}
                  <div className="flex flex-col items-center px-1">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#d97768]">
                      <Heart className="w-4 h-4 fill-[#d97768]" />
                    </div>
                    <span className="text-[10px] text-[#975143] font-serif-kr mt-1">
                      부부동반
                    </span>
                  </div>

                  {/* Wife Duck Representation */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#d98b7e] text-white flex items-center justify-center text-2xl shadow-md border-2 border-white relative">
                      <span>🕊️</span>
                      <div className="absolute -bottom-1.5 bg-[#ad4d40] text-[9px] text-white font-bold px-1.5 py-0.2 rounded-full">
                        분홍리본
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#8f4133] mt-2">
                      고마운 배우자
                    </span>
                  </div>
                </div>
              </div>

              {/* 1박 2일 Journey Summary Card */}
              <div className="bg-[#faf6f1] rounded-2xl p-4 sm:p-5 border border-[#e8ddcf]">
                <div className="flex items-center mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#f4e1dd] text-[#97382a] text-xs font-bold">
                    1박 2일 부부 리트릿
                  </span>
                </div>

                <div className="text-xl font-bold text-[#231f1c] font-serif-kr mb-1">
                  1박 2일 힐링 여정
                </div>
                <div className="text-xs text-[#72675e] mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d97768]" />
                  <span>사유원 & 경주 힐튼호텔 부부 특별 초청</span>
                </div>

                {/* Day 1 & Day 2 Journey highlights */}
                <div className="space-y-2.5 text-xs text-[#524942] border-t border-[#eee2d4] pt-3.5">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#eddcd0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#a03f31] text-white font-bold text-[11px]">
                        1일차
                      </span>
                      <span className="font-semibold text-[#2f2b27]">
                        군위 사유원 & 화본역 추억 투어
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a7a6e]">나를 비우고 자연을 담다</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#eddcd0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#2b5a3c] text-white font-bold text-[11px]">
                        2일차
                      </span>
                      <span className="font-semibold text-[#2f2b27]">
                        경주 미술관 & 황리단길 자유산책
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8a7a6e]">내면을 채우고 문화를 향유하다</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#eee2d4] flex items-center justify-between text-xs text-[#786b60]">
                  <span className="font-medium">전 일정 식사·5성급 숙박·체험비</span>
                  <span className="font-bold text-[#a03f31]">도레이첨단소재 전액 지원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

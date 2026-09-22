import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Heart,
  Info,
  Calendar,
  ChevronRight,
  Check,
  Share2,
  Compass,
} from 'lucide-react';
import { PROGRAMS_DATA } from '../data/retreatData';
import { ProgramItem } from '../types';

interface ProgramSectionProps {
  selectedProgramId?: string;
  onSelectProgram?: (id: string) => void;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({
  selectedProgramId = 'sayuwon',
  onSelectProgram,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedProgramId || 'sayuwon');
  const [dayFilter, setDayFilter] = useState<'ALL' | 'Day 1' | 'Day 2'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync internal activeTab with prop if changed
  React.useEffect(() => {
    if (selectedProgramId && selectedProgramId !== activeTab) {
      setActiveTab(selectedProgramId);
    }
  }, [selectedProgramId]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onSelectProgram) {
      onSelectProgram(id);
    }
  };

  // Filter out hilton-gyeongju since it is now dedicated to the 숙소 (Hotel) section
  const programList = PROGRAMS_DATA.filter((p) => p.id !== 'hilton-gyeongju');

  const filteredPrograms = programList.filter((p) => {
    if (dayFilter === 'ALL') return true;
    return p.day === dayFilter;
  });

  const currentProgram =
    programList.find((p) => p.id === activeTab) || programList[0];

  const handleCopyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="program" className="py-20 md:py-28 bg-[#fdfbf7] border-t border-[#ebdccd]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4e4df] text-[#a03f31] text-xs font-semibold mb-3 border border-[#ecd2cb]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>부드럽 과정 프리미엄 명소</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292522] font-serif-kr tracking-tight mb-4">
            상세 프로그램 안내
          </h2>
          <p className="text-[#655b52] text-sm sm:text-base leading-relaxed">
            세계적 건축 정원 사유원부터 추억의 간이역 화본역, 5성급 힐튼 호텔,
            감성 미술관, 그리고 황리단길까지 시간표 일정에 맞춰 세심하게 큐레이션된 여정입니다.
          </p>

          {/* Day Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setDayFilter('ALL')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                dayFilter === 'ALL'
                  ? 'bg-[#292522] text-white shadow-sm'
                  : 'bg-white text-[#6d6258] border border-[#e4d7ca] hover:bg-[#f5ece2]'
              }`}
            >
              전체 코스 (4개)
            </button>
            <button
              onClick={() => setDayFilter('Day 1')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                dayFilter === 'Day 1'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#6d6258] border border-[#e4d7ca] hover:bg-[#f5ece2]'
              }`}
            >
              1일차 코스 (사유원 · 화본역)
            </button>
            <button
              onClick={() => setDayFilter('Day 2')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                dayFilter === 'Day 2'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#6d6258] border border-[#e4d7ca] hover:bg-[#f5ece2]'
              }`}
            >
              2일차 코스 (미술관 · 황리단길)
            </button>
          </div>
        </div>

        {/* 4 Program Quick Tabs - aligned seamlessly with the detail card below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {filteredPrograms.map((prog, index) => {
            const isSelected = activeTab === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => handleTabChange(prog.id)}
                id={`program-tab-${prog.id}`}
                className={`p-4 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-white border-[#a03f31] shadow-md ring-2 ring-[#a03f31]/10 -translate-y-0.5'
                    : 'bg-[#faf6f0] border-[#ebdccd] hover:bg-white hover:border-[#dfcbb9]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      prog.day === 'Day 1'
                        ? 'bg-[#f8eae6] text-[#a03f31]'
                        : 'bg-[#e7f0ec] text-[#2c614e]'
                    }`}
                  >
                    {prog.day}
                  </span>
                  <span className="text-[11px] font-semibold text-[#8c8075]">
                    0{index + 1}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#272320] font-serif-kr truncate">
                  {prog.name}
                </div>
                <div className="text-[11px] text-[#786c62] truncate mt-0.5">
                  {prog.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Program Spotlight Card */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Image & Visual Badge (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[480px] bg-[#ece3d8]">
              <img
                src={currentProgram.imageUrl}
                alt={currentProgram.name}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (currentProgram.fallbackUrl && target.src !== currentProgram.fallbackUrl) {
                    target.src = currentProgram.fallbackUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#a03f31] text-xs font-bold shadow-md">
                  {currentProgram.day} · {currentProgram.scheduleSlot}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm">
                  {currentProgram.locationName}
                </span>
              </div>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs font-medium text-white/80 mb-1">
                  {currentProgram.nameEn}
                </div>
                <h3 className="text-2xl font-bold font-serif-kr drop-shadow-sm">
                  {currentProgram.name}
                </h3>
                <p className="text-xs text-white/90 mt-1 line-clamp-2">
                  {currentProgram.shortDescription}
                </p>
              </div>
            </div>

            {/* Right: Detailed Content & Activity (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Header Information */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1e6da] pb-4 mb-5">
                  <div>
                    <span className="text-xs font-semibold text-[#a03f31] bg-[#fbedea] px-2.5 py-1 rounded-md">
                      {currentProgram.category}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-bold text-[#231f1c] font-serif-kr mt-2">
                      {currentProgram.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#70645a] bg-[#f9f5f0] px-3 py-1.5 rounded-xl border border-[#eee2d6]">
                    <Clock className="w-3.5 h-3.5 text-[#a03f31]" />
                    <span>{currentProgram.estimatedTime}</span>
                  </div>
                </div>

                {/* Long Description */}
                <p className="text-[#51473f] text-sm sm:text-base leading-relaxed mb-6">
                  {currentProgram.description}
                </p>

                {/* Sayuwon 4-hour course and route map for Sayuwon; tailored course info for others */}
                {currentProgram.id === 'sayuwon' ? (
                  <div className="bg-[#f7f9f5] rounded-2xl p-4 sm:p-5 border border-[#dce6d5] mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a3c]">
                        <Compass className="w-4 h-4 text-[#2d5a3c]" />
                        <span>사유원 핵심 추천 탐방 코스 (주요 거점)</span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#3b6a4b] bg-[#e8f1e3] px-2 py-0.5 rounded-full border border-[#d2e4cb]">
                        약 4시간 소요 (09:00 ~ 13:00)
                      </span>
                    </div>
                    <p className="text-xs text-[#526356] leading-relaxed mb-3">
                      10만 평의 수목원을 알차게 누리는 사유원 핵심 거점 순환 코스입니다.
                    </p>

                    {/* Step-by-Step Waypoints - 8 Key Stations */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {[
                        { step: '01', name: '치허문', desc: '마음을 비우는 사유원 첫 관문' },
                        { step: '02', name: '소대', desc: '알바로 시자 20.5m 전망대' },
                        { step: '03', name: '소요헌', desc: '거장의 건축 예술관' },
                        { step: '04', name: '풍설기천년', desc: '천년 모과나무 숲' },
                        { step: '05', name: '유원', desc: '자연과 바람의 정원' },
                        { step: '06', name: '명정', desc: '승효상 설계 물의 사유정원' },
                        { step: '07', name: '가가빈빈', desc: '음료 교환 카페 쉼터', highlight: true },
                        { step: '08', name: '몽몽차방', desc: '전통 차향 가득한 다도실' },
                      ].map((point, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border shadow-xs transition-colors ${
                            point.highlight
                              ? 'bg-[#edf6ee] border-[#b7dcbc] ring-1 ring-[#5ca16c]/30'
                              : 'bg-white/95 border-[#dbe6d5]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                              point.highlight ? 'bg-[#3b7b4d] text-white' : 'bg-[#eaf2e6] text-[#2d5a3c]'
                            }`}>
                              {point.step}
                            </span>
                            {point.highlight && (
                              <span className="text-[9px] font-bold text-[#2d6b3e] bg-white px-1.5 py-0.5 rounded-full border border-[#b7dcbc]">
                                쿠폰 사용
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#233528] mt-1 truncate">
                            {point.name}
                          </p>
                          <p className="text-[10px] text-[#69796d] truncate">{point.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Stylized Visual Route Map Canvas/Diagram */}
                    <div className="bg-gradient-to-br from-[#273d2f] to-[#1c2c22] rounded-xl p-3.5 sm:p-4 text-white relative overflow-hidden">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#b6dbc0] mb-2.5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#7bd99a]" />
                          사유원 4시간 순환 코스 안내도
                        </span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-[#c5e8ce]">총 8개 주요 거점</span>
                      </div>

                      {/* Route Path Flow */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium py-2 border-y border-white/10 my-2">
                        <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold">치허문</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[#e0f3e6]">소대</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[#e0f3e6]">소요헌</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[#e0f3e6]">풍설기천년</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[#e0f3e6]">유원</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[#e0f3e6]">명정</span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-[#417f54] text-white font-bold px-2 py-0.5 rounded border border-[#7ed498]/40 shadow-xs">
                          가가빈빈 ☕
                        </span>
                        <span className="text-[#8ec59f]">→</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold">몽몽차방</span>
                      </div>

                      {/* Coupon notice banner */}
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#ffe89d]">
                        <span className="text-sm">🎫</span>
                        <span>* 가가빈빈에서 지급드린 쿠폰을 제시하시면 음료를 교환해 드립니다.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#fcf5f3] rounded-2xl p-4 border border-[#f5dad4] mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#a03f31] mb-1.5">
                      <Heart className="w-4 h-4 fill-[#a03f31]" />
                      <span>추천 탐방 & 힐링 포인트</span>
                    </div>
                    <p className="text-sm font-semibold text-[#302621]">
                      {currentProgram.coupleActivity}
                    </p>
                  </div>
                )}

                {/* Highlights Checklist */}
                <div className="mb-6">
                  <h5 className="text-xs font-bold text-[#6a5e55] uppercase tracking-wider mb-3">
                    주요 관람 & 힐링 포인트
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentProgram.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[#453d36] bg-[#faf7f2] p-2.5 rounded-xl border border-[#efe6dc]"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#f4e2dd] text-[#a03f31] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips & Recommendations */}
                <div className="bg-[#f6f7f3] rounded-2xl p-4 border border-[#e5eadf] mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#3d604b] mb-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>방문 안내 및 꿀팁 (Tip)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#525e56]">
                    {currentProgram.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#3d604b] font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Address & Navigation Links Footer */}
              <div className="pt-4 border-t border-[#f1e6da] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-[#6c6157]">
                  <MapPin className="w-3.5 h-3.5 text-[#a03f31] flex-shrink-0" />
                  <span className="truncate max-w-xs">{currentProgram.address}</span>
                  <button
                    onClick={() => handleCopyAddress(currentProgram.address, currentProgram.id)}
                    className="px-2 py-0.5 rounded bg-[#eee3d7] hover:bg-[#e4d5c6] text-[#4d4339] font-medium transition-colors"
                  >
                    {copiedId === currentProgram.id ? '복사완료!' : '주소복사'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentProgram.mapKakaoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#fee500] hover:bg-[#fada00] text-[#3c1e1e] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>카카오맵</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={currentProgram.mapNaverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#03c75a] hover:bg-[#02b350] text-white font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>네이버지도</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map Overview of Course Route */}
        <div className="mt-12 bg-[#faf5ee] rounded-3xl p-6 sm:p-8 border border-[#eadbc9]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#a03f31] bg-[#f8e9e5] px-2.5 py-1 rounded-full">
                1박 2일 동선 요약
              </span>
              <h4 className="text-lg font-bold text-[#272320] font-serif-kr mt-1">
                군위 힐링 숲에서 경주 보문호 & 천년 역사 골목으로 이어지는 여정
              </h4>
            </div>
            <div className="text-xs text-[#7c7065]">
              전 일정 단체 버스로 편안하게 이동합니다.
            </div>
          </div>

          {/* Stepper Route Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {PROGRAMS_DATA.map((prog, index) => (
              <div
                key={prog.id}
                onClick={() => handleTabChange(prog.id)}
                className="cursor-pointer group bg-white p-4 rounded-2xl border border-[#e8ddcf] hover:border-[#a03f31] transition-all shadow-sm"
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#a03f31]">STEP 0{index + 1}</span>
                  <span className="text-[10px] text-[#867b71] bg-[#f5ede4] px-1.5 py-0.5 rounded">
                    {prog.day}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#272320] group-hover:text-[#a03f31] transition-colors">
                  {prog.name}
                </div>
                <div className="text-[11px] text-[#7e7267] mt-1 line-clamp-1">
                  {prog.shortDescription}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

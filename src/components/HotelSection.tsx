import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  MapPin,
  Clock,
  Coffee,
  UtensilsCrossed,
  Wine,
  Waves,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Moon,
  Heart
} from 'lucide-react';
import { RETREAT_INFO, PROGRAMS_DATA } from '../data/retreatData';

export const HotelSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'room' | 'dining' | 'facility'>('room');

  const hiltonData = PROGRAMS_DATA.find((p) => p.id === 'hilton-gyeongju');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hotelFeatures = [
    {
      title: '디럭스 더블 / 트윈 객실',
      desc: '보문호수 또는 아늑한 마운틴뷰가 파노라마로 펼쳐지는 최고급 침구의 5성급 부부 전용 객실',
      badge: '전 참가자 1실 배정',
      icon: Moon,
    },
    {
      title: '특선 디너 만찬 & 와인 페어링',
      desc: '호텔 메인 볼룸에서 진행되는 셰프 특선 만찬 코스와 도레이 임직원 부부 축하 와인',
      badge: '1일차 18:00',
      icon: UtensilsCrossed,
    },
    {
      title: '레이크사이드 조식 뷔페',
      desc: '신선한 샐러드, 즉석 오믈렛, 베이커리 등 80여 종의 인터내셔널 프리미엄 모닝 뷔페',
      badge: '2일차 07:30~09:00',
      icon: Coffee,
    },
    {
      title: '피트니스 & 실내 수영장',
      desc: '자연 채광이 비치는 힐튼 실내 풀장과 쾌적한 피트니스 센터 무료 이용',
      badge: '자유 이용권 증정',
      icon: Waves,
    },
  ];

  return (
    <section id="hotel" className="py-20 md:py-28 bg-[#f5ede4]/40 border-t border-[#ebdccd]/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4e4df] text-[#a03f31] text-xs font-semibold mb-3 border border-[#ecd2cb]">
            <Building2 className="w-3.5 h-3.5" />
            <span>부드럽 과정 전용 5성급 숙소</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292522] font-serif-kr tracking-tight mb-4">
            숙소 안내 : 경주 힐튼호텔
          </h2>
          <p className="text-[#655b52] text-sm sm:text-base leading-relaxed">
            보문호수의 고즈넉한 물결과 품격 있는 만찬이 머무는 곳.
            <br className="hidden sm:inline" />
            도레이첨단소재 반장 부부의 소중한 휴식을 위해 최고급 디럭스 룸과 디너 만찬을 준비했습니다.
          </p>
        </div>

        {/* Main Hotel Overview Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#ebdccd] overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Image with Badges */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px]">
              <img
                src={hiltonData?.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"}
                alt="경주 힐튼 호텔"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#a03f31] text-white text-xs font-bold shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  5성급 특급 호텔
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                  보문호수 바로 앞
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-xs uppercase tracking-widest text-[#f5d0c5] font-semibold mb-1">
                  Hilton Gyeongju Deluxe Experience
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-kr drop-shadow">
                  경주 힐튼호텔 (Hilton Gyeongju)
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f5d0c5]" />
                  경상북도 경주시 보문로 484-7 (신평동)
                </p>
              </div>
            </div>

            {/* Right: Key Details & Features */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#f0e4d7] mb-6">
                  <div>
                    <div className="text-xs font-semibold text-[#a03f31] mb-0.5">체크인 / 체크아웃</div>
                    <div className="text-base font-bold text-[#2d2926]">
                      1일차 16:00 입실 ~ 2일차 09:30 퇴실
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#786c62] mb-0.5">객실 형태</div>
                    <div className="text-sm font-bold text-[#2d2926]">
                      디럭스 룸 (부부당 1실)
                    </div>
                  </div>
                </div>

                {/* Sub Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {hotelFeatures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[#eee2d5] hover:border-[#dbc7b5] transition-all"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-7 h-7 rounded-lg bg-[#faece8] text-[#a03f31] flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold text-[#a03f31] bg-[#faebe8] px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#2d2926] mb-1">{item.title}</h4>
                        <p className="text-[11px] text-[#6b6157] leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Couple Highlight Message */}
                <div className="p-4 rounded-2xl bg-[#faece8] border border-[#ebd2ca] mb-6">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-[#a03f31] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#a03f31] mb-1">
                        부드럽 특별 나이트 : 보문호 달빛 산책 &amp; 힐링 토크
                      </div>
                      <p className="text-xs text-[#6e372e] leading-relaxed">
                        만찬 종료 후 객실에 준비된 와인과 치즈 플래터로 오붓한 부부의 밤을 나누고, 호텔 정원과 연결된 보문호수 수변 산책로를 걸으며 잊지 못할 추억을 완성하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy Address & Map Links */}
              <div className="pt-4 border-t border-[#f0e4d7] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleCopy('경상북도 경주시 보문로 484-7')}
                  className="px-4 py-2 rounded-xl bg-[#f0e4d7] hover:bg-[#e4d4c4] text-[#4b4138] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? '주소 복사 완료!' : '호텔 주소 복사'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="https://map.naver.com/v5/search/경주힐튼호텔"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#03c75a]/10 hover:bg-[#03c75a]/20 text-[#008f3f] text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>네이버지도</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://map.kakao.com/?q=경주힐튼호텔"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#fee500]/30 hover:bg-[#fee500]/50 text-[#3c1e1e] text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>카카오맵</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Checklist & Service Notice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-[#ebdccd] shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#a03f31]">
              <ShieldCheck className="w-4 h-4" />
              <span>전용 컨시어지 데스크</span>
            </div>
            <h5 className="text-sm font-bold text-[#2d2926] mb-1.5">도레이 단독 전용 부스 운영</h5>
            <p className="text-xs text-[#6e6359] leading-relaxed">
              호텔 로비에 도레이첨단소재 참가자 전용 안내 부스가 설치되어 대기 없이 신속한 룸 배정 및 웰컴 키트가 전달됩니다.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ebdccd] shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#a03f31]">
              <Waves className="w-4 h-4" />
              <span>부대시설 무료 혜택</span>
            </div>
            <h5 className="text-sm font-bold text-[#2d2926] mb-1.5">헬스장 &amp; 실내 수영장</h5>
            <p className="text-xs text-[#6e6359] leading-relaxed">
              워크숍 참가 부부 전원에게 투숙 기간 중 횟수 제한 없는 힐튼 헬스장 및 실내 수영장 무료 이용 혜택이 지원됩니다.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#ebdccd] shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#a03f31]">
              <UtensilsCrossed className="w-4 h-4" />
              <span>조식 뷔페 식사 안내</span>
            </div>
            <h5 className="text-sm font-bold text-[#2d2926] mb-1.5">레이크사이드 뷔페</h5>
            <p className="text-xs text-[#6e6359] leading-relaxed">
              2일차 아침 07:30부터 09:00까지 자유롭게 조식 뷔페를 즐기실 수 있으며, 09:30에 로비에서 단체 출발합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

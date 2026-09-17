import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { ProgramSection } from './components/ProgramSection';
import { HotelSection } from './components/HotelSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import {
  Calendar,
  Sparkles,
  Phone,
  FileText,
  X,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'schedule' | 'program' | 'hotel' | 'inquiry'>('home');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('sayuwon');
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProgram = (programId: string) => {
    setSelectedProgramId(programId);
    scrollToSection('program');
  };

  // Scroll spy to update activeSection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const homeEl = document.getElementById('home');
      const scheduleEl = document.getElementById('schedule');
      const programEl = document.getElementById('program');
      const hotelEl = document.getElementById('hotel');
      const inquiryEl = document.getElementById('inquiry');

      if (inquiryEl && scrollPos >= inquiryEl.offsetTop) {
        setActiveSection('inquiry');
      } else if (hotelEl && scrollPos >= hotelEl.offsetTop) {
        setActiveSection('hotel');
      } else if (programEl && scrollPos >= programEl.offsetTop) {
        setActiveSection('program');
      } else if (scheduleEl && scrollPos >= scheduleEl.offsetTop) {
        setActiveSection('schedule');
      } else if (homeEl) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#292522] font-sans antialiased selection:bg-[#f3d9d3] selection:text-[#8e3f32] break-keep">
      {/* Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onSelectProgram={handleSelectProgram}
        onOpenApplyModal={() => setShowApplyModal(true)}
      />

      {/* 1. 과정소개 (홈 & 개요) */}
      <HeroSection
        onExplorePrograms={() => scrollToSection('program')}
        onOpenInquiry={() => scrollToSection('inquiry')}
      />

      {/* 2. 시간표 (1박 2일 전체 타임테이블 Day 1 & Day 2 Schedule) */}
      <TimelineSection />

      {/* 3. 상세 프로그램 안내 (사유원, 화본역&옛날옛적에, 미술관, 황리단길) */}
      <ProgramSection
        selectedProgramId={selectedProgramId}
        onSelectProgram={(id) => setSelectedProgramId(id)}
      />

      {/* 4. 숙소 (경주 힐튼호텔 5성급 숙박 & 만찬) */}
      <HotelSection />

      {/* 5. 기타사항 (문의, FAQ, 지참 준비물, 셔틀버스) */}
      <InquirySection />

      {/* Footer */}
      <Footer />

      {/* Application Procedure Guide Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#ebdccd] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#f4ebe1] text-[#786c62] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-[#a03f31] bg-[#faece8] px-3 py-1 rounded-full w-fit mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>사내 포털 신청 매뉴얼</span>
            </div>

            <h3 className="text-xl font-bold text-[#272320] font-serif-kr mb-2">
              부드럽 과정 참가 신청 절차
            </h3>
            <p className="text-xs text-[#6e6359] leading-relaxed mb-5">
              도레이첨단소재 사내 인트라넷을 통해 손쉽게 참가 신청 및 세부 정보를 등록하실 수 있습니다.
            </p>

            {/* Step by step */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf7f2] border border-[#eee3d7]">
                <span className="w-6 h-6 rounded-full bg-[#a03f31] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#2d2926]">사내 그룹웨어 포털 접속</h4>
                  <p className="text-[11px] text-[#70645a] mt-0.5">
                    사내 PC 또는 모바일 사내 앱에서 [HR / 교육포털]에 로그인합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf7f2] border border-[#eee3d7]">
                <span className="w-6 h-6 rounded-full bg-[#a03f31] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#2d2926]">
                    [부드럽 과정] 메뉴 선택 &amp; 참가 정보 등록
                  </h4>
                  <p className="text-[11px] text-[#70645a] mt-0.5">
                    1박 2일 일정 참석 여부와 동반 배우자 성명 및 출발 승차지를 체크합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf7f2] border border-[#eee3d7]">
                <span className="w-6 h-6 rounded-full bg-[#a03f31] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold text-[#2d2926]">
                    소속 부서장 승인 및 최종 선발 통보
                  </h4>
                  <p className="text-[11px] text-[#70645a] mt-0.5">
                    부서 근무 일정 조율 후 신청이 완료되며, 선발자에게는 개별 문자 및 확정 카카오 알림톡이 발송됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#f5ede5] text-xs text-[#5f544a] mb-5">
              <div className="font-bold text-[#352f2a] mb-1">📌 유의 사항</div>
              <div>• 전 일정 부부동반 원칙이며 100% 회사 경비 및 유급 교육 처리됩니다.</div>
              <div>• 신청 인원 초과 시 최근 연수 미참석자 우선 선발 및 추첨 진행됩니다.</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 py-3 rounded-xl bg-[#a03f31] hover:bg-[#8c3427] text-white font-bold text-xs transition-colors text-center"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

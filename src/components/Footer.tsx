import React from 'react';
import { Heart, Shield, ArrowUp } from 'lucide-react';
import { RETREAT_INFO, CONTACT_INFO } from '../data/retreatData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#24211e] text-[#d6cec5] pt-14 pb-12 border-t border-[#3a3530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#3d3732]">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-lg tracking-tight font-serif-kr">
                {RETREAT_INFO.companyName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#3a322c] text-[#d98b7e] font-semibold">
                {RETREAT_INFO.courseName}
              </span>
            </div>
            <p className="text-xs text-[#a99e93] leading-relaxed max-w-md">
              현장의 땀방울과 헌신으로 도레이첨단소재의 성장을 이끌어 오신 현장 반장님과
              묵묵히 곁을 지켜준 배우자를 위한 프리미엄 부부동반 리트릿 과정입니다.
            </p>
            <div className="text-[11px] text-[#857b70] flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#d98b7e]" />
              <span>주관: {CONTACT_INFO.organization}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="text-sm font-bold text-white font-serif-kr mb-3">
              빠른 바로가기
            </h5>
            <ul className="space-y-2 text-[#b0a498]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  과정소개 (홈)
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-white transition-colors">
                  상세 프로그램
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-white transition-colors">
                  자주 묻는 질문 (FAQ)
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-white transition-colors">
                  1:1 문의 및 신청 안내
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h5 className="text-sm font-bold text-white font-serif-kr mb-3">
              {CONTACT_INFO.operationTeam} 연락처
            </h5>
            <div className="text-[#b0a498] space-y-1">
              <div>사내 핫라인: {CONTACT_INFO.hotline}</div>
              <div>행사 핫라인: {CONTACT_INFO.mobileHotline}</div>
              <div>이메일: {CONTACT_INFO.email}</div>
              <div className="text-[#7d7369] pt-1">
                {CONTACT_INFO.operatingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#82786e]">
          <div>
            © 2026 Toray Advanced Materials Korea Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              부부가 함께 더 부드럽게 성장하는 시간
              <Heart className="w-3 h-3 text-[#d98b7e] fill-[#d98b7e]" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#332e29] hover:bg-[#423c36] text-white transition-colors flex items-center gap-1"
              title="맨 위로 가기"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px]">TOP</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

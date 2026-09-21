import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Heart, Calendar, MapPin, Compass, Building2, HelpCircle } from 'lucide-react';
import { RETREAT_INFO, PROGRAMS_DATA } from '../data/retreatData';

interface NavbarProps {
  activeSection: string;
  onSelectProgram?: (programId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectProgram }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'intro' | 'program' | 'hotel' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleProgramClick = (programId: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    if (programId === 'hilton-gyeongju') {
      scrollToSection('hotel');
      return;
    }
    if (onSelectProgram) {
      onSelectProgram(programId);
    }
    scrollToSection('program');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#faf7f2]/95 backdrop-blur-md shadow-sm border-b border-[#ebdccd]/80 py-2.5'
          : 'bg-[#faf7f2]/80 backdrop-blur-sm border-b border-[#f0e4d7] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Course Brand */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 text-left group focus:outline-none py-1"
            id="nav-logo-btn"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#786c62] font-medium leading-tight">
                  2026년 부부동반 반장워크숍 &lt;부드럽: 부부+Dream+Love&gt;과정
                </span>
              </div>
              <h1 className="text-lg font-bold text-[#2d2926] tracking-tight font-serif-kr flex items-center gap-1.5">
                부드럽 과정
                <Heart className="w-3.5 h-3.5 text-[#d97768] fill-[#d97768]" />
              </h1>
            </div>
          </button>

          {/* Desktop Navigation (4 Categories with Subcategories) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* 1. 과정소개 (하위: 시간표) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('intro')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-home-btn"
                onClick={() => scrollToSection('home')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'home' || activeSection === 'schedule'
                    ? 'text-[#9e4334] bg-[#f7ebe7] font-semibold'
                    : 'text-[#585149] hover:text-[#2d2926] hover:bg-[#f0e6dc]/60'
                }`}
              >
                <span>과정소개</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'intro' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'intro' && (
                <div className="absolute left-0 mt-1 w-44 rounded-2xl bg-white shadow-xl border border-[#ebdccd] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8b7d72] border-b border-[#f3e9df] mb-1">
                    과정 안내
                  </div>
                  <button
                    onClick={() => scrollToSection('schedule')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] text-[#3c342d] hover:text-[#9e4334] transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#9e4334]" />
                    <span className="font-medium">시간표</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. 프로그램 (하위: 군위 사유원, 화본역&엄마아빠 옛날옛적에, 경주 감성 미술관, 황리단길 자유투어) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('program')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-program-dropdown-trigger"
                onClick={() => scrollToSection('program')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'program'
                    ? 'text-[#9e4334] bg-[#f7ebe7] font-semibold'
                    : 'text-[#585149] hover:text-[#2d2926] hover:bg-[#f0e6dc]/60'
                }`}
              >
                <span>프로그램</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'program' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'program' && (
                <div className="absolute left-0 mt-1 w-64 rounded-2xl bg-white shadow-xl border border-[#ebdccd] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8b7d72] border-b border-[#f3e9df] mb-1 flex items-center justify-between">
                    <span>코스 프로그램</span>
                    <span className="text-[10px] text-[#9e4334] bg-[#faebe8] px-1.5 py-0.5 rounded">
                      4개 코스
                    </span>
                  </div>

                  {/* 군위 사유원 */}
                  <button
                    onClick={() => handleProgramClick('sayuwon')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] group transition-colors flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f4e9e1] text-[#9e4334] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <div className="font-medium text-[#2d2926] group-hover:text-[#9e4334] text-xs">
                      군위 사유원
                    </div>
                  </button>

                  {/* 화본역&엄마아빠 옛날옛적에 */}
                  <button
                    onClick={() => handleProgramClick('hwabon-station')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] group transition-colors flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f4e9e1] text-[#9e4334] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <div className="font-medium text-[#2d2926] group-hover:text-[#9e4334] text-xs leading-snug">
                      화본역 &amp; 엄마아빠 옛날옛적에
                    </div>
                  </button>

                  {/* 미술관 */}
                  <button
                    onClick={() => handleProgramClick('oar-museum')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] group transition-colors flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f4e9e1] text-[#9e4334] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <div className="font-medium text-[#2d2926] group-hover:text-[#9e4334] text-xs">
                      경주 감성 미술관
                    </div>
                  </button>

                  {/* 황리단길 자유투어 */}
                  <button
                    onClick={() => handleProgramClick('hwangridan-street')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] group transition-colors flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#f4e9e1] text-[#9e4334] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      4
                    </span>
                    <div className="font-medium text-[#2d2926] group-hover:text-[#9e4334] text-xs">
                      황리단길 자유투어
                    </div>
                  </button>

                  <div className="mt-1 pt-1.5 border-t border-[#f3e9df]">
                    <button
                      onClick={() => scrollToSection('program')}
                      className="w-full py-1.5 text-center text-xs font-medium text-[#9e4334] hover:underline"
                    >
                      전체 프로그램 보기 →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. 숙소 (하위: 경주 힐튼호텔) */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('hotel')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                id="nav-hotel-dropdown-trigger"
                onClick={() => scrollToSection('hotel')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === 'hotel'
                    ? 'text-[#9e4334] bg-[#f7ebe7] font-semibold'
                    : 'text-[#585149] hover:text-[#2d2926] hover:bg-[#f0e6dc]/60'
                }`}
              >
                <span>숙소</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'hotel' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === 'hotel' && (
                <div className="absolute left-0 mt-1 w-52 rounded-2xl bg-white shadow-xl border border-[#ebdccd] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8b7d72] border-b border-[#f3e9df] mb-1">
                    숙소 상세 안내
                  </div>
                  <button
                    onClick={() => scrollToSection('hotel')}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-[#fcf8f5] group transition-colors flex items-center gap-2.5"
                  >
                    <Building2 className="w-4 h-4 text-[#9e4334] flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#2d2926] group-hover:text-[#9e4334] text-xs">
                        경주 힐튼호텔
                      </div>
                      <div className="text-[10px] text-[#867a70]">
                        5성급 디럭스 &amp; 디너 만찬
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. 기타사항 */}
            <button
              id="nav-inquiry-btn"
              onClick={() => scrollToSection('inquiry')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'inquiry'
                  ? 'text-[#9e4334] bg-[#f7ebe7] font-semibold'
                  : 'text-[#585149] hover:text-[#2d2926] hover:bg-[#f0e6dc]/60'
              }`}
            >
              기타사항
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#4a423b] hover:bg-[#eee3d7] transition-colors focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf7f2] border-b border-[#e6d8c9] px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-2">
            {/* 1. 과정소개 */}
            <div className="bg-white/80 rounded-2xl p-3 border border-[#ede2d6]">
              <div className="font-bold text-xs text-[#9e4334] mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>과정소개</span>
              </div>
              <div className="pl-2 space-y-1">
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334] flex items-center gap-2"
                >
                  <span>• 시간표</span>
                </button>
              </div>
            </div>

            {/* 2. 프로그램 */}
            <div className="bg-white/80 rounded-2xl p-3 border border-[#ede2d6]">
              <div className="font-bold text-xs text-[#9e4334] mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>프로그램</span>
              </div>
              <div className="pl-2 space-y-1">
                <button
                  onClick={() => handleProgramClick('sayuwon')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334]"
                >
                  • 군위 사유원
                </button>
                <button
                  onClick={() => handleProgramClick('hwabon-station')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334]"
                >
                  • 화본역 &amp; 엄마아빠 옛날옛적에
                </button>
                <button
                  onClick={() => handleProgramClick('oar-museum')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334]"
                >
                  • 경주 감성 미술관
                </button>
                <button
                  onClick={() => handleProgramClick('hwangridan-street')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334]"
                >
                  • 황리단길 자유투어
                </button>
              </div>
            </div>

            {/* 3. 숙소 */}
            <div className="bg-white/80 rounded-2xl p-3 border border-[#ede2d6]">
              <div className="font-bold text-xs text-[#9e4334] mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>숙소</span>
              </div>
              <div className="pl-2">
                <button
                  onClick={() => scrollToSection('hotel')}
                  className="w-full text-left py-1.5 px-2 text-xs font-medium text-[#4b433c] hover:text-[#9e4334]"
                >
                  • 경주 힐튼호텔 (5성급)
                </button>
              </div>
            </div>

            {/* 4. 기타사항 */}
            <button
              onClick={() => scrollToSection('inquiry')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                activeSection === 'inquiry'
                  ? 'bg-[#f7ebe7] text-[#9e4334] font-bold'
                  : 'text-[#443e38] hover:bg-[#f0e4d7]'
              }`}
            >
              💬 기타사항 (문의 &amp; 준비물 &amp; 셔틀버스)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


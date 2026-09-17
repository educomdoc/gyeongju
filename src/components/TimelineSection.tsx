import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Bus,
  Camera,
  Utensils,
  Trees,
  Hotel,
  Sparkles,
  Moon,
  Coffee,
  Palette,
  Compass,
  Award,
  ChevronDown,
} from 'lucide-react';
import { TIMELINE_DATA } from '../data/retreatData';
import { TimelineItem } from '../types';

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Items = TIMELINE_DATA.filter((item) => item.day === 1);
  const day2Items = TIMELINE_DATA.filter((item) => item.day === 2);

  const currentItems = activeDay === 1 ? day1Items : day2Items;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bus':
        return <Bus className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      case 'Trees':
        return <Trees className="w-4 h-4" />;
      case 'Hotel':
        return <Hotel className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Moon':
        return <Moon className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      case 'Award':
        return <Award className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case '이동':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '프로그램':
        return 'bg-[#faede9] text-[#a03f31] border-[#f0d0c8]';
      case '식사':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case '휴식':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case '이벤트':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <section id="schedule" className="py-16 md:py-24 bg-[#f8f5ee] border-t border-[#ebdccd]/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4e4df] text-[#a03f31] text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>1박 2일 전체 일정표</span>
          </div>
          <h2 className="text-3xl font-bold text-[#262320] font-serif-kr">
            시간표
          </h2>
          <p className="text-xs sm:text-sm text-[#6c6055] mt-2">
            무리한 이동 없이 부부가 온전히 쉬고 즐길 수 있도록 여유롭게 구성된 일정입니다.
          </p>

          {/* Day 1 / Day 2 Tab Selector */}
          <div className="inline-flex p-1.5 bg-[#ebdccd]/70 rounded-2xl mt-6">
            <button
              onClick={() => setActiveDay(1)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeDay === 1
                  ? 'bg-white text-[#a03f31] shadow-sm'
                  : 'text-[#685e54] hover:text-[#2c2824]'
              }`}
            >
              <span>1일차</span>
              <span className="text-[11px] font-normal opacity-80">
                나를 비우고 자연을 담다
              </span>
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeDay === 2
                  ? 'bg-white text-[#a03f31] shadow-sm'
                  : 'text-[#685e54] hover:text-[#2c2824]'
              }`}
            >
              <span>2일차</span>
              <span className="text-[11px] font-normal opacity-80">
                내면을 채우고 문화를 향유하다
              </span>
            </button>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#e2d5c5] space-y-6 ml-2 sm:ml-4">
          {currentItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Timeline Pin Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#a03f31] flex items-center justify-center text-[#a03f31] shadow-sm group-hover:scale-110 transition-transform">
                {renderIcon(item.iconName)}
              </div>

              {/* Timeline Content Card */}
              <div className="bg-white rounded-2xl p-5 border border-[#eadcd0] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-[#a03f31] font-mono">
                      {item.time}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  {item.highlight && (
                    <span className="text-xs font-semibold text-[#a03f31] bg-[#fbf2ef] px-2.5 py-1 rounded-md border border-[#f5dbd5]">
                      ★ {item.highlight}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#272320] font-serif-kr">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-[#7d7166] mt-1 mb-2.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a03f31] flex-shrink-0" />
                  <span>{item.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#544b43] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 p-4 rounded-2xl bg-white/70 border border-[#e4d6c6] text-center text-xs text-[#72675e]">
          ※ 현지 기상 상황 및 도로 교통 여건에 따라 일정이 소폭 조정될 수 있습니다.
        </div>
      </div>
    </section>
  );
};

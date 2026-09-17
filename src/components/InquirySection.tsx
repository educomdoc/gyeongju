import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  CheckSquare,
  Square,
  Phone,
  Mail,
  Clock,
  Send,
  Sparkles,
  ChevronDown,
  Bus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  FAQ_LIST,
  PACKING_ITEMS,
  CONTACT_INFO,
} from '../data/retreatData';
import { FAQItem, InquiryFormData } from '../types';

export const InquirySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'packing' | 'bus' | 'form'>('faq');
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [faqFilter, setFaqFilter] = useState<string>('ALL');

  // Packing checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Form state
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    employeeId: '',
    plant: '구미 사업장',
    contact: '',
    spouseName: '',
    participationType: '1박 2일 부부동반 참석',
    inquiryType: '일정 및 신청 문의',
    content: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.content.trim()) {
      setSubmitError('성명, 연락처, 문의 내용을 입력해 주세요.');
      return;
    }
    setSubmitError('');
    setIsSubmitted(true);
  };

  const filteredFaqs = FAQ_LIST.filter((faq) => {
    if (faqFilter === 'ALL') return true;
    return faq.category === faqFilter;
  });

  return (
    <section id="inquiry" className="py-20 md:py-28 bg-[#faf7f2] border-t border-[#ebdccd]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4e4df] text-[#a03f31] text-xs font-semibold mb-3 border border-[#ecd2cb]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>도레이첨단소재 인사팀 인재개발파트</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292522] font-serif-kr tracking-tight mb-4">
            기타사항 및 문의 안내
          </h2>
          <p className="text-[#685e54] text-sm sm:text-base leading-relaxed">
            자주 묻는 질문(FAQ), 지참 준비물 체크리스트, 사업장별 셔틀버스 안내부터
            1:1 개별 문의 접수까지 편안한 참가를 위해 필요한 모든 정보를 확인하세요.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'faq'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#63574c] border border-[#e2d5c6] hover:bg-[#f5ede3]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>자주 묻는 질문 (FAQ)</span>
            </button>
            <button
              onClick={() => setActiveTab('packing')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'packing'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#63574c] border border-[#e2d5c6] hover:bg-[#f5ede3]'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>준비물 & 제공 품목</span>
            </button>
            <button
              onClick={() => setActiveTab('bus')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'bus'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#63574c] border border-[#e2d5c6] hover:bg-[#f5ede3]'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>사업장별 셔틀버스</span>
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-[#a03f31] text-white shadow-sm'
                  : 'bg-white text-[#63574c] border border-[#e2d5c6] hover:bg-[#f5ede3]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>1:1 문의 접수</span>
            </button>
          </div>
        </div>

        {/* Content Tabs Area */}
        <div className="max-w-4xl mx-auto">
          {/* TAB 1: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5 pb-2 justify-center sm:justify-start">
                {['ALL', '신청/대상', '숙소/식사', '교통/이동', '복장/기타'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      faqFilter === cat
                        ? 'bg-[#292522] text-white'
                        : 'bg-white text-[#665a4f] border border-[#e5d8cb] hover:bg-[#f5ece2]'
                    }`}
                  >
                    {cat === 'ALL' ? '전체 카테고리' : cat}
                  </button>
                ))}
              </div>

              {/* Accordion List */}
              <div className="space-y-3">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl border border-[#ebdccd] overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 hover:bg-[#fcf8f4] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#f8ebe7] text-[#a03f31] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            Q
                          </span>
                          <div>
                            <span className="text-[11px] font-semibold text-[#8e8175] bg-[#f5ede4] px-2 py-0.5 rounded mr-2">
                              {faq.category}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-[#2d2926]">
                              {faq.question}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#8c8075] transition-transform duration-200 flex-shrink-0 ${
                            isOpen ? 'rotate-180 text-[#a03f31]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#544b43] leading-relaxed border-t border-[#f3e9df] bg-[#faf6f1]/50">
                          <div className="flex items-start gap-3 pt-3">
                            <span className="w-6 h-6 rounded-full bg-[#e8efe9] text-[#2c614e] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              A
                            </span>
                            <div className="flex-1 whitespace-pre-line">{faq.answer}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PACKING CHECKLIST */}
          {activeTab === 'packing' && (
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#f1e6da] pb-4 mb-6">
                <h3 className="text-lg font-bold text-[#282320] font-serif-kr">
                  1박 2일 부부 여행 가방 챙기기
                </h3>
                <p className="text-xs text-[#786c62] mt-1">
                  체크박스를 클릭하여 짐 싸기가 완료된 항목을 표시해 보세요.
                </p>
              </div>

              {/* Groups: 필수 지참 vs 추천 준비물 vs 제공 품목 */}
              <div className="space-y-6">
                {/* 1. 필수 지참 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                      필수 지참
                    </span>
                    <span className="text-xs text-[#7a6e64]">
                      출발 전 반드시 확인해 주세요
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PACKING_ITEMS.filter((i) => i.category === '필수 지참').map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheckItem(item.id)}
                          className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                            isChecked
                              ? 'bg-[#f4efe8] border-[#dfd3c5] opacity-60 line-through'
                              : 'bg-[#faf7f2] border-[#ebdccd] hover:border-[#a03f31]'
                          }`}
                        >
                          <div className="mt-0.5 text-[#a03f31]">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 fill-[#a03f31] text-white" />
                            ) : (
                              <Square className="w-5 h-5 text-[#8e8175]" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#2d2926]">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#786c62] mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 추천 준비물 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      추천 준비물
                    </span>
                    <span className="text-xs text-[#7a6e64]">
                      더욱 편안한 여정을 위한 아이템
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PACKING_ITEMS.filter((i) => i.category === '추천 준비물').map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleCheckItem(item.id)}
                          className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                            isChecked
                              ? 'bg-[#f4efe8] border-[#dfd3c5] opacity-60 line-through'
                              : 'bg-[#faf7f2] border-[#ebdccd] hover:border-[#a03f31]'
                          }`}
                        >
                          <div className="mt-0.5 text-[#a03f31]">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 fill-[#a03f31] text-white" />
                            ) : (
                              <Square className="w-5 h-5 text-[#8e8175]" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#2d2926]">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-[#786c62] mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 회사 제공 품목 */}
                <div className="bg-[#fcf5f3] rounded-2xl p-5 border border-[#f5dad4]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#a03f31] text-white text-xs font-bold">
                      회사 100% 제공 품목
                    </span>
                    <span className="text-xs text-[#8e4537] font-semibold">
                      별도로 챙기실 필요가 없습니다
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PACKING_ITEMS.filter((i) => i.category === '제공 품목').map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-3 rounded-xl border border-[#ebd3cb] flex items-start gap-2.5"
                      >
                        <span className="text-[#a03f31] font-bold text-xs mt-0.5">🎁</span>
                        <div>
                          <div className="text-xs font-bold text-[#2c2824]">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-[#776b61] mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHUTTLE BUS LOCATIONS */}
          {activeTab === 'bus' && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-sm">
                <div className="border-b border-[#f1e6da] pb-4 mb-6">
                  <h3 className="text-lg font-bold text-[#282320] font-serif-kr">
                    사업장별 전세 리무진 버스 탑승 안내
                  </h3>
                  <p className="text-xs text-[#786c62] mt-1">
                    정시 출발하므로 출발 시간 10분 전까지 지정 승차장에 집결해 주시기 바랍니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONTACT_INFO.busLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#faf6f1] border border-[#eadcd0] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#a03f31] bg-[#f8eae6] px-2.5 py-0.5 rounded-full">
                            탑승지 {idx + 1}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {loc.departureTime}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#262320] font-serif-kr">
                          {loc.plant}
                        </h4>
                        <p className="text-xs text-[#63574c] mt-2 flex items-start gap-1.5">
                          <Bus className="w-3.5 h-3.5 text-[#a03f31] flex-shrink-0 mt-0.5" />
                          <span>{loc.pickupPoint}</span>
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#eee2d6] text-[11px] text-[#867a70]">
                        ※ 버스 내 음료, 모닝 샌드위치, 과일 간식 박스가 비치되어 있습니다.
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-[#f5ede5] text-xs text-[#63574c] leading-relaxed">
                  <strong>💡 자가용 개별 이동 희망 시:</strong>
                  <br />
                  Day 1 10:30까지 첫 번째 목적지인 <strong>‘군위 화본역’</strong> 주차장으로
                  직접 오시면 됩니다. (개별 유류비 및 톨게이트 비용 사후 영수증 청구 지원)
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 1:1 INQUIRY FORM */}
          {activeTab === 'form' && (
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#f1e6da] pb-4 mb-6">
                <h3 className="text-lg font-bold text-[#282320] font-serif-kr">
                  1:1 문의 및 건의사항 접수
                </h3>
                <p className="text-xs text-[#786c62] mt-1">
                  신청 전 궁금한 점이나 일정 조정, 특이사항(식이 알레르기 등)을 남겨주시면
                  인사팀 인재개발파트에서 신속히 안내해 드립니다.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#292522] font-serif-kr mb-2">
                    문의가 성공적으로 접수되었습니다.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#675b51] max-w-md mx-auto mb-6">
                    접수해 주신 내용({formData.inquiryType})은 확인 후 입력하신 연락처(
                    {formData.contact})로 24시간 이내에 친절하게 답변드리겠습니다.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        employeeId: '',
                        plant: '구미 사업장',
                        contact: '',
                        spouseName: '',
                        participationType: '1박 2일 부부동반 참석',
                        inquiryType: '일정 및 신청 문의',
                        content: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#292522] text-white text-xs font-semibold hover:bg-black transition-colors"
                  >
                    추가 문의 작성하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        반장님 성명 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="예: 홍길동"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        사번 (선택)
                      </label>
                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleFormChange}
                        placeholder="사원번호 6~8자리"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        소속 사업장 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="plant"
                        value={formData.plant}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                      >
                        <option value="구미 사업장 (1·2·3공장)">구미 사업장 (1·2·3공장)</option>
                        <option value="군산 사업장">군산 사업장</option>
                        <option value="안성 사업장">안성 사업장</option>
                        <option value="서울 본사 / R&D">서울 본사 / R&D</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        연락처 (휴대전화) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleFormChange}
                        placeholder="010-0000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        참가 유형
                      </label>
                      <select
                        name="participationType"
                        value={formData.participationType}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                      >
                        <option value="1박 2일 부부동반 참석">1박 2일 부부동반 참석</option>
                        <option value="일정 및 세부사항 상담 희망">일정 및 세부사항 상담 희망</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                        문의 유형 <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleFormChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white"
                      >
                        <option value="일정 및 신청 문의">일정 및 신청 문의</option>
                        <option value="일정 변경 / 취소 문의">일정 변경 / 취소 문의</option>
                        <option value="숙소 및 식사(알레르기) 요청">
                          숙소 및 식사(알레르기) 요청
                        </option>
                        <option value="교통 및 자가용 이용 문의">
                          교통 및 자가용 이용 문의
                        </option>
                        <option value="기타 건의사항">기타 건의사항</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4a4239] mb-1.5">
                      문의 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      rows={4}
                      value={formData.content}
                      onChange={handleFormChange}
                      placeholder="궁금하신 내용이나 요청사항을 자유롭게 기재해 주세요."
                      className="w-full p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd3c5] text-xs sm:text-sm focus:outline-none focus:border-[#a03f31] focus:bg-white resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#a03f31] hover:bg-[#8d3528] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#a03f31]/20 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>문의 접수하기</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Direct Contact Cards Footer */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ebdccd] shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8eae6] text-[#a03f31] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8a7d72]">대표 전화 (구미/서울)</div>
                <div className="text-xs sm:text-sm font-bold text-[#282420] mt-0.5">
                  {CONTACT_INFO.hotline}
                </div>
                <div className="text-[11px] text-[#73685e] mt-1">
                  현장 핫라인: {CONTACT_INFO.mobileHotline}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ebdccd] shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8eae6] text-[#a03f31] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8a7d72]">공식 문의 이메일</div>
                <div className="text-xs sm:text-sm font-bold text-[#282420] mt-0.5">
                  {CONTACT_INFO.email}
                </div>
                <div className="text-[11px] text-[#73685e] mt-1">
                  인사팀 인재개발파트
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#ebdccd] shadow-sm flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#f8eae6] text-[#a03f31] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8a7d72]">운영 안내 시간</div>
                <div className="text-xs sm:text-sm font-bold text-[#282420] mt-0.5">
                  평일 09:00 ~ 18:00
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  행사 기간 중 24시간 상황실
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export interface SessionInfo {
  round: number;
  title: string;
  startDate: string;
  endDate: string;
  dateString: string;
  seasonBadge: string;
  status: '접수예정' | '접수중' | '접수마감' | '진행완료';
}

export interface ProgramItem {
  id: string;
  name: string;
  nameEn: string;
  shortDescription: string;
  description: string;
  locationName: string;
  address: string;
  roadAddress: string;
  estimatedTime: string;
  day: 'Day 1' | 'Day 2';
  scheduleSlot: string;
  category: string;
  highlights: string[];
  coupleActivity: string;
  tips: string[];
  tags: string[];
  imageUrl: string;
  mapKakaoUrl: string;
  mapNaverUrl: string;
}

export interface TimelineItem {
  time: string;
  day: 1 | 2;
  title: string;
  location: string;
  category: '이동' | '프로그램' | '식사' | '휴식' | '이벤트';
  description: string;
  highlight?: string;
  iconName: string;
}

export interface FAQItem {
  id: number;
  category: '신청/대상' | '숙소/식사' | '교통/이동' | '복장/기타';
  question: string;
  answer: string;
}

export interface PackingItem {
  id: string;
  label: string;
  category: '필수 지참' | '추천 준비물' | '제공 품목';
  description: string;
  isProvided?: boolean;
}

export interface InquiryFormData {
  name: string;
  employeeId: string;
  plant: string;
  contact: string;
  spouseName: string;
  participationType: string;
  inquiryType: string;
  content: string;
}

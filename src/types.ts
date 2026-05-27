export interface Department {
  name: string;
  engName?: string;
  description: string;
  careers: string[];
  curriculum: string[];
}

export interface College {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  iconName: 'BookOpen' | 'Briefcase' | 'Cpu' | 'GraduationCap' | 'Palette' | 'HeartPulse';
  departments: Department[];
}

export interface NewsItem {
  id: string;
  category: '일반공지' | '학사공지' | '장학공지';
  title: string;
  description: string;
  image: string;
  date: string;
  views: number;
}

export interface CampusLocation {
  id: string;
  name: string;
  nameKr: string;
  image: string;
  description: string;
  facts: string[];
  hours: string;
  facilities: string[];
}

export interface AcademicEvent {
  id: string;
  dateRange: string;
  title: string;
  important: boolean;
}

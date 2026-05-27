import { College, NewsItem, CampusLocation, AcademicEvent } from './types';

export const collegesData: College[] = [
  {
    id: 'humanities',
    name: '인문사회대학',
    description: '인간과 사회에 대한 깊은 이해를 바탕으로 미래 사회를 이끌어갈 교양인 양성',
    fullDescription: '급변하는 현대 문명과 글로벌 시대 속에서 인류 문명학적 지식을 탐구하고, 공동체의 발전에 기여할 문화 리더와 행정 수호 전문가들을 육성합니다.',
    iconName: 'BookOpen',
    departments: [
      {
        name: '정치행정학과',
        engName: 'Political Science & Public Administration',
        description: '국가 정책과 공공 행정 서비스에 전문성을 지닌 공무원 및 정책기획가 양성',
        careers: ['중앙정부 공무원', '지방자치단체 공무원', '공기업 주무관', '정책연구소 연구원'],
        curriculum: ['1학년: 행정학개론, 정치학원론', '2학년: 행정조직론, 정책학원론', '3학년: 인사행정론, 지방자치론', '4학년: 복지행정론, 국가안보론']
      },
      {
        name: '미디어콘텐츠전공',
        engName: 'Media & Contents',
        description: '디지털 영상, 방송 콘텐츠, 소셜 미디어 기획 및 제작 능력을 지닌 미디어 전문 인재 양성',
        careers: ['PD/방송 연출가', '콘텐츠 크리에이터', '홍보 대행사 기획원', '신문·방송 기자'],
        curriculum: ['1학년: 미디어사회개론, 뉴미디어론', '2학년: 디지털영상제작, 미디어글쓰기', '3학년: 방송이벤트기획, 모바일콘텐츠제작', '4학년: 저널리즘비평, 졸업작품워크숍']
      },
      {
        name: '국어문창창작학과',
        engName: 'Korean Language & Creative Writing',
        description: '한국의 정서에 대한 깊은 탐색과 창의적인 글쓰기 훈련을 통한 전문 작가 및 출판인 양성',
        careers: ['소설가/시인', '방송 작가', '에디터 및 카피라이터', '독서 지도가'],
        curriculum: ['1학년: 문학개론, 작문 기초', '2학년: 한국현대문학사, 창작 실습', '3학년: 시 창작론, 소설 창작론', '4학년: 문화콘텐츠기획론, 졸업문집기획']
      }
    ]
  },
  {
    id: 'business',
    name: '비즈니스대학',
    description: '글로벌 비즈니스 환경을 선도하는 전문 경영인 및 실무 인재 양성',
    fullDescription: 'ESG 상생 경영과 빅데이터 혁신에 최적화된 고도화된 글로벌 상경 학문 체계를 갖추어 아시아 리딩 비즈니스 전사를 양성합니다.',
    iconName: 'Briefcase',
    departments: [
      {
        name: '경영학과',
        engName: 'Business Administration',
        description: '기업 지배구조 분석, 인사관리, 마케팅 전략 등 실전 비즈니스 정수 교육',
        careers: ['대기업 기획실원', '조직 인사 컨설턴트', '스타트업 창업가', '금융 컨설턴트'],
        curriculum: ['1학년: 경영학원론, 마케팅관리론', '2학년: 인적자원관리, 기업재무이론', '3학년: 생산운영기획, 브랜드마케팅', '4학년: 전략경영원론, 비즈니스게임세미나']
      },
      {
        name: '호텔외식경영학과',
        engName: 'Hotel & Food Service Management',
        description: 'MICE 관광 산업 및 글로벌 하이엔드 호텔외식업계를 견인할 전문 호스피탈리티 인재 양성',
        careers: ['글로벌 리조트 매니저', 'F&B 디렉터', '컨벤션 서비스 기획자', '바리스타/소믈리에 전문가'],
        curriculum: ['1학년: 환대산업론, 식음료관리론', '2학년: 호텔프런트온라인, 조리이론실습', '3학년: 호텔마케팅전략, 와인학실무', '4학년: 호텔창업론, 외식기업경영론']
      }
    ]
  },
  {
    id: 'engineering',
    name: '공과대학',
    description: '첨단 기술 혁신을 주도하는 창의적이고 융합적인 공학 인재 양성',
    fullDescription: '인공지능, 초전도·반도체 신소재, 친환경 스마트 시티 설계를 이끌 실전형 공학 패러다임을 혁신합니다.',
    iconName: 'Cpu',
    departments: [
      {
        name: '컴퓨터정보공학과',
        engName: 'Computer Information Engineering',
        description: '웹/앱 아키텍처, 딥러닝 AI, 클라우드 서버 설계 및 정보 보안 역량을 함양',
        careers: ['풀스택 개발자', 'AI 서비스 모델러', '클라우드 인프라 아키텍트', '정보보안 관제관'],
        curriculum: ['1학년: 파이썬프로그래밍, C언어입문', '2학년: 알고리즘분석, 자료구조와실습', '3학년: 웹프레임워크실무, 운영체제설계', '4학년: 인공지능응용, 졸업작품캡스톤디자인']
      },
      {
        name: '반도체공학과',
        engName: 'Semiconductor Engineering',
        description: '실리콘 웨이퍼 공정, 시스템 반도체 설계, 차세대 뉴로모픽 반도체 아키텍처 연마',
        careers: ['반도체 노광 공정 엔지니어', 'IC 회로 설계 연구원', '디바이스 소자 분석가', 'fab 모니터링 주무관'],
        curriculum: ['1학년: 물리확률론, 전기전자회로의기초', '2학년: 전자기학응용, 반도체물리학', '3학년: 반도체공정설계, 아날로그IC설계', '4학년: 메모리소자론, 나노팹실습공정']
      }
    ]
  },
  {
    id: 'education',
    name: '사범대학',
    description: '우수한 인성과 실력을 겸비한 미래 지향적 교사 양성',
    fullDescription: '국가 임용고시 최고의 합격률을 지향하며, 디지털 미래 교실 트렌드를 리드할 가치 중심 교육 전문가를 배출합니다.',
    iconName: 'GraduationCap',
    departments: [
      {
        name: '국어교육과',
        engName: 'Korean Language Education',
        description: '올바른 언어적 가치와 문학사를 차세대 주역에게 올바르게 전수할 정교사 육성',
        careers: ['공·사립 중고 교사', '교육 행정 공무원', '논술 및 입시 컨설턴트', '교육 방송 개발자'],
        curriculum: ['1학년: 국어학개론, 공통국어연구', '2학년: 현대시교육론, 문학사교육론', '3학년: 중고교교재연구, 화법교육설계', '4학년: 교육실습(교생실습), 임용고시특강합숙']
      },
      {
        name: '유아교육과',
        engName: 'Early Childhood Education',
        description: '지성과 영적 평온함을 지니고 아동의 첫 사회적 전인 발달을 도울 유치원 정교사 양성',
        careers: ['국공립 유치원 교사', '아동 발달 센터 카운셀러', '완구 및 유아 교재 기획가', '유아 교육 행정 주임'],
        curriculum: ['1학년: 유아교육소론, 놀이지도론', '2학년: 아동복지상담론, 아동정신건강', '3학년: 유치원교육교재, 아동미술지도', '4학년: 보육학세미나, 보육실무실습']
      }
    ]
  },
  {
    id: 'arts',
    name: '예술대학',
    description: '창의적 예술 활동을 통한 문화 예술 분야 리더 양성',
    fullDescription: '장르의 경계를 넘어 신기술과 아날로그 감성을 결합해 뉴미디어 예술과 글로벌 한류 콘텐츠의 주역을 세웁니다.',
    iconName: 'Palette',
    departments: [
      {
        name: '디자인조형학부',
        engName: 'School of Design & Fine Arts',
        description: '모던 시각 브랜딩, 첨단 3D 제품 산업 디자인, 공예 예술을 통해 사물의 가치 극대화',
        careers: ['UX/UI 디자이너', '브랜드 디렉터', '산업 환경 디자이너', '독자 공예 스튜디오 대표'],
        curriculum: ['1학년: 기초소묘드로잉, 입체공간론', '2학년: 디지털그래픽스, 타이포그래피연습', '3학년: UXUI디자인프로젝트, 공예기법실제', '4학년: 졸업컴필레이션전시, 브랜드경영론']
      },
      {
        name: '만화애니메이션학과',
        engName: 'Cartoon & Animation',
        description: '글로벌 웹툰 시장 및 OTT 2D/3D 애니메이션 연출가 양성 프로젝트',
        careers: ['프로 웹툰 연재 작가', '콘티 및 스토리보드 작가', '3D 리깅 애니메이터', '백서 일러스트레이터'],
        curriculum: ['1학년: 캐릭터드로잉기법, 만화연출론', '2학년: 디지털일러스트실무, 애니메이션메커니즘', '3학년: 스토리제작워크숍, 3D모델링과조명', '4학년: 장편웹툰데뷔워크숍, 애니캡스톤']
      }
    ]
  },
  {
    id: 'health',
    name: '보건의료과학대학',
    description: '국민 건강 증진을 선도하는 보건 의료 전문 인력 양성',
    fullDescription: '국가 고시 자격 최적화 교육과 하이테크 임상실습 시뮬레이션을 통해 생명 윤리를 수호할 영웅들을 탄생시킵니다.',
    iconName: 'HeartPulse',
    departments: [
      {
        name: '간호학과',
        engName: 'Department of Nursing',
        description: '임상 전문 지식과 따뜻한 인성을 갖춘 최고의 간호 전사 및 전문 영양·예방 주도 인력 양성',
        careers: ['종합병원 간호사', '보건소 공무원', '손해사정 연계의료 자문', '대학병원 특수실 요원'],
        curriculum: ['1학년: 해부생리학정리, 간호철학윤리', '2학년: 병리학개론, 건강사정과실습', '3학년: 기본간호학실제, 아동보건학', '4학년: 성인간호학임상, 간호국가고시문제연구']
      },
      {
        name: '치위생학과',
        engName: 'Dental Hygiene',
        description: '구강 예방 지킴이로서 고출력 스케일링, 감염 예방 처리, 치과 진료 조정을 선도하는 일원 육성',
        careers: ['치과병원 위생사', '의료기기 기업 세일즈', '구강 보건 위생 전문 강사', '보건 연구 임상실습사'],
        curriculum: ['1학년: 치아형태학, 구강해부학', '2학년: 치과재료학입문, 치과위생임상예방', '3학년: 소아구강보건, 치주치료행정', '4학년: 구강임상학종합, 병원행정실무']
      }
    ]
  }
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    category: '일반공지',
    title: '2024학년도 1학기 국가장학금 신청 안내',
    description: '재학생 및 신입생 여러분의 많은 관심과 신청 바랍니다. 한국장학재단 공식 홈페이지를 통해 기간 내 필히 접수해 주시기 바랍니다.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    date: '2024.05.20',
    views: 3120
  },
  {
    id: 'news-2',
    category: '학사공지',
    title: '하계 계절수업 수강신청 안내',
    description: '하계 계절수업 수강 희망자는 기한 내에 신청하시기 바랍니다. 알찬 방학을 계획하며 한 걸음 더 성장해보세요.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    date: '2024.05.18',
    views: 1845
  },
  {
    id: 'news-3',
    category: '장학공지',
    title: '우수 창업 동아리 글로벌 연수 지원 사업 안내',
    description: '실리콘밸리 글로벌 연수를 통해 여러분의 아이디어를 글로벌 가치로 확대할 10개 혁신 동아리를 발굴 및 지원합니다.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    date: '2024.05.15',
    views: 940
  },
  {
    id: 'news-4',
    category: '일반공지',
    title: '2026학년도 대학입학전형 기본계획 공고 및 전형 변경사항 안내',
    description: '예비 청우인들을 위한 2026학년도 수시/정시 모집 정원 및 모집 단위별 세부 평가 기준에 대한 변경 내용을 사전 안내합니다.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    date: '2024.05.10',
    views: 1420
  }
];

export const campusLocationsData: CampusLocation[] = [
  {
    id: 'library',
    name: 'Central Library',
    nameKr: '중앙도서관',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    description: '중앙도서관은 지식정보화 시대를 이끌어가는 연구와 학습의 중심 공간으로서, 풍부한 장서와 쾌적한 열람실 및 스마트 그룹 스터디룸을 갖추고 있습니다.',
    facts: [
      '국내 대학 도서관 최고 수준의 좌석 및 장서 다량 확보',
      '24시간 개방되는 집중형 열람 공간 및 모바일 좌석 배정 연동',
      '최신 전자 저널 및 학술 데이터베이스 50여 종 무제한 제공'
    ],
    hours: '평일 09:00 - 22:00 (시험기간 24시간 연장열람실 운영)',
    facilities: ['제1-3 노트북 전용 스마트존', '창의융합 컨버전스 스퀘어', '학습 소모임 전용 그룹 스터디룸 (15개)', '영화&VOD 감상 시네마틱 케빈']
  },
  {
    id: 'union',
    name: 'Student Union',
    nameKr: '학생회관',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    description: '학생회관은 청우인들의 뜨거운 소통과 생동감 넘치는 자치 활동이 이루어지는 전진 지지대입니다. 다양한 동아리방, 편의 공간, 대강당이 자리하고 있습니다.',
    facts: [
      '80여 개 중앙동아리 활동을 지원하는 독립 밴드실 및 연습실 완비',
      '학생 복지 지원(우체국, 보건실, 수면 휴게실) 통합 센터',
      '푸드코트형 학생식당 및 파노라마 뷰 학생 라운지 운영'
    ],
    hours: '매일 08:00 - 23:00',
    facilities: ['중앙동아리 룸타운', '학생회 전용 심의실', '복합 문화 갤러리 아울림', 'GS25 편의점 및 스낵스퀘어', '헬스 앤 필라테스 존']
  }
];

export const academicCalendarData: AcademicEvent[] = [
  { id: 'cal-1', dateRange: '2026.06.01 - 2024.06.05', title: '1학기 기말고사 기간', important: true },
  { id: 'cal-2', dateRange: '2026.06.10', title: '하계 계절학기 개강', important: false },
  { id: 'cal-3', dateRange: '2026.07.01 - 2024.07.15', title: '1학기 성정 공시 및 이의신청', important: true },
  { id: 'cal-4', dateRange: '2026.08.01 - 2024.08.10', title: '2학기 복학 및 휴학 신청 접수 기간', important: false },
  { id: 'cal-5', dateRange: '2026.08.17 - 2024.08.21', title: '2학기 수강신청 기간', important: true }
];

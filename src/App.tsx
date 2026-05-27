import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Sparkles, BookOpen, Clock, Heart, Award, Star, Compass } from 'lucide-react';
import Header from './components/Header';
import CollegeExplorer from './components/CollegeExplorer';
import NewsSection from './components/NewsSection';
import AdmissionsSection from './components/AdmissionsSection';
import CampusTour from './components/CampusTour';
import AcademicHub from './components/AcademicHub';
import AskAI from './components/AskAI';
import Footer from './components/Footer';

// Pre-defined slider data matching Image 1 and Image 2 hero banners exactly
const heroSlides = [
  {
    id: 1,
    title: "꿈이 현실이 되는 밝은 미래, 청주대학교",
    subtitle: "함께 성장하며 더 넓은 세상을 향해 나아가는 여러분을 환영합니다",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1400",
    badge: "Welcome to CJU"
  },
  {
    id: 2,
    title: "세상을 바꾸는 힘, 청주대학교",
    subtitle: "미래를 선도하는 글로벌 창의 인재의 요람",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1400",
    badge: "Power of Wisdom"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState('김청우');
  const [selectedAdmissionDept, setSelectedAdmissionDept] = useState<string>('');

  // Auto-scroll hero slide banner
  useEffect(() => {
    if (activeTab !== 'home') return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleSelectDeptForPredict = (deptName: string) => {
    setSelectedAdmissionDept(deptName);
    setActiveTab('admissions');
    
    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdmissions = () => {
    setSelectedAdmissionDept('');
    setActiveTab('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800 antialiased" id="cju-app-root">
      
      {/* Header component */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        studentName={studentName}
        setStudentName={setStudentName}
      />

      {/* Main Container with smooth route transitioning */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
              id="home-view-container"
            >
              {/* 1. Hero Sliding Banner Section */}
              <div className="relative h-[420px] sm:h-[500px] overflow-hidden bg-slate-900 select-none">
                {/* Background sliding images */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0.6, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={heroSlides[currentSlide].image} 
                      alt="청주대학교 배경 캠퍼스"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-65"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right arrow controllers */}
                <button 
                  onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/35 text-white rounded-full transition-colors hidden md:block"
                  aria-label="이전 배너"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/35 text-white rounded-full transition-colors hidden md:block"
                  aria-label="다음 배너"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Slogan and details centering */}
                <div className="absolute inset-x-0 bottom-0 top-0 max-w-[#1200px] mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    key={`text-${currentSlide}`}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="space-y-4"
                  >
                    <span className="inline-block bg-[#00AED9] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {heroSlides[currentSlide].badge}
                    </span>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-md">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-200 drop-shadow-sm font-medium">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </div>

                {/* Circle Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentSlide === idx ? 'w-6 bg-[#00AED9]' : 'w-2.5 bg-white/40'
                      }`}
                      aria-label={`${idx + 1}번 장슬라이드`}
                    />
                  ))}
                </div>
              </div>

              {/* 2. Philosophy Section (건학이념) */}
              <section className="max-w-[760px] mx-auto px-4 sm:px-6 text-center py-6" id="philosophy-section">
                <span className="text-[11px] font-black tracking-widest text-[#00AED9] relative pb-2 block uppercase">
                  FOUNDING PHILOSOPHY
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#00AED9]"></span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black text-[#1D2C5C] mt-4 tracking-tight">
                  실학구세 <span className="font-serif font-black text-gray-500">(實學救世)</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed font-semibold">
                  청주대학교는 &apos;실학구세&apos;의 건학이념 아래, 실용적인 학문을 바탕으로 국가와 인류 사회의 번영에 기여하는 창의적이고 실천적인 인재를 양성합니다.
                </p>
              </section>

              {/* 3. Quick College overview section */}
              <div className="bg-gray-50/60 pb-6 border-y border-gray-150-100">
                <CollegeExplorer onSelectDepartment={handleSelectDeptForPredict} embeddedView={true} />
                <div className="text-center pb-8">
                  <button 
                    onClick={() => { setActiveTab('colleges'); window.scrollTo({ top: 0 }); }}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-white border border-gray-200 hover:border-[#1D2C5C]/25 text-xs text-gray-700 font-extrabold rounded-full shadow-xs transition-colors"
                  >
                    <span>6대 단과대 세부 전공지도 전체보기</span>
                    <ArrowRight size={13} className="text-[#00AED9]" />
                  </button>
                </div>
              </div>

              {/* 4. Combined "청대소식 & 입학안내" section matching screenshot exactly */}
              <section className="max-w-[#1200px] mx-auto px-4 sm:px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column (CJU News lists preview with category highlights) */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-between items-end border-b pb-2.5 border-gray-200">
                      <div>
                        <h3 className="text-lg font-black text-[#1D2C5C] flex items-center gap-1.5">
                          <span className="w-1.5 h-4.5 bg-[#00AED9] rounded-full inline-block"></span>
                          청대소식 
                        </h3>
                      </div>
                      <button 
                        onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0 }); }}
                        className="text-xs text-gray-400 hover:text-[#1D2C5C] font-semibold flex items-center gap-0.5"
                      >
                        더보기 <ChevronRight size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Fake News Card 1 */}
                      <div 
                        onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0 }); }}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-sm cursor-pointer group flex flex-col"
                      >
                        <div className="h-40 overflow-hidden relative bg-gray-150">
                          <img 
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                            alt="국가장학금 신청 대표"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 text-[9px] bg-[#1D2C5C] text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">
                            일반공지
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#00AED9] transition-colors line-clamp-1">
                              2024학년도 1학기 국가장학금 신청 안내
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                              재학생 및 신입생 여러분의 많은 관심과 신청 바랍니다. 기간 내 한국장학재단 온라인 페이지 접수 완료 요망...
                            </p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-3 font-semibold font-mono block">2024.05.20</span>
                        </div>
                      </div>

                      {/* Fake News Card 2 */}
                      <div 
                        onClick={() => { setActiveTab('news'); window.scrollTo({ top: 0 }); }}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-sm cursor-pointer group flex flex-col"
                      >
                        <div className="h-40 overflow-hidden relative bg-gray-150">
                          <img 
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                            alt="하계 계절수업 수강신청 대표"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                          <span className="absolute top-2.5 left-2.5 text-[9px] bg-[#00AED9] text-white font-black px-2 py-0.5 rounded uppercase tracking-wider">
                            학사공지
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 group-hover:text-[#00AED9] transition-colors line-clamp-1">
                              하계 계절수업 수강신청 안내
                            </h4>
                            <p className="text-[11px] text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                              하계 계절학기 수강 희망자는 고지된 접수 시스템 기한 내에 필히 신청해 이수 관리를 완료하시기 바랍니다.
                            </p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-3 font-semibold font-mono block">2024.05.18</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column (Admission Guide Box strictly matching Image 1) */}
                  <div className="lg:col-span-4 flex">
                    <div className="w-full bg-gradient-to-br from-[#1D2C5C] to-[#255fa3] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                      
                      <div className="relative">
                        <span className="text-[10px] bg-white/20 font-bold tracking-widest px-2.5 py-0.5 roundeduppercase">Admissions Portal</span>
                        <h3 className="text-xl font-extrabold mt-3.5 leading-normal">
                          당신의 꿈이<br />현실이 되는 곳
                        </h3>
                        <p className="text-xs text-gray-200 mt-2 leading-relaxed">
                          청주대학교와 함께할 예비 청우인들을 위한 통합 진학 상담 플랫폼입니다.
                        </p>
                      </div>

                      <div className="space-y-2.5 mt-8 relative" id="quick-admissions">
                        <button 
                          onClick={handleQuickAdmissions}
                          className="w-full bg-[#00AED9] hover:bg-[#009CC3] text-white font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-between transition-colors shadow-xs"
                        >
                          <span>신입학 예측 및 가이드</span>
                          <ArrowRight size={14} />
                        </button>
                        <button 
                          onClick={handleQuickAdmissions}
                          className="w-full bg-white/10 hover:bg-white/18 text-white border border-white/25 font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span>편입학 접수요강 다운로드</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* 5. Campus Life Section (Galleries of spots exactly as shown in screenshots) */}
              <section className="max-w-[#1200px] mx-auto px-4 sm:px-6 py-6" id="campus-life-gallery">
                <div className="border-b pb-2.5 border-gray-200 mb-6 col-span-full">
                  <h3 className="text-lg font-black text-[#1D2C5C] flex items-center gap-1.5">
                    <span className="w-1.5 h-4.5 bg-[#00AED9] rounded-full inline-block"></span>
                    캠퍼스 라이프
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Spot 1: Library */}
                  <div 
                    onClick={() => { setActiveTab('campustour'); window.scrollTo({ top: 0 }); }}
                    className="relative rounded-xl overflow-hidden shadow-xs border border-gray-150 h-64 sm:h-72 cursor-pointer group"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800" 
                      alt="중앙도서관 내부 전경"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5 select-none">
                      <h4 className="text-base sm:text-lg font-extrabold text-white">중앙도서관</h4>
                      <p className="text-[11px] text-gray-200 mt-1 line-clamp-1">
                        최고 사양의 스마트 협업 스터디 룸과 풍부한 장서 공간
                      </p>
                    </div>
                  </div>

                  {/* Spot 2: Union */}
                  <div 
                    onClick={() => { setActiveTab('campustour'); window.scrollTo({ top: 0 }); }}
                    className="relative rounded-xl overflow-hidden shadow-xs border border-gray-150 h-64 sm:h-72 cursor-pointer group"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" 
                      alt="학생회관 모습"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5 select-none">
                      <h4 className="text-base sm:text-lg font-extrabold text-white">학생회관</h4>
                      <p className="text-[11px] text-gray-200 mt-1 line-clamp-1">
                        자치적인 동아리 활동과 복지시설이 한 곳에 모인 활기찬 공간
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'colleges' && (
            <motion.div
              key="colleges-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <CollegeExplorer onSelectDepartment={handleSelectDeptForPredict} />
            </motion.div>
          )}

          {activeTab === 'news' && (
            <motion.div
              key="news-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <NewsSection />
            </motion.div>
          )}

          {activeTab === 'admissions' && (
            <motion.div
              key="admissions-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <AdmissionsSection initialDepartment={selectedAdmissionDept} />
            </motion.div>
          )}

          {activeTab === 'campustour' && (
            <motion.div
              key="campustour-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <CampusTour />
            </motion.div>
          )}

          {activeTab === 'academics' && (
            <motion.div
              key="academics-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <AcademicHub />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent AI Bot Assistant */}
      <AskAI />

      {/* Footer component */}
      <Footer />
    </div>
  );
}

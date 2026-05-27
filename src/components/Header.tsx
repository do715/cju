import React, { useState, useEffect } from 'react';
import { Globe, Search, Menu, X, User, Lightbulb, GraduationCap, ChevronDown, Check, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  studentName?: string;
  setStudentName?: (name: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  isLoggedIn,
  setIsLoggedIn,
  studentName = '김청우',
  setStudentName
}: HeaderProps) {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  // Login fields
  const [studentIdInput, setStudentIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('김청우');
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { key: 'home', label: '대학홈' },
    { key: 'colleges', label: '단과대학' },
    { key: 'news', label: '청대소식' },
    { key: 'admissions', label: '입학안내' },
    { key: 'campustour', label: '캠퍼스라이프' },
    { key: 'academics', label: '학사지도' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentIdInput || !passwordInput) return;
    setIsLoggedIn(true);
    if (setStudentName) {
      setStudentName(nameInput || '김청우');
    }
    setShowLoginModal(false);
    // Persist login state
    localStorage.setItem('cju_is_logged_in', 'true');
    localStorage.setItem('cju_student_name', nameInput || '김청우');
    localStorage.setItem('cju_student_id', studentIdInput);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('cju_is_logged_in');
    localStorage.removeItem('cju_student_name');
    localStorage.removeItem('cju_student_id');
  };

  // Sync login relative state
  useEffect(() => {
    const savedLogin = localStorage.getItem('cju_is_logged_in');
    const savedName = localStorage.getItem('cju_student_name');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
      if (setStudentName && savedName) {
        setStudentName(savedName);
      }
    }
  }, [setIsLoggedIn, setStudentName]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs">
        {/* Upper Top Bar */}
        <div className="bg-[#1D2C5C] text-white text-xs px-4 py-2 hidden md:block">
          <div className="max-w-[#1200px] mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">청주대학교 대표포털</span>
              <span className="text-gray-400">|</span>
              <span className="hover:underline cursor-pointer">학사정보시스템</span>
              <span className="text-gray-400">|</span>
              <span className="hover:underline cursor-pointer">중앙도서관</span>
            </div>
            <div className="flex gap-4 items-center">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#00AED9] font-semibold">{studentName} 학우님</span>
                  <span className="text-xs text-gray-300">(휴학생/컴퓨터공학과)</span>
                  <button onClick={handleLogout} className="text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                    <LogOut size={10} /> 로그아웃
                  </button>
                </div>
              ) : (
                <span className="text-gray-300">신입생 전형 및 종합 포털 서비스 중</span>
              )}
            </div>
          </div>
        </div>

        {/* Global Main Header */}
        <div className="max-w-[#1200px] mx-auto px-4 sm:px-6 h-18 sm:h-20 flex justify-between items-center">
          {/* Logo element */}
          <div 
            onClick={() => { setActiveTab('home'); setIsOpenMobileMenu(false); }}
            className="flex items-center gap-3 cursor-pointer select-none"
            id="header-logo-container"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1D2C5C] rounded-full flex items-center justify-center text-white font-extrabold text-[14px] sm:text-[18px]">
              CJU
            </div>
            <div>
              <div className="text-[#1D2C5C] font-black text-base sm:text-xl tracking-tight leading-tight flex items-center gap-1">
                청주대학교 
                <span className="text-[#00AED9] text-xs sm:text-sm font-semibold border-l pl-1.5 border-gray-300">CJU</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-gray-500 font-medium tracking-widest uppercase">
                Cheongju University
              </div>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold">
            {menuItems.map((item) => (
              <button
                key={item.key}
                id={`nav-${item.key}`}
                onClick={() => setActiveTab(item.key)}
                className={`py-2 text-base transition-colors relative ${
                  activeTab === item.key 
                    ? 'text-[#1D2C5C] font-bold' 
                    : 'text-gray-600 hover:text-[#1D2C5C]'
                }`}
              >
                {item.label}
                {activeTab === item.key && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00AED9]" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-gray-600 hover:text-[#1D2C5C] rounded-full hover:bg-gray-100 transition-colors"
              aria-label="통합검색"
              id="btn-global-search"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="p-2 text-gray-600 hover:text-[#1D2C5C] rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
              aria-label="다국어 지원"
            >
              <Globe size={20} />
            </button>

            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-2 bg-[#f3f4f6] px-3.5 py-1.5 rounded-full border border-gray-200">
                <div className="w-5 h-5 bg-[#1D2C5C] rounded-full text-white flex items-center justify-center text-[10px] font-bold">
                  {studentName[0]}
                </div>
                <span className="text-xs text-gray-700 font-medium">{studentName} 학우님</span>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="hidden lg:block px-5 py-1.5 bg-[#1D2C5C] hover:bg-[#131E42] text-white font-semibold text-sm rounded transition-colors"
                id="btn-login-trigger"
              >
                LOGIN
              </button>
            )}

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#1D2C5C] rounded-full hover:bg-gray-100"
              aria-label="메뉴 열기"
              id="btn-mobile-menu-trigger"
            >
              {isOpenMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu container */}
        <AnimatePresence>
          {isOpenMobileMenu && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 bg-[#fbfcfd] overflow-hidden"
              id="mobile-navigation-dropdown"
            >
              <div className="px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key);
                      setIsOpenMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.key 
                        ? 'bg-[#1D2C5C]/10 text-[#1D2C5C] font-bold' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="border-t border-gray-200 pt-4 mt-2">
                  {isLoggedIn ? (
                    <div className="space-y-2 px-4 py-2 bg-gray-100 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#1D2C5C] rounded-full text-white flex items-center justify-center text-xs font-bold">
                          {studentName[0]}
                        </div>
                        <span className="text-xs text-gray-700 font-bold">{studentName} 학우</span>
                      </div>
                      <p className="text-[10px] text-gray-500">컴퓨터공학과 | 학번: 20210432</p>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsOpenMobileMenu(false);
                        }} 
                        className="w-full mt-2 py-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded text-center transition-colors"
                      >
                        로그아웃
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsOpenMobileMenu(false);
                      }}
                      className="w-full py-2.5 bg-[#1D2C5C] text-white text-sm font-semibold rounded text-center block"
                    >
                      로그인 서비스 체험하기
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Portal Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative"
              id="login-modal-panel"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                aria-label="닫기"
              >
                <X size={20} />
              </button>

              <div className="bg-[#1D2C5C] py-6 px-6 text-white text-center">
                <span className="text-xs bg-[#00AED9] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">CJU Portal</span>
                <h3 className="text-xl font-bold mt-2">종합정보시스템 로그인</h3>
                <p className="text-xs text-gray-300 mt-1">청주대학교의 맞춤형 학사 지원을 테스트해보세요.</p>
              </div>

              <form onSubmit={handleLogin} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">학번 / ID</label>
                  <input 
                    type="text" 
                    placeholder="예: 20210432"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D2C5C] focus:border-transparent font-mono"
                    required
                    id="input-student-id"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">비밀번호</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D2C5C] focus:border-transparent font-mono"
                    required
                    id="input-password"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">체험 이름 (기본값: 김청우)</label>
                  <input 
                    type="text" 
                    placeholder="본인의 이름을 입력하세요"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1D2C5C] focus:border-transparent font-semibold"
                    id="input-student-name"
                  />
                </div>

                <div className="text-center py-2">
                  <div className="bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] rounded px-3 py-2.5 text-xs text-left leading-relaxed">
                    🙋‍♂️ <strong>로그인 가이드:</strong><br />
                    아무 학번과 비밀번호를 치셔도 바로 체험이 승인됩니다. 본인의 이름으로 체험하고 싶다면 이름을 입력하고 로그인해 주세요!
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#1D2C5C] hover:bg-[#131E42] text-white py-2.5 font-bold text-sm rounded shadow-sm transition-colors"
                  id="btn-login-submit"
                >
                  로그인하기
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 px-4">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
              id="search-overlay-panel"
            >
              <div className="p-4 flex items-center border-b border-gray-200">
                <Search className="text-gray-400 mr-3" size={20} />
                <input 
                  type="text" 
                  placeholder="대학정보, 단과대학, 입학요강 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-none outline-hidden focus:ring-0 text-base py-1 font-medium"
                  id="search-input-field"
                  autoFocus
                />
                <button 
                  onClick={() => setShowSearchModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 ml-2"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Instant Search Recommendations */}
              <div className="p-4 bg-gray-50 text-xs">
                <h4 className="font-bold text-gray-500 mb-2">실시간 청대 검색어</h4>
                <div className="flex flex-wrap gap-2">
                  {['2024 장학금', '컴퓨터공학 수강신청', '계절수업', '치위생학과 임상시험', '교수요람', '동아리방'].map((term, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setSearchQuery(term);
                        // Filter list or mock searching
                      }}
                      className="bg-white hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 font-medium text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (name: string) => {
    alert(`'${name}' 페이지로 이동합니다. (시뮬레이터 연동)`);
  };

  return (
    <footer className="bg-[#f0f1f2] border-t border-[#E5E7EB] py-12 text-xs text-gray-500" id="footer-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-gray-200 pb-8 mb-8">
          
          {/* Logo and primary credentials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1D2C5C] text-white rounded-full flex items-center justify-center font-black text-xs select-none">
                CJU
              </div>
              <span className="text-base font-extrabold text-[#1D2C5C] tracking-tight">청주대학교</span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Cheongju University</span>
            </div>
            
            <p className="text-gray-500 leading-relaxed max-w-md font-medium">
              충청북도 청주시 청원구 대성로 298 (내덕동)<br />
              대표전화: <span className="font-semibold text-gray-700">043-229-8114</span> | 팩스: 043-229-8456
            </p>
          </div>

          {/* Quick links block */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-semibold text-gray-600">
            {['개인정보처리방침', '이메일무단수집거부', '대학정보공시', '캠퍼스맵', '찾아오시는 길'].map((link) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className={`text-xs hover:text-[#1D2C5C] transition-colors hover:underline ${
                  link === '개인정보처리방침' ? 'text-red-600 font-bold' : ''
                }`}
              >
                {link}
              </button>
            ))}
          </div>

        </div>

        {/* Legal copyright footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 font-medium">
          <p>© {currentYear} CHEONGJU UNIVERSITY. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-gray-600">개인정보 보호 기본 지침</span>
            <span className="text-gray-300">|</span>
            <span className="cursor-pointer hover:text-gray-600">사이버행정소통실</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

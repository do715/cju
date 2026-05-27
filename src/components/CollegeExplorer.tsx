import React, { useState } from 'react';
import { collegesData } from '../data';
import { BookOpen, Briefcase, Cpu, GraduationCap, Palette, HeartPulse, ChevronRight, Award, Compass, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { College } from '../types';

const iconMap = {
  BookOpen: BookOpen,
  Briefcase: Briefcase,
  Cpu: Cpu,
  GraduationCap: GraduationCap,
  Palette: Palette,
  HeartPulse: HeartPulse
};

interface CollegeExplorerProps {
  onSelectDepartment?: (deptName: string) => void;
  embeddedView?: boolean;
}

export default function CollegeExplorer({ onSelectDepartment, embeddedView = false }: CollegeExplorerProps) {
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Find the selected college object
  const selectedCollege = collegesData.find(c => c.id === selectedCollegeId);

  // Filter colleges or departments if a search query is active
  const filteredColleges = collegesData.filter(college => {
    if (!searchQuery) return true;
    const matchesCollege = college.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           college.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = college.departments.some(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCollege || matchesDept;
  });

  return (
    <section className={`py-12 ${embeddedView ? 'bg-transparent' : 'bg-gray-50'}`} id="college-explorer-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        {!embeddedView && (
          <div className="mb-10 text-center">
            <span className="text-[#00AED9] font-bold text-xs uppercase tracking-wider bg-[#00AED9]/10 px-3 py-1 rounded-full">Explore Colleges</span>
            <h2 className="text-3xl font-extrabold text-[#1D2C5C] mt-2 tracking-tight">단과대학 안내</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
              미래를 향한 다양한 학문적 도전과 밝은 가능성을 여는 청주대학교의 6대 단과대학을 만나보세요.
            </p>

            {/* Quick search inside departments */}
            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="관심 있는 학과 또는 키워드를 검색해 보세요 (예: 컴퓨터, 간호)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm shadow-xs focus:ring-2 focus:ring-[#1D2C5C] focus:outline-hidden"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 py-1 px-2.5 rounded-full"
                >
                  지우기
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dynamic List / Grid view */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="college-grid">
          {filteredColleges.map((college) => {
            const IconComponent = iconMap[college.iconName];
            const isSelected = selectedCollegeId === college.id;

            return (
              <motion.div
                key={college.id}
                layoutId={`college-card-${college.id}`}
                onClick={() => setSelectedCollegeId(isSelected ? null : college.id)}
                className={`bg-white rounded-lg border p-6 cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-[#00AED9] shadow-md border-transparent' 
                    : 'border-gray-200 hover:shadow-md hover:border-[#1D2C5C]/20'
                }`}
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#1D2C5C]/5 text-[#1D2C5C] rounded-lg">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <span className="text-[10px] bg-gray-100 font-bold text-gray-500 py-1 px-2 rounded-full flex items-center gap-1">
                    학과 {college.departments.length}개 개설
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1D2C5C]">{college.name}</h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed min-h-10">
                  {college.description}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-semibold text-[#1D2C5C]">
                  <span>자세히 보기</span>
                  <ChevronRight size={14} className={`transform transition-transform ${isSelected ? 'rotate-90 text-[#00AED9]' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed College popup/drawer simulator in high quality */}
        <AnimatePresence>
          {selectedCollegeId && selectedCollege && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-6 sm:p-8"
              id="college-detail-drawer"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#00AED9] bg-[#00AED9]/10 px-2 py-0.5 rounded">CJU 핵심 학부성</span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-xs text-gray-500">4개년 정규 교과 트랙 지원</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#1D2C5C] mt-1">{selectedCollege.name} 학문 로드맵</h3>
                  <p className="text-sm text-gray-600 mt-1.5 max-w-2xl">{selectedCollege.fullDescription}</p>
                </div>
                <button 
                  onClick={() => setSelectedCollegeId(null)}
                  className="px-4 py-2 hover:bg-gray-100 text-xs font-bold text-gray-500 rounded border border-gray-200 transition-colors"
                >
                  안내 닫기
                </button>
              </div>

              {/* Departments detailed explore list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                {selectedCollege.departments.map((dept, idx) => (
                  <div 
                    key={idx}
                    className="p-5.5 rounded-lg border border-gray-100 bg-[#fbfcfd] hover:border-[#1D2C5C]/10 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-[#1D2C5C]">{dept.name}</h4>
                        <p className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">{dept.engName}</p>
                      </div>
                      {onSelectDepartment && (
                        <button
                          onClick={() => onSelectDepartment(dept.name)}
                          className="text-[10px] bg-[#00AED9] text-white hover:bg-[#009CC3] font-bold px-3 py-1 rounded shadow-xs"
                        >
                          입학 예측
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-2.5 leading-relaxed bg-white p-3 rounded border border-gray-100/80">
                      {dept.description}
                    </p>

                    {/* Careers and typical Curriculum tabs */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                          <Award size={13} className="text-[#00AED9]" /> 진출 주요 분야
                        </span>
                        <ul className="space-y-1 text-gray-500 font-medium pl-1">
                          {dept.careers.map((career, cIdx) => (
                            <li key={cIdx} className="flex items-center gap-1 text-[11px]">
                              <span className="w-1 h-1 bg-[#00AED9] rounded-full inline-block"></span>
                              {career}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                          <Compass size={13} className="text-[#1D2C5C]" /> 주요 추천 교과목
                        </span>
                        <ul className="space-y-1 text-gray-500 font-medium pl-1 text-[11px] leading-tight">
                          {dept.curriculum.slice(0, 3).map((item, currIdx) => (
                            <li key={currIdx} className="truncate">
                              {item}
                            </li>
                          ))}
                          {dept.curriculum.length > 3 && (
                            <li className="text-[10px] text-[#00AED9] hover:underline cursor-pointer">
                              + 그 외 학년별 심화교과 목록
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

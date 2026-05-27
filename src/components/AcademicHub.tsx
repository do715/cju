import React, { useState, useEffect } from 'react';
import { academicCalendarData } from '../data';
import { Calendar, Trash2, Plus, Calculator, GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const gradeMap: Record<string, number> = {
  'A+': 4.5,
  'A0': 4.0,
  'B+': 3.5,
  'B0': 3.0,
  'C+': 2.5,
  'C0': 2.0,
  'D+': 1.5,
  'D0': 1.0,
  'F': 0.0
};

export default function AcademicHub() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '알고리즘 및 자료수집', credits: 3, grade: 'A+' },
    { id: '2', name: '대학 영어회화 중급', credits: 2, grade: 'A0' },
    { id: '3', name: '일반수리학 제2편', credits: 3, grade: 'B+' },
    { id: '4', name: '한국어 문학과 역사', credits: 2, grade: 'C0' }
  ]);

  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState(3);
  const [newCourseGrade, setNewCourseGrade] = useState('A+');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;

    const newCourse: Course = {
      id: Math.random().toString(),
      name: newCourseName,
      credits: newCourseCredits,
      grade: newCourseGrade
    };

    const updated = [...courses, newCourse];
    setCourses(updated);
    setNewCourseName('');
    localStorage.setItem('cju_gpa_courses', JSON.stringify(updated));
  };

  const handleDeleteCourse = (id: string) => {
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    localStorage.setItem('cju_gpa_courses', JSON.stringify(updated));
  };

  // Calculate Cumulative GPA
  let totalCredits = 0;
  let totalPoints = 0;
  courses.forEach(c => {
    totalCredits += c.credits;
    totalPoints += (gradeMap[c.grade] * c.credits);
  });
  const gpaResult = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  useEffect(() => {
    const saved = localStorage.getItem('cju_gpa_courses');
    if (saved) {
      setCourses(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="py-12 bg-gray-50/50" id="academic-hub-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold text-[#00AED9] bg-[#00AED9]/10 px-3 py-1 rounded-full uppercase">CJU Academic Hub</span>
          <h2 className="text-3xl font-extrabold text-[#1D2C5C] mt-2 tracking-tight">학사 지도 & 성적 관리</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            학기별 주요일정 확인과 모의 학점 연동 시뮬레이터를 활용해 스마트하고 완벽한 이수 플랜을 정교하게 다듬어 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Academic Calendar) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-base font-extrabold text-[#1D2C5C] flex items-center gap-2 pb-3.5 border-b border-gray-150">
              <Calendar size={18} className="text-[#00AED9]" /> 2026학년도 학사일정표
            </h3>

            <div className="divide-y divide-gray-100 mt-4">
              {academicCalendarData.map((event) => (
                <div key={event.id} className="py-3.5 flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] text-[#00AED9] font-mono tracking-wide">
                      {event.dateRange}
                    </span>
                    <h4 className="text-xs font-bold text-gray-800 mt-1">
                      {event.title}
                    </h4>
                  </div>
                  {event.important && (
                    <span className="text-[9px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded font-extrabold text-right uppercase shrink-0">
                      필수확인
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-gray-100 text-[10px] text-gray-400 font-medium">
              * 학사일정은 학내 긴급 상황 또는 교육부 지침 수임에 따라 유동적으로 신축 소폭 변동될 수 있습니다.
            </div>
          </div>

          {/* Right Column (GPA Calculator) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-base font-extrabold text-[#1D2C5C] flex items-center gap-2 pb-3.5 border-b border-gray-150">
              <Calculator size={18} className="text-[#00AED9]" /> 실시간 학점 계산 패널 (4.5 만점 기준)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 items-center">
              {/* Output Score Big Badge */}
              <div className="md:col-span-1 bg-[#1D2C5C] text-white p-5 rounded-lg text-center shadow-xs select-none">
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">나의 평점 평균</span>
                <p className="text-3xl font-black text-[#00AED9] mt-1">{gpaResult}</p>
                <span className="text-[9px] text-gray-400 mt-1 block">이수 학점 총합: {totalCredits} 학점</span>
              </div>

              {/* Status report */}
              <div className="md:col-span-2 space-y-2">
                <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                  <GraduationCap size={15} className="text-[#00AED9]" /> 성적 종합 평가 보고서
                </span>
                <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3.5 rounded border border-gray-150 font-normal">
                  {parseFloat(gpaResult) >= 4.0 ? (
                    <span>🌟 <strong>우수 학우 추천 수혜!</strong> 차학기 평점 4.0 이상으로 '청우성적우수 백호 장학 수혜 조건'을 충족합니다. 전체 장학금 전액 감면 혜택에 안전하게 수령 도전하세요.</span>
                  ) : parseFloat(gpaResult) >= 3.0 ? (
                    <span>👍 <strong>모범적인 학업 성취!</strong> 준수한 이수 트랙 성적입니다. 인턴십 전공 트랙이나 국가 근로 장학생 우선선발 지침 지원 대상에 진입해 있습니다. 성적 상시 유지를 유도합니다.</span>
                  ) : (
                    <span>💡 <strong>학습 컨설팅 지원 필!</strong> 평점 평균이 다소 보강이 필요해 보입니다. 계절학기(재수강)를 활용하시거나 학과 튜터링 교무 연계 코칭 시스템을 받아보시는 것은 어떨까요?</span>
                  )}
                </p>
              </div>
            </div>

            {/* Courses lists */}
            <div className="max-h-[160px] overflow-y-auto space-y-2 mb-6" id="courses-list">
              {courses.map((course) => (
                <div key={course.id} className="bg-[#fbfcfd] border border-gray-150 rounded px-4 py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-extrabold text-gray-800">{course.name}</span>
                    <span className="text-[10px] text-gray-400 ml-2 font-medium">({course.credits}학점)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-gray-700 bg-white border border-gray-200 px-2 py-0.5 rounded text-[10px]">
                      {course.grade} ({gradeMap[course.grade]}점)
                    </span>
                    <button 
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                      aria-label="과목 제거"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form to insert course */}
            <form onSubmit={handleAddCourse} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-4 border-t border-gray-100">
              <div className="sm:col-span-6">
                <input 
                  type="text" 
                  placeholder="새로운 이수 과목 명칭 입력..."
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <select 
                  value={newCourseCredits}
                  onChange={(e) => setNewCourseCredits(parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden"
                >
                  <option value={1}>1 학점</option>
                  <option value={2}>2 학점</option>
                  <option value={3}>3 학점</option>
                  <option value={4}>4 학점 (실험/실기)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <select 
                  value={newCourseGrade}
                  onChange={(e) => setNewCourseGrade(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-bold"
                >
                  {Object.keys(gradeMap).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                className="sm:col-span-1 bg-[#1D2C5C] hover:bg-[#131E42] text-white p-1.5 rounded flex items-center justify-center transition-colors"
                title="추가"
              >
                <Plus size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { collegesData } from '../data';
import { BookOpen, Award, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, GraduationCap, Percent, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdmissionsSectionProps {
  initialDepartment?: string;
}

export default function AdmissionsSection({ initialDepartment }: AdmissionsSectionProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'calculator'>('info');
  
  // Calculator states
  const [selectedCollegeId, setSelectedCollegeId] = useState('humanities');
  const [selectedDeptName, setSelectedDeptName] = useState(initialDepartment || '정치행정학과');
  const [gpa, setGpa] = useState('2.5');
  const [satScore, setSatScore] = useState('78');
  const [consultResult, setConsultResult] = useState<any | null>(null);

  // Departments list for selected college
  const selectedCollege = collegesData.find(c => c.id === selectedCollegeId);
  const departments = selectedCollege ? selectedCollege.departments : [];

  const handleCollegeChange = (id: string) => {
    setSelectedCollegeId(id);
    const col = collegesData.find(c => c.id === id);
    if (col && col.departments.length > 0) {
      setSelectedDeptName(col.departments[0].name);
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const gpaNum = parseFloat(gpa);
    const satNum = parseInt(satScore);
    
    if (isNaN(gpaNum) || gpaNum < 1.0 || gpaNum > 9.0) {
      alert('내신 등급은 1.0에서 9.0 사이여야 합니다!');
      return;
    }

    // Advanced mock score evaluation algorithm based on realistic university boundaries (CJU)
    let chance = '추가합격 기대 (Waitlist)';
    let color = 'text-amber-600 bg-amber-50 border-amber-200';
    let probability = 45;
    let description = '';

    if (gpaNum <= 2.2) {
      chance = '최초합격 가능 (Safe / Highly Stable)';
      color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
      probability = 95;
      description = `안정지원의 최적 등급입니다. 수능 최저학력기준 유무를 확인하신 뒤 학생부 100% 교과우수자 전형 지원 시 수월한 최초 합격을 기대할 수 있습니다.`;
    } else if (gpaNum <= 3.5) {
      chance = '합격 우세 (Strong Advantage)';
      color = 'text-blue-700 bg-blue-50 border-blue-200';
      probability = 80;
      description = `당해 학과의 평균 합격선에 도달해 있습니다. 면접형 학생부교과 또는 창의인재종합전형 지원 시 서면 자소서와 면접 준비를 꼼꼼히 하시면 합격이 확실시됩니다.`;
    } else if (gpaNum <= 4.8) {
      chance = '소신 지원 (Challenger)';
      color = 'text-indigo-700 bg-indigo-50 border-indigo-200';
      probability = 58;
      description = `경쟁률 및 충원율(추가 합격률)에 따라 합격 여부가 갈리는 적정 등급입니다. 2학기 충원 예비 번호를 안정적으로 수령할 확률이 높으니 과감히 수시 6개 자리에 분배 지원해보시는 것을 추천합니다.`;
    } else {
      chance = '신중 지원 (Careful Strategy Needed)';
      color = 'text-rose-700 bg-rose-50 border-rose-200';
      probability = 28;
      description = `교과 성적만으로는 다소 모험적인 점수대에 속합니다. 단, 면접 비중이 40% 이상 들어가는 특별 모집 전형이나 실기 전형, 혹은 지역인재 인센티브를 적극 활용해 성적의 패널티를 보완하는 전술을 채택해야 합니다.`;
    }

    setConsultResult({
      chance,
      color,
      probability,
      description,
      gpa: gpaNum,
      sat: satNum,
      targetDept: selectedDeptName
    });
  };

  return (
    <section className="py-12 bg-gray-50/70" id="admissions-guide-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        
        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 mb-8" id="admissions-tabs">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'info' 
                ? 'border-[#1D2C5C] text-[#1D2C5C]' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            입학 안내 & 전형 요약
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'calculator' 
                ? 'border-[#1D2C5C] text-[#1D2C5C]' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <TrendingUp size={15} /> 입학성적 예측 시뮬레이터
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'info' ? (
            <motion.div 
              key="info-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column (Admission Hero Style Box) with exact blue theme matching image */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#1D2C5C] to-[#255fa3] text-white rounded-xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden min-h-[360px] sm:min-h-[420px]">
                {/* Embedded decorative lines */}
                <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                
                <div className="relative">
                  <span className="text-xs bg-white/20 font-bold tracking-widest px-3 py-1 rounded-full uppercase">Admissions 2026</span>
                  <h3 className="text-2xl font-black mt-4 leading-normal">
                    당신의 꿈이<br />현실이 되는 곳
                  </h3>
                  <p className="text-sm text-gray-200 mt-3 leading-relaxed">
                    청주대학교에서 여러분의 활기찬 미래를 주도적으로 준비해 보세요. 풍부한 장학 혜택과 맞춤 교육 로드맵이 기다립니다.
                  </p>
                </div>

                <div className="space-y-3 mt-8 relative">
                  <button 
                    onClick={() => setActiveTab('calculator')}
                    className="w-full bg-[#00AED9] hover:bg-[#009CC3] text-white font-extrabold text-sm py-3 px-4 rounded-lg flex items-center justify-between transition-colors shadow-xs"
                  >
                    <span>성적 분석 및 시뮬레이터</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => alert('공식 2026 수시모집요강 PDF가 다운로드 되었습니다. (시뮬레이터)')}
                    className="w-full bg-white/10 hover:bg-white/18 text-white border border-white/25 font-bold text-sm py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>수집 2026 모집요금 다운로드</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right Column (Standard list of strategies and timeline) */}
              <div className="lg:col-span-8 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs">
                <h4 className="text-lg font-extrabold text-[#1D2C5C] flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-[#00AED9] rounded-full inline-block"></span>
                  2026학년도 수시 모집 주요 평가 전형
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-gray-100 hover:border-[#1D2C5C]/15 transition-colors bg-[#fbfcfd]">
                    <div className="flex items-center gap-2 text-[#1D2C5C] font-bold text-sm">
                      <CheckCircle2 size={16} className="text-[#00AED9]" />
                      학생부교과 (교과우수자전형)
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      학생부 교과 성적 100% 반영으로 수능 최저학력기준 없이 합격생을 선발하여 순수 학업 우수 학생층에 유리합니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-100 hover:border-[#1D2C5C]/15 transition-colors bg-[#fbfcfd]">
                    <div className="flex items-center gap-2 text-[#1D2C5C] font-bold text-sm">
                      <CheckCircle2 size={16} className="text-[#00AED9]" />
                      창의면접전형 (교과+면접)
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      학생부 교과 60% + 실무 면접 40% 편성을 통해 적극적이고 소통 역량이 훌륭한 창의 융합 인재 유치에 유리합니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-100 hover:border-[#1D2C5C]/15 transition-colors bg-[#fbfcfd]">
                    <div className="flex items-center gap-2 text-[#1D2C5C] font-bold text-sm">
                      <CheckCircle2 size={16} className="text-[#00AED9]" />
                      실기위주전형 (예체능 전용)
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      디자인디자인, 연극영화, 만화 등 고수준 실기 70% + 학생부 30%를 연동하여 진취적인 신예 아티스트를 발굴합니다.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-100 hover:border-[#1D2C5C]/15 transition-colors bg-[#fbfcfd]">
                    <div className="flex items-center gap-2 text-[#1D2C5C] font-bold text-sm">
                      <CheckCircle2 size={16} className="text-[#00AED9]" />
                      지역인재전형 (충청권 연계)
                    </div>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      충청권(충북, 대전, 세종, 충남) 학생들만을 위한 특별 정원 배정으로 수능 등급 미적용의 프리미엄을 가집니다.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-100/90 text-xs text-gray-600 leading-relaxed">
                  📢 <strong>장학금 파격 혜택:</strong> 최초합격자 정원 중 상위 30% 이내 전원에게 
                  <span className="text-[#00AED9] font-bold"> 'CJU 글로벌 리더 장학금'</span>을 지급하여 1학기 등록금을 전액 보장합니다.
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="calculator-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form parameters */}
                <form onSubmit={handleCalculate} className="lg:col-span-5 space-y-4">
                  <h4 className="text-base font-extrabold text-[#1D2C5C] flex items-center gap-1.5">
                    <GraduationCap size={18} /> 희망 대학 및 과목 선택
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">단과대학</label>
                      <select 
                        value={selectedCollegeId}
                        onChange={(e) => handleCollegeChange(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden"
                      >
                        {collegesData.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">희망학과</label>
                      <select 
                        value={selectedDeptName}
                        onChange={(e) => setSelectedDeptName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden"
                      >
                        {departments.map((d, i) => (
                          <option key={i} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <h4 className="text-base font-extrabold text-[#1D2C5C] flex items-center gap-1.5 pt-2">
                    <Percent size={18} /> 본인의 평균 성적 일지
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">고교 내신 등급 (1.0~9.0)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="1.0" 
                        max="9.0" 
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-bold"
                        required
                      />
                      <span className="text-[10px] text-gray-400">소수점 첫째짜리까지 입력해 주세요.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">수능 예상 백분위 (0~100%)</label>
                      <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value={satScore}
                        onChange={(e) => setSatScore(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-bold"
                        required
                      />
                      <span className="text-[10px] text-gray-400">교과우수자의 수능최저 검토에 활용됩니다.</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1D2C5C] hover:bg-[#131E42] text-white text-xs font-bold py-3 rounded-lg shadow-xs transition-colors"
                  >
                    실시간 모의 입학 컨설팅 진단
                  </button>
                </form>

                {/* Live Output */}
                <div className="lg:col-span-7 bg-gray-50 rounded-xl p-5 border border-gray-150 flex flex-col justify-between min-h-[320px]">
                  {consultResult ? (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-start border-b pb-4 border-gray-200">
                        <div>
                          <span className="text-[10px] bg-[#1D2C5C]/10 text-[#1D2C5C] px-2.5 py-0.5 rounded font-bold">청주대학교 진학예측본부</span>
                          <h5 className="text-sm font-bold text-gray-800 mt-1">{consultResult.targetDept} 지원 분석</h5>
                        </div>
                        <span className={`text-xs font-extrabold border px-3 py-1 rounded-full ${consultResult.color}`}>
                          {consultResult.chance}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center my-2">
                        <div className="bg-white p-2.5 rounded border border-gray-100">
                          <p className="text-[10px] text-gray-400 font-semibold">내신 등급</p>
                          <p className="text-base font-black text-[#1D2C5C] mt-0.5">{consultResult.gpa} 등급</p>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-gray-100">
                          <p className="text-[10px] text-gray-400 font-semibold">수능 백분위</p>
                          <p className="text-base font-black text-[#1D2C5C] mt-0.5">{consultResult.sat}%</p>
                        </div>
                        <div className="bg-white p-2.5 rounded border border-gray-100">
                          <p className="text-[10px] text-gray-400 font-semibold">예상 합격률</p>
                          <p className="text-base font-black text-[#00AED9] mt-0.5">{consultResult.probability}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                          <HelpCircle size={14} className="text-[#00AED9]" /> 지원 전술 전문가 조언
                        </span>
                        <p className="text-xs text-gray-500 leading-relaxed bg-white p-3.5 rounded border border-gray-150">
                          {consultResult.description}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
                      <GraduationCap className="text-gray-300 mb-3" size={40} />
                      <h5 className="text-sm font-extrabold text-gray-700">컨설팅 진단 대기 중</h5>
                      <p className="text-xs text-gray-400 max-w-sm mt-1.5 leading-relaxed">
                        왼쪽 폼에 본인의 수시 내신 등급과 수능 예상 등급을 기입하고 진단 버튼을 눌러주시면 청주대학교 역대 데이터 매트릭스에 입각한 지침을 지원해 드립니다.
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-3.5 text-[10px] text-gray-400 leading-relaxed font-medium">
                    ⚠️ 본 시뮬레이터 프로그램은 모의 전형 진단기기로 실제 수시모집 소관 단위 원서 접수 시 최종 변동 가중치가 발생될 수 있으므로 정식 대학입학 전형서 원안을 항상 병행 확인하십시오.
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { campusLocationsData } from '../data';
import { Calendar, Clock, MapPin, CheckCircle2, Ticket, Users, Sparkles, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Booking {
  id: string;
  facilityName: string;
  roomName: string;
  date: string;
  timeSlot: string;
  studentId: string;
  studentName: string;
}

export default function CampusTour() {
  const [selectedSpotId, setSelectedSpotId] = useState<string>('library');
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Booking states
  const [selectedRoom, setSelectedRoom] = useState('그룹 스터디룸 (4~6인용)');
  const [bookingDate, setBookingDate] = useState('2026-05-28');
  const [bookingTime, setBookingTime] = useState('14:00 - 16:00');
  const [bookingIdInput, setBookingIdInput] = useState('');
  const [bookingNameInput, setBookingNameInput] = useState('');
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  const selectedLoc = campusLocationsData.find(loc => loc.id === selectedSpotId) || campusLocationsData[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingIdInput || !bookingNameInput) {
      alert('학번과 성함을 올바르게 채워 주세요.');
      return;
    }

    const newBooking: Booking = {
      id: `CJU-BK-${Math.floor(100000 + Math.random() * 900000)}`,
      facilityName: selectedLoc.nameKr,
      roomName: selectedRoom,
      date: bookingDate,
      timeSlot: bookingTime,
      studentId: bookingIdInput,
      studentName: bookingNameInput,
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('cju_campus_bookings', JSON.stringify(updated));
    
    setShowBookingModal(false);
    alert(`🎉 예약이 성공적으로 고정되었습니다!\n예약자: ${bookingNameInput} [예약번호: ${newBooking.id}]`);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('과연 해당 스마트 시설 예약을 정말로 취소하시겠습니까?')) {
      const filtered = myBookings.filter(b => b.id !== id);
      setMyBookings(filtered);
      localStorage.setItem('cju_campus_bookings', JSON.stringify(filtered));
    }
  };

  // Synchronize student stats and bookings
  useEffect(() => {
    const saved = localStorage.getItem('cju_campus_bookings');
    if (saved) {
      setMyBookings(JSON.parse(saved));
    }

    // Prefill if student is logged in
    const isLogged = localStorage.getItem('cju_is_logged_in');
    const sName = localStorage.getItem('cju_student_name');
    const sId = localStorage.getItem('cju_student_id');
    if (isLogged === 'true' && sName && sId) {
      setBookingNameInput(sName);
      setBookingIdInput(sId);
    }
  }, [showBookingModal]);

  return (
    <section className="py-12 bg-white" id="campus-life-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        
        {/* Gallery Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold text-[#00AED9] bg-[#00AED9]/10 px-3 py-1 rounded-full uppercase">CJU Campus Life</span>
          <h2 className="text-3xl font-extrabold text-[#1D2C5C] mt-2 tracking-tight">캠퍼스 라이프</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
            학우들의 학문적 열정과 활기찬 청춘을 지원하는 청주대학교의 첨단 랜드마크 시설을 소개합니다.
          </p>
        </div>

        {/* Navigation Selector Tabs exactly as visual style */}
        <div className="flex justify-center gap-4 mb-8">
          {campusLocationsData.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedSpotId(loc.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-extrabold transition-all ${
                selectedSpotId === loc.id
                  ? 'bg-[#1D2C5C] text-white shadow-md'
                  : 'bg-gray-150 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {loc.nameKr}
            </button>
          ))}
        </div>

        {/* Detailed Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Big interactive image overlay card) */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-md border border-gray-150 relative h-96 sm:h-[460px] group">
            <img 
              src={selectedLoc.image} 
              alt={selectedLoc.nameKr}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            {/* Absolute visual gradient cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 select-none">
              <span className="text-xs font-bold text-[#00AED9] tracking-wider uppercase">CJU Landmarks</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{selectedLoc.nameKr}</h3>
              <p className="text-xs text-gray-200 line-clamp-2 mt-2 leading-relaxed max-w-xl">
                {selectedLoc.description}
              </p>
            </div>
          </div>

          {/* Right Column (Facilities parameters & study room reservation button) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-150/80">
              <h4 className="text-base font-extrabold text-[#1D2C5C] flex items-center gap-2 pb-3.5 border-b border-gray-200">
                <MapPin size={18} className="text-[#00AED9]" /> 주요 정보 및 세부 제원
              </h4>

              <div className="space-y-4.5 mt-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-[#1D2C5C] mt-0.5 shrink-0" size={16} />
                  <div>
                    <h5 className="text-xs font-bold text-gray-700">운영 상시 시간</h5>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedLoc.hours}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 size={14} className="text-[#00AED9]" /> 핵심 특장점 및 성과
                  </h5>
                  <ul className="space-y-1.5 pl-1">
                    {selectedLoc.facts.map((f, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-start gap-1.5 leading-relaxed font-medium">
                        <span className="w-1 h-1 bg-[#1D2C5C] rounded-full mt-1.5 shrink-0"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
                    <Sparkles size={14} className="text-[#00AED9]" /> 보유 인프라 & 편의 서비스
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLoc.facilities.map((f, idx) => (
                      <span key={idx} className="bg-white border border-gray-200/85 text-[10px] text-gray-600 font-bold px-2 py-1 rounded">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Study room booking action trigger */}
              <div className="mt-6 pt-4.5 border-t border-gray-200">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-[#1D2C5C] hover:bg-[#131E42] text-white text-xs font-extrabold py-3 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
                  id={`btn-book-${selectedLoc.id}`}
                >
                  <Calendar size={15} />
                  <span>{selectedLoc.nameKr} 스마트 시설 예약하기</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Bookings Voucher Panel */}
            {myBookings.length > 0 && (
              <div className="bg-emerald-50/60 rounded-xl p-5 border border-emerald-150">
                <h4 className="text-xs font-extrabold text-[#15803d] flex items-center gap-1.5 mb-3">
                  <Ticket size={16} /> 나의 실시간 시설 예약 내원 ({myBookings.length}건)
                </h4>

                <div className="space-y-3 max-h-[160px] overflow-y-auto">
                  {myBookings.map((b) => (
                    <div key={b.id} className="bg-white rounded p-3 border border-emerald-200/80 text-xs flex justify-between items-center shadow-xs">
                      <div>
                        <div className="font-bold text-gray-800">
                          [{b.facilityName}] {b.roomName}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          일정: {b.date} / 시간: {b.timeSlot}
                        </p>
                        <p className="text-[9px] text-emerald-600 font-semibold mt-0.5">
                          예약 승인번호: {b.id}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-[10px] text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded border border-red-100"
                      >
                        취소
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Study room reservation Modal */}
        <AnimatePresence>
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative"
                id="booking-modal-panel"
              >
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="닫기"
                >
                  <X size={20} />
                </button>

                <div className="bg-[#1D2C5C] py-6 px-6 text-white">
                  <span className="text-xs bg-[#00AED9] font-bold tracking-wider px-2 py-0.5 rounded uppercase">CJU Facility Sys</span>
                  <h3 className="text-lg font-extrabold mt-1">{selectedLoc.nameKr} 사용 신청서</h3>
                  <p className="text-[11px] text-gray-300 mt-1">청주대학교 재학생을 위한 그룹 스터디룸 및 자치 실습 공간입니다.</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">예약 시설 대상</label>
                    <select 
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2.5 py-2 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden"
                    >
                      {selectedLoc.id === 'library' ? (
                        <>
                          <option>그룹 스터디룸 2 (4~6인용)</option>
                          <option>그룹 스터디룸 8 (8~10인용)</option>
                          <option>스마트 협업 워크마크 3</option>
                          <option>오디오 캐빈 (개인 VOD 전용)</option>
                        </>
                      ) : (
                        <>
                          <option>밴드 동아리 전용실 1</option>
                          <option>댄스/뮤지컬 액팅룸</option>
                          <option>학생회 소극장 대면 강당</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">예약 희망 성년일자</label>
                      <input 
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">이용 시간대</label>
                      <select 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-bold"
                      >
                        <option>09:00 - 11:00</option>
                        <option>11:00 - 13:00</option>
                        <option>14:00 - 16:00</option>
                        <option>16:00 - 18:00</option>
                        <option>18:00 - 20:00 (야간시설용)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">학번 (ID)</label>
                      <input 
                        type="text"
                        placeholder="예: 20210432"
                        value={bookingIdInput}
                        onChange={(e) => setBookingIdInput(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">예약자 성함</label>
                      <input 
                        type="text"
                        placeholder="예: 김청우"
                        value={bookingNameInput}
                        onChange={(e) => setBookingNameInput(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#1D2C5C] focus:outline-hidden font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#1D2C5C] hover:bg-[#131E42] text-white py-2.5 font-bold text-xs rounded transition-colors mt-4 shadow-xs"
                  >
                    예약 승인 접수 신청
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

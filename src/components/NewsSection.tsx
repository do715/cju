import React, { useState } from 'react';
import { newsData } from '../data';
import { Calendar, Eye, ArrowRight, Share2, Printer, ThumbsUp, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  embeddedView?: boolean;
}

export default function NewsSection({ embeddedView = false }: NewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const categories = ['전체', '일반공지', '학사공지', '장학공지'];

  const filteredNews = activeCategory === '전체' 
    ? newsData 
    : newsData.filter(news => news.category === activeCategory);

  const selectedArticle = newsData.find(news => news.id === selectedNewsId);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `청주대학교 종합 소식 확인: ${title}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback
      alert(`'${title}'의 링크가 클립보드에 복사되었습니다! (시뮬레이터)`);
    }
  };

  return (
    <section className={`py-12 ${embeddedView ? 'bg-transparent' : 'bg-white'}`} id="news-section">
      <div className="max-w-[#1200px] mx-auto px-4 sm:px-6">
        
        {/* News Header banner */}
        {!embeddedView && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#00AED9] bg-[#00AED9]/10 px-3 py-1 rounded-full uppercase">CJU BULLETIN</span>
              <h2 className="text-3xl font-extrabold text-[#1D2C5C] mt-2 tracking-tight">청대소식</h2>
              <p className="text-sm text-gray-500 mt-1">청주대학교의 유익하고 신속한 소식을 카테고리별로 안내해 드립니다.</p>
            </div>
            
            {/* Category tabs list */}
            <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1.5 rounded-lg border border-gray-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-white text-[#1D2C5C] shadow-xs' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* News Cards Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="news-grid-container">
          {filteredNews.map((news) => (
            <motion.div
              layoutId={`news-card-${news.id}`}
              onClick={() => setSelectedNewsId(news.id)}
              key={news.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md cursor-pointer flex flex-col sm:flex-row group transition-all"
              whileHover={{ y: -3 }}
            >
              {/* Card Image banner */}
              <div className="w-full sm:w-44 h-48 sm:h-auto relative overflow-hidden bg-gray-100 shrink-0">
                <img 
                  src={news.image} 
                  alt={news.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2.5 py-1 rounded shadow-xs uppercase tracking-wider ${
                  news.category === '학사공지' 
                    ? 'bg-[#00AED9]' 
                    : news.category === '장학공지' 
                    ? 'bg-emerald-600' 
                    : 'bg-[#1D2C5C]'
                }`}>
                  {news.category}
                </span>
              </div>

              {/* Card specs text */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-2">
                    <span className="flex items-center gap-1 font-semibold font-mono">
                      <Calendar size={12} /> {news.date}
                    </span>
                    <span className="flex items-center gap-1 font-semibold font-mono">
                      <Eye size={12} /> {news.views}회
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-gray-900 leading-snug group-hover:text-[#00AED9] transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {news.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-semibold text-[#1D2C5C] group-hover:underline">전문 읽기</span>
                  <div className="flex gap-2.5">
                    <button 
                      onClick={(e) => handleLike(news.id, e)}
                      className={`p-1 rounded-full ${likedArticles[news.id] ? 'text-red-500 bg-red-50' : 'hover:bg-gray-100'}`}
                      aria-label="좋아요"
                    >
                      <ThumbsUp size={14} />
                    </button>
                    <button 
                      onClick={(e) => handleShare(news.title, e)} 
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="공유"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Rich Modal for News Viewer */}
        <AnimatePresence>
          {selectedNewsId && selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
                id="news-reader-modal"
              >
                {/* Header banner */}
                <div className="bg-[#1D2C5C] text-white p-5 pr-14 select-none shrink-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-[#00AED9] font-bold tracking-wider px-2.5 py-0.5 rounded uppercase">
                      {selectedArticle.category}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="font-mono text-gray-300">청주대학교 공지 제2024-034호</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black mt-2 leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>

                {/* Main body scroll */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 max-h-[500px]">
                  <div className="h-60 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 border-b pb-4">
                    <div className="flex gap-4">
                      <span><strong>작성일:</strong> {selectedArticle.date}</span>
                      <span><strong>작성부서:</strong> 홍보팀 / 교무행정처</span>
                      <span><strong>조회수:</strong> {selectedArticle.views + 124}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => window.print()} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full" title="출력">
                        <Printer size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Informational article block content */}
                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-normal">
                    <p>
                      청주대학교 학우 여러분 안녕하십니까, 전인교육 수호 포털 기획담당부서입니다. 
                      우리는 <strong>{selectedArticle.title}</strong>을 다음과 같이 대내외에 승인 공지하오니, 학우 여러분께서는 세부 일정을 참고하시어 차질 없이 지원 및 신청을 완료하여 주시기 바랍니다.
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2.5 text-xs text-gray-600">
                      <p className="font-bold text-[#1D2C5C] border-b pb-1">📌 [세부 핵심 사항 안내]</p>
                      <ul className="space-y-1.5 list-disc pl-5">
                        <li><strong>접수 대상:</strong> 일반 정규 과정 제적생 및 휴학생을 제외한 모든 학부생</li>
                        <li><strong>접수 기한:</strong> 해당 공고 발부일로부터 14일간 (온라인 접수에 한함)</li>
                        <li><strong>제출 서류:</strong> 마이페이지 업로드 및 학생증 사본, 신청 사유 확인서 1부</li>
                        <li><strong>평가 절차:</strong> 소관 단과대학 전공 담당 위원회 심사 후 최종 개별통보 예정</li>
                      </ul>
                    </div>

                    <p className="text-gray-600">
                      세부 요강 및 질문사항이 있을 경우 청주대학교 행정 지원 콜센터(043-229-8114) 또는 중앙 포털 1:1 온라인 건의 게시판을 이용해 주시기 바랍니다. 여러분의 열정 넘치는 도전을 언제나 뜨겁게 응원하며 지원합니다!
                    </p>

                    <p className="text-xs text-gray-400 text-right mt-4 font-semibold font-mono">
                      청주대학교 교무행정지원 연대 배상
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end shrink-0 gap-2">
                  <button 
                    onClick={() => setSelectedNewsId(null)}
                    className="px-5 py-2.5 bg-[#1D2C5C] hover:bg-[#131E42] text-white font-bold text-xs rounded shadow-xs"
                  >
                    확인 및 닫기
                  </button>
                </div>

                {/* Absolute close button */}
                <button 
                  onClick={() => setSelectedNewsId(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black/25 hover:bg-black/40 p-1.5 rounded-full"
                  aria-label="닫기"
                >
                  <X size={18} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

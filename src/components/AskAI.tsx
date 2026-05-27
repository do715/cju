import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, HelpCircle, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'bot', 
      text: `안녕하세요! 청주대학교 핵심 안내 AI 비서 **'청우봇(CheongWoo Bot)'**입니다. 🎓\n\n단과대학 학과 소개, 입학 성적 진단, 장학금 혜택 및 캠퍼스 시설 등 궁금한 사항을 편하게 질문해 주세요!`, 
      time: '오후 3:11' 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '💡 건학이념에 대해 설명해 줘',
    '💻 컴퓨터정보공학과는 무엇을 배우지?',
    '🏥 보건의료과학대학 개설학과',
    '📚 중앙도서관 스터디룸 예약법',
    '💵 국가장학금 일정이 궁금해'
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic professional answer vector matching
    setTimeout(() => {
      let replyText = '';
      const prompt = textToSend.toLowerCase();

      if (prompt.includes('건학이념') || prompt.includes('이념') || prompt.includes('실학구세')) {
        replyText = `청주대학교의 건학이념은 **'실학구세(實學救世)'**입니다.\n\n이는 **'실용적인 학문을 탐구하여 도탄에 빠진 국가와 사회를 구하고, 인류의 발전과 국리민복에 이바지한다'**는 깊은 학술적 정신을 품고 있습니다.\n\n이를 토대로 창의성, 실천성, 글로벌 리더십을 갖춘 최고의 실무 맞춤 인재 양성을 주도하고 있습니다. 🌟`;
      } else if (prompt.includes('컴퓨터') || prompt.includes('컴공') || prompt.includes('코딩') || prompt.includes('소프트웨어')) {
        replyText = `**공과대학 컴퓨터정보공학과**는 컴퓨터 과학 전반뿐만 아니라 AI 모델링, 미래 웹/앱 아키텍처, 정보 보안 분야를 깊이 있게 연마하는 청대의 핵심 학과입니다.\n\n**핵심 커리큘럼:**\n- 1학년: 파이썬, C언어입문\n- 2학년: 자료구조, 알고리즘 실습\n- 3학년: 웹프레임워크실무, 운영체제\n- 4학년: 인공지능 응용, 캡스톤 디자인\n\n**추천 진출 직군:** 풀스택 엔지니어, AI 솔루션 아키텍트, 화이트 해커 등`;
      } else if (prompt.includes('보건') || prompt.includes('간호') || prompt.includes('치위생')) {
        replyText = `**보건의료과학대학**은 국민 건강을 선도하는 최고의 전문 의료인 양성의 산실입니다.\n\n**개설 대표 학과:**\n- **간호학과:** 고도화된 임상 시뮬레이션 기반 간호 교육\n- **치위생학과:** 구강 질환 예방 및 스케일링 전문실습\n- 물리치료학과, 방사선학과, 제약바이오메디컬공학과 등\n\n국가고시 100% 합격에 준하는 촘촘한 특강 반과 종합병원 연계 실습이 대표적인 프리미엄 강점입니다. 🏥`;
      } else if (prompt.includes('도서관') || prompt.includes('스터디룸') || prompt.includes('예약')) {
        replyText = `**중앙도서관 개방 스마트 시설 및 예약 안내**입니다.\n\n중앙도서관 내부에는 15개의 최신식 **그룹 스터디룸**과 창의융합 컨버전스 스퀘어가 마련되어 있습니다.\n\n**이용 방법:**\n1. 상단 메뉴의 **'캠퍼스라이프'** 탭 선택\n2. '중앙도서관(Central Library)' 안내 하단의 **'스마트 시설 예약하기'** 클릭\n3. 날짜, 시간대, 학번과 예약자 성함을 입력하고 제출해 주시면 원클릭 즉시 접수 완료!`;
      } else if (prompt.includes('장학금') || prompt.includes('학사공지') || prompt.includes('계절')) {
        replyText = `현재 공지된 주요 학사 및 장학금 일정입니다.\n\n- **2024학년도 1학기 국가장학금:** 한국장학재단 웹페이지에서 상세 내규 및 신청이 가능하며, 소득 분위 심사 후 최대 등록금 전액 지원 예정입니다.\n- **하계 계절수업 수강신청:** 방학인 6월 개강 직전까지 종합인포시스템을 통해 온라인 수강 신청 일정이 접수됩니다.\n\n상단 메뉴의 **'청대소식'** 또는 **'학사지도'** 탭을 클릭하시면 세부 공지사항을 카테고리별로 일목요연하게 파악하실 수 있습니다. 💵`;
      } else if (prompt.includes('안녕') || prompt.includes('하이') || prompt.includes('반갑')) {
        replyText = `안녕하세요! 청주대학교 안내 도우미인 만큼, 입학안내, 학사일정, 단과대학 커리큘럼, 캠퍼스 시설 등에 관해 궁금한 점이 있으시다면 언제든 키워드를 말씀해 주십시오. 😊`;
      } else {
        replyText = `질문해 주신 **"${textToSend}"**에 대한 맞춤형 추천 안내 정보입니다.\n\n현재 청주대학교 포털에서는 다음과 같은 융합 서비스를 원클릭으로 체험하실 수 있습니다:\n\n1. **[단과대학]** 탭: 6대 단과대와 세부 학과별 4개년 교과 연계 분석\n2. **[입학안내]** 탭: 본인의 내신 등급으로 최초합 가능 여부를 가리는 챗-알고리즘 진단기\n3. **[학사지도]** 탭: 평점 평균과 이수 학점을 모의로 계산해 드리는 학점 계산기\n\n더 상세한 키워드(예: '컴공', '도서관', '건학이념', '장학금')를 입력해 물어보시면 즉각적인 전문 요강을 매칭해 드립니다.`;
      }

      const botMsg: Message = {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#1D2C5C] text-[#00AED9] hover:bg-[#131E42] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="안내 도우미 열기"
        id="btn-chatbot-fab"
      >
        <MessageSquare size={26} className="text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AED9] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00AED9]"></span>
        </span>
      </button>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 z-40 w-[350px] sm:w-[400px] h-[520px] max-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl border border-gray-150 h-full flex flex-col overflow-hidden"
              id="chatbot-drawer"
            >
              {/* Header */}
              <div className="bg-[#1D2C5C] text-white p-4 flex justify-between items-center select-none shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-[#00AED9]">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      청우봇 (AI 가이드)
                      <span className="text-[9px] bg-[#00AED9] text-white px-1.5 py-0.5 rounded font-extrabold uppercase animate-pulse">Live</span>
                    </h3>
                    <p className="text-[10px] text-gray-300">청주대 정보 비서 서비스</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10"
                  aria-label="비서 닫기"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Scroll container */}
              <div ref={scrollRef} className="p-4 overflow-y-auto flex-1 space-y-4 bg-[#f8f9fa]">
                {messages.map((m, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {m.sender === 'bot' && (
                        <div className="w-7 h-7 bg-[#1D2C5C] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                          C
                        </div>
                      )}
                      
                      <div>
                        <div className={`p-3 rounded-lg text-xs leading-relaxed whitespace-pre-wrap ${
                          m.sender === 'user' 
                            ? 'bg-[#1D2C5C] text-white rounded-tr-none shadow-xs' 
                            : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-none shadow-xs'
                        }`}>
                          {m.text}
                        </div>
                        <span className="text-[9px] text-gray-400 mt-1 block px-1 text-right font-medium">
                          {m.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 bg-[#1D2C5C] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        C
                      </div>
                      <div className="bg-white border rounded-lg p-3 text-xs text-gray-400 flex items-center gap-1.5 shadow-xs">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce delay-100">●</span>
                        <span className="animate-bounce delay-200">●</span>
                        <span> 답변 입력 중...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested tags block */}
              <div className="p-3 border-t bg-white flex flex-wrap gap-1.5 shrink-0 select-none overflow-x-auto max-h-[85px]">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q.replace(/[💡💻🏥📚💵]\s/, ''))}
                    className="bg-gray-100 hover:bg-[#1D2C5C]/10 hover:text-[#1D2C5C] border border-gray-200 text-[10px] text-gray-600 font-bold px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input section */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputVal);
                }}
                className="p-3 border-t border-gray-200 bg-white flex shrink-0"
              >
                <input
                  type="text"
                  placeholder="메시지를 입력대기 중..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full border-none outline-hidden focus:ring-0 text-xs px-2 py-1 font-semibold"
                  id="chat-input-text"
                />
                <button
                  type="submit"
                  className="bg-[#1D2C5C] hover:bg-[#131E42] text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                  id="chat-submit-btn"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

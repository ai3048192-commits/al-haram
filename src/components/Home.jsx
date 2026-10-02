import React, { useState, useEffect } from "react";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("home"); 
  const [activeGame, setActiveGame] = useState("handwashGame"); 
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(6);
  const [attemptsLeft, setAttemptsLeft] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const handwashQuestions = [
    { id: 1, title: "قبل فحص المريض", correct: 1 },
    { id: 2, title: "قبل تركيب الكانيولا", correct: 3 },
    { id: 3, title: "بعد تغيير الضمادة", correct: 5 },
    { id: 4, title: "بعد لمس سرير المريض", correct: 2 },
    { id: 5, title: "بعد خلع القفازات", correct: 5 },
    { id: 6, title: "قبل إعطاء الدواء للمريض", correct: 3 },
    { id: 7, title: "قبل تعديل وضعية المريض", correct: 1 },
    { id: 8, title: "بعد سحب عينة دم", correct: 5 },
    { id: 9, title: "بعد الخروج من غرفة المريض", correct: 2 },
    { id: 10, title: "قبل توصيل المحلول الوريدي", correct: 3 }
  ];

  const handwashOptions = [
    { id: 1, text: "قبل ملامسة المريض", icon: "👤" },
    { id: 2, text: "بعد ملامسة المريض", icon: "✋" },
    { id: 3, text: "قبل إجراء نظيف/معقم", icon: "✨" },
    { id: 4, text: "بعد ملامسة محيط المريض", icon: "🛏️" },
    { id: 5, text: "بعد التعرض لسوائل الجسم", icon: "💧" }
  ];

  const isolationQuestions = [
    { id: 1, title: "مريض مصاب بالسل الرئوي", correct: 3 },
    { id: 2, title: "مريض مصاب بالإنفلونزا", correct: 2 },
    { id: 3, title: "مريض مصاب بـ C. difficile", correct: 1 },
    { id: 4, title: "Klebsiella MDR في chest", correct: 1 },
    { id: 5, title: "مريض MRSA", correct: 1 },
    { id: 6, title: "مريض مصاب بالحصبة", correct: 3 },
    { id: 7, title: "مريض مصاب بالسعال الديكي", correct: 2 },
    { id: 8, title: "مريض مصاب بـ VRE", correct: 1 },
    { id: 9, title: "مريض مصاب بالنكاف", correct: 2 },
    { id: 10, title: "مريض مصاب بالجديري المائي", correct: 5 }
  ];

  const isolationOptions = [
    { id: 1, text: "عزل تلامس", positionClass: "top-4 right-6", icon: "🧰" },
    { id: 2, text: "عزل رذاذ", positionClass: "top-20 left-6", icon: "💧" },
    { id: 3, text: "عزل هواء", positionClass: "top-36 right-8", icon: "🚪" },
    { id: 4, text: "عزل تلامس/رذاذ", positionClass: "bottom-20 left-1/2 -translate-x-1/2", icon: "🛏️" },
    { id: 5, text: "عزل تلامس/هواء", positionClass: "bottom-6 left-6", icon: "⚡" }
  ];

  const shuffleArray = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    if (activeGame === "handwashGame") {
      setShuffledOptions(shuffleArray(handwashOptions));
    } else {
      setShuffledOptions(shuffleArray(isolationOptions));
    }
  }, [currentIndex, activeGame]);

  useEffect(() => {
    let timer;
    if ((currentScreen === "handwashGame" || currentScreen === "isolationGame") && isGameActive && timeLeft > 0 && !feedback) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive && !feedback) {
      handleTimeOut();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, currentScreen, feedback]);

  const handleTimeOut = () => {
    const questionsList = activeGame === "handwashGame" ? handwashQuestions : isolationQuestions;
    const currentQ = questionsList[currentIndex];

    setUserAnswers(prev => [...prev, { question: currentQ.title, selected: null, correct: currentQ.correct, isCorrect: false }]);
    setFeedback("انتهى الوقت! ❌");
    setTimeout(() => nextQuestionOrFinish(), 1200);
  };

  const nextQuestionOrFinish = () => {
    setFeedback(null);
    setSelectedOption(null);
    setTimeLeft(6);
    setAttemptsLeft(1);

    const questionsList = activeGame === "handwashGame" ? handwashQuestions : isolationQuestions;
    
    if (currentIndex < questionsList.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsGameActive(false);
      setCurrentScreen("results");
    }
  };

  const handleAnswer = (optId) => {
    const questionsList = activeGame === "handwashGame" ? handwashQuestions : isolationQuestions;
    const currentQ = questionsList[currentIndex];
    const isCorrect = optId === currentQ.correct;
    
    setSelectedOption(optId);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback("إجابة صحيحة وممتازة! 🌟");
      setUserAnswers(prev => [...prev, { question: currentQ.title, selected: optId, correct: currentQ.correct, isCorrect: true }]);
    } else {
      setFeedback("إجابة خاطئة للأسف! ❌");
      setUserAnswers(prev => [...prev, { question: currentQ.title, selected: optId, correct: currentQ.correct, isCorrect: false }]);
    }
    
    setTimeout(() => nextQuestionOrFinish(), 1100);
  };

  const startGameDirectly = (gameType) => {
    setShowHowToPlay(false);
    setActiveGame(gameType);
    setCurrentScreen(gameType);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(6);
    setAttemptsLeft(1);
    setUserAnswers([]);
    setIsGameActive(true);
  };

  const getOptionText = (optId, type) => {
    if (!optId) return "لم يتم الإجابة";
    if (type === "handwashGame") {
      const found = handwashOptions.find(o => o.id === optId);
      return found ? found.text : "";
    } else {
      const found = isolationOptions.find(o => o.id === optId);
      return found ? found.text : "";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#0c051a] via-[#120720] to-[#1e0a2f] p-2 sm:p-4" dir="rtl">
      
      {/* إطار الموبايل (مضبوط بمرونة للمقاسات المختلفة) */}
      <div className="w-full max-w-[390px] h-[850px] max-h-[95vh] bg-gradient-to-b from-[#150824] via-[#10041a] to-[#0a0212] rounded-[36px] sm:rounded-[48px] border-[3px] border-purple-500/40 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(234,88,12,0.15),0_0_80px_rgba(147,51,235,0.2)] relative">
        
        {/* إضاءات خلفية */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* ترويسة علوية */}
        <div className="pt-4 pb-2.5 px-4 sm:px-6 bg-gradient-to-r from-[#1b0a30] via-[#220c3d] to-[#1b0a30] border-b border-purple-500/20 relative z-20 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-400/30 text-sm">
              🛡️
            </div>
            <div className="text-right">
              <h2 className="text-xs font-black text-white tracking-wide">مستشفى الهرم</h2>
              <p className="text-[10px] text-orange-400 font-bold">فريق مكافحة العدوى</p>
            </div>
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-900/80 to-orange-950/80 border border-orange-500/30 text-[10px] text-orange-200 font-bold shadow-inner">
            تحدي الذكاء 🔥
          </div>
        </div>

        {/* محتوى الشاشات */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:p-5 flex flex-col justify-between relative z-10">

          {/* الشاشة الرئيسية */}
          {currentScreen === "home" && (
            <div className="w-full flex flex-col items-center justify-center flex-1 space-y-5 my-auto">
              <div className="text-center space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/30 text-orange-300 text-[11px] font-black tracking-wide">
                  <span>✨</span> منصة التحدي والتقييم الذكي
                </div>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  اختر مسار الاختبار الخاص بك
                </h1>
                <p className="text-xs text-purple-200/70 max-w-[270px] mx-auto leading-relaxed">
                  طوّر مهاراتك السريرية في مكافحة العدوى عبر الألعاب التفاعلية المعتمدة
                </p>
              </div>

              <div className="w-full space-y-3 pb-2">
                <div 
                  onClick={() => setCurrentScreen("handwashIntro")}
                  className="w-full bg-gradient-to-r from-[#200d3b] via-[#290e4a] to-[#36125c] hover:from-[#2a0f4f] hover:to-[#431674] p-3.5 sm:p-4 rounded-3xl border border-purple-500/30 hover:border-orange-500/60 shadow-xl cursor-pointer transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-600/30 shrink-0 ml-3 group-hover:rotate-6 transition-transform border border-orange-400/30">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">لعبة غسيل الأيدي</h3>
                      <p className="text-[11px] text-purple-200/60 mt-0.5">اللحظات الخمس للتعقيم الطبي</p>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all text-xs font-bold">
                      ➔
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentScreen("isolationIntro")}
                  className="w-full bg-gradient-to-r from-[#200d3b] via-[#290e4a] to-[#36125c] hover:from-[#2a0f4f] hover:to-[#431674] p-3.5 sm:p-4 rounded-3xl border border-purple-500/30 hover:border-purple-400/60 shadow-xl cursor-pointer transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0 ml-3 group-hover:rotate-6 transition-transform border border-purple-400/30">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">لعبة أنواع العزل</h3>
                      <p className="text-[11px] text-purple-200/60 mt-0.5">احتياطات العزل للحالات المرضية</p>
                    </div>
                    <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-all text-xs font-bold">
                      ➔
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* مقدمة غسيل الأيدي */}
          {currentScreen === "handwashIntro" && (
            <div className="w-full flex flex-col justify-between flex-1 py-2">
              <div className="w-full flex justify-start">
                <button onClick={() => setCurrentScreen("home")} className="bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs px-3.5 py-1.5 rounded-2xl hover:bg-purple-900/80 transition-all font-bold">
                  🏠 الرئيسية
                </button>
              </div>
              <div className="text-center space-y-3 my-auto">
                <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-[28px] mx-auto flex items-center justify-center shadow-2xl shadow-orange-500/30 border border-orange-400/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h1 className="text-lg font-black text-white">لعبة غسيل الأيدي</h1>
                <p className="text-xs text-purple-200/80 max-w-[260px] mx-auto leading-relaxed">
                  اختبر معلوماتك في تحديد اللحظات الخمس الدقيقة لغسيل الأيدي طبقاً لمعايير مكافحة العدوى.
                </p>
              </div>
              {/* تم رفع الأزرار للأعلى قليلاً وإضافة مسافة آمنة بالأسفل */}
              <div className="w-full space-y-2 pb-3">
                <button 
                  onClick={() => startGameDirectly("handwashGame")}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 text-white font-black py-3 rounded-2xl shadow-lg shadow-orange-600/40 text-xs sm:text-sm transition-all border border-orange-400/30"
                >
                  ابدأ التحدي الآن ➔
                </button>
                <button 
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full bg-gradient-to-r from-purple-900/80 to-[#290e4a] text-purple-200 font-bold py-2.5 rounded-2xl text-xs transition-all border border-purple-500/30 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>💡</span> ازاي نلعب؟ (شرح اللعبة)
                </button>
              </div>
            </div>
          )}

          {/* شاشة أسئلة غسيل الأيدي */}
          {currentScreen === "handwashGame" && (
            <div className="w-full flex flex-col justify-between flex-1 py-1 pb-2">
              <div className="w-full flex justify-between items-center mb-1">
                <button onClick={() => setCurrentScreen("handwashIntro")} className="bg-purple-950/60 border border-purple-500/30 text-orange-300 text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1">
                  ⬅️ رجوع
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${timeLeft <= 2 ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' : 'bg-purple-900/60 text-purple-200 border-purple-500/30'}`}>
                    ⏱️ {timeLeft}ث
                  </span>
                  <div className="text-xs font-black bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-2xl">
                    {score} ⭐
                  </div>
                </div>
              </div>

              <div className="w-full bg-purple-950/80 h-2 rounded-full overflow-hidden border border-purple-500/30 my-1">
                <div 
                  className="bg-gradient-to-r from-purple-600 via-orange-500 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / handwashQuestions.length) * 100}%` }}
                ></div>
              </div>

              <div className="bg-gradient-to-b from-[#220c3d] to-[#140524] border border-purple-500/40 p-3.5 sm:p-4 rounded-3xl shadow-xl text-center my-1.5 backdrop-blur-md relative">
                <span className="text-lg mb-0.5 block">📌</span>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                  {handwashQuestions[currentIndex].title}
                </h3>
                <p className="text-[10px] text-orange-400 mt-0.5 font-bold">اختر الإجراء أو اللحظة الصحيحة 👇</p>
              </div>

              {feedback && (
                <div className="bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/40 text-orange-200 text-xs p-2 rounded-2xl text-center font-black animate-pulse my-1">
                  {feedback}
                </div>
              )}

              {/* تم رفع الخيارات قليلاً وزيادة الترتيب المضغوط للموبايل */}
              <div className="space-y-1.5 w-full my-1 pb-2">
                {shuffledOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl border flex items-center justify-between text-xs font-bold text-white transition-all ${
                      selectedOption === opt.id
                        ? "bg-gradient-to-r from-orange-500 to-amber-600 border-orange-300 scale-[1.02] shadow-lg"
                        : "bg-gradient-to-r from-[#200d3b] to-[#2c104e] hover:from-[#2d1154] hover:to-[#3b176a] border-purple-500/30 hover:border-orange-500/50"
                    }`}
                  >
                    <span className="text-right flex-1 ml-2">{opt.text}</span>
                    <span className="w-7 h-7 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs shrink-0">
                      {opt.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* مقدمة أنواع العزل */}
          {currentScreen === "isolationIntro" && (
            <div className="w-full flex flex-col justify-between flex-1 py-2">
              <div className="w-full flex justify-start">
                <button onClick={() => setCurrentScreen("home")} className="bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs px-3.5 py-1.5 rounded-2xl hover:bg-purple-900/80 transition-all font-bold">
                  🏠 الرئيسية
                </button>
              </div>
              <div className="text-center space-y-3 my-auto">
                <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-indigo-800 rounded-[28px] mx-auto flex items-center justify-center shadow-2xl shadow-purple-600/40 border border-purple-400/30">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h1 className="text-lg font-black text-white">لعبة أنواع العزل</h1>
                <p className="text-xs text-purple-200/80 max-w-[260px] mx-auto leading-relaxed">
                  حدد بدقة نوع العزل الاحترافي (عزل تلامس، عزل رذاذ، عزل هواء) المناسب للحالات المرضية المختلفة.
                </p>
              </div>
              {/* تم رفع الأزرار للأعلى قليلاً */}
              <div className="w-full space-y-2 pb-3">
                <button 
                  onClick={() => startGameDirectly("isolationGame")}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 text-white font-black py-3 rounded-2xl shadow-lg shadow-purple-700/40 text-xs sm:text-sm transition-all border border-purple-400/30"
                >
                  ابدأ التحدي الآن ➔
                </button>
                <button 
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full bg-gradient-to-r from-purple-900/80 to-[#290e4a] text-purple-200 font-bold py-2.5 rounded-2xl text-xs transition-all border border-purple-500/30 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>💡</span> ازاي نلعب؟ (شرح اللعبة)
                </button>
              </div>
            </div>
          )}

          {/* شاشة أسئلة أنواع العزل */}
          {currentScreen === "isolationGame" && (
            <div className="w-full flex flex-col justify-between flex-1 py-1 pb-2 relative">
              <div className="w-full flex justify-between items-center mb-1 z-20">
                <button onClick={() => setCurrentScreen("isolationIntro")} className="bg-purple-900/80 hover:bg-purple-800 text-orange-200 text-xs px-3 py-1.5 rounded-xl font-bold shadow flex items-center gap-1 border border-purple-500/40">
                  ⬅️ رجوع
                </button>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${timeLeft <= 2 ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' : 'bg-purple-950/80 text-orange-200 border-purple-500/40'}`}>
                    ⏱️ {timeLeft}ث
                  </span>
                  <div className="text-xs font-black bg-gradient-to-r from-orange-500/20 to-purple-600/20 text-orange-300 px-3 py-1.5 rounded-2xl border border-orange-500/40 shadow">
                    {score} ⭐
                  </div>
                </div>
              </div>

              <div className="text-center text-[11px] font-bold text-orange-300 mb-1 z-20">
                الموقف {currentIndex + 1} من {isolationQuestions.length}
              </div>

              <div className="bg-gradient-to-r from-[#280c45] via-[#35105c] to-[#200838] text-white p-3.5 rounded-3xl shadow-xl flex items-center justify-between border border-orange-500/30 z-20 mb-1.5">
                <div className="text-right flex-1 ml-2">
                  <span className="text-[10px] text-orange-400 font-bold block mb-0.5">الحالة المرضية:</span>
                  <h3 className="text-xs font-black tracking-tight leading-relaxed text-white">
                    {isolationQuestions[currentIndex].title}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 text-white flex items-center justify-center shrink-0 border border-orange-400/40 text-base shadow-md">
                  🛏️
                </div>
              </div>

              {feedback && (
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs p-2 rounded-2xl text-center font-black animate-pulse z-30 shadow-lg mb-1">
                  {feedback}
                </div>
              )}

              {/* تم ضبط مساحات الأزرار الدائرية وإحداثياتها لكي تتناسب مع الشاشات الصغيرة دون تداخل */}
              <div className="flex-1 bg-gradient-to-b from-[#180829] via-[#120520] to-[#0a0214] rounded-3xl border border-purple-500/30 relative overflow-hidden p-2.5 shadow-inner my-1">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.08)_0%,transparent_70%)] pointer-events-none"></div>
                
                {shuffledOptions.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className={`absolute ${opt.positionClass} cursor-pointer group transition-all duration-300 hover:scale-105`}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="absolute -inset-1.5 bg-orange-500/20 rounded-full blur-sm group-hover:bg-orange-500/40"></div>
                      
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-base shadow-lg border-2 transition-all ${
                        selectedOption === opt.id 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-white scale-110 shadow-orange-500/50' 
                          : 'bg-gradient-to-br from-[#290e4a] to-[#1c0733] text-white border-orange-500/50 group-hover:border-orange-400'
                      }`}>
                        {opt.icon}
                      </div>

                      <div className="mt-0.5 bg-[#1a082d]/95 backdrop-blur-sm px-2 py-0.5 rounded-lg shadow border border-purple-500/40 text-[9px] font-black text-white text-center whitespace-nowrap">
                        {opt.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* شاشة النتائج والمراجعة */}
          {currentScreen === "results" && (() => {
            const correctCount = userAnswers.filter(item => item.isCorrect).length;
            const incorrectCount = userAnswers.length - correctCount;
            const totalQ = userAnswers.length || 1;
            const correctPercentage = Math.round((correctCount / totalQ) * 100);
            const incorrectPercentage = 100 - correctPercentage;

            return (
              <div className="w-full flex flex-col justify-between flex-1 py-1 overflow-y-auto pb-2">
                <div className="text-center space-y-1.5">
                  <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl mx-auto flex items-center justify-center shadow-xl border border-orange-400 text-xl">
                    🎉
                  </div>
                  <h1 className="text-base sm:text-lg font-black text-white">أنهيت التحدي بنجاح!</h1>
                  <p className="text-xs text-orange-300 font-bold">مجموع النقاط: {score} من 100 ⭐</p>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="bg-purple-950/60 border border-purple-500/40 p-2 rounded-2xl text-center shadow">
                      <div className="text-orange-400 text-[10px] font-bold">الإجابات الصحيحة ✅</div>
                      <div className="text-white text-xs font-black mt-0.5">{correctCount} ({correctPercentage}%)</div>
                    </div>
                    <div className="bg-red-950/60 border border-red-500/40 p-2 rounded-2xl text-center shadow">
                      <div className="text-red-400 text-[10px] font-bold">الإجابات الخاطئة ❌</div>
                      <div className="text-white text-xs font-black mt-0.5">{incorrectCount} ({incorrectPercentage}%)</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 my-2 max-h-[190px] overflow-y-auto px-0.5">
                  <h3 className="text-[11px] font-bold text-purple-300 text-right">مراجعة الإجابات التفصيلية:</h3>
                  {userAnswers.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2 rounded-2xl border text-right text-[10px] ${
                        item.isCorrect 
                          ? 'bg-purple-950/50 border-purple-500/40 text-purple-100' 
                          : 'bg-red-950/40 border-red-500/40 text-red-200'
                      }`}
                    >
                      <div className="font-black flex justify-between items-center mb-0.5">
                        <span>{idx + 1}. {item.question}</span>
                        <span>{item.isCorrect ? '✅ صح' : '❌ خطأ'}</span>
                      </div>
                      <div className="text-[10px] text-purple-200/80">
                        إجابتك: <span className="font-bold">{getOptionText(item.selected, activeGame)}</span>
                      </div>
                      {!item.isCorrect && (
                        <div className="text-[10px] text-orange-400 mt-0.5">
                          الإجابة الصحيحة: <span className="font-bold">{getOptionText(item.correct, activeGame)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* تم رفع الأزرار للأعلى قليلاً لتجنب الخروج عن إطار الموبايل */}
                <div className="space-y-2 mt-1 pb-2">
                  <button 
                    onClick={() => startGameDirectly(activeGame)}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 text-white font-black py-2.5 rounded-2xl text-xs shadow-lg transition-all border border-orange-400/30"
                  >
                    🔄 اعادة المحاولة
                  </button>
                  <button 
                    onClick={() => setCurrentScreen(activeGame === "handwashGame" ? "handwashIntro" : "isolationIntro")}
                    className="w-full bg-gradient-to-r from-purple-900 to-[#290e4a] text-purple-200 font-bold py-2 rounded-2xl text-xs transition-all border border-purple-500/30 shadow-md"
                  >
                    ⬅️ العودة لصفحة اللعبة (المقدمة)
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

        {/* نافذة "ازاي نلعب؟" المنبثقة */}
        {showHowToPlay && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 animate-in fade-in duration-200">
            <div className="bg-gradient-to-b from-[#240c42] via-[#160628] to-[#10031a] border border-purple-500/40 p-4 sm:p-5 rounded-[32px] shadow-[0_0_50px_rgba(147,51,235,0.3)] max-w-[340px] w-full text-right space-y-3 relative">
              
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                <h3 className="text-xs font-black text-orange-400 tracking-wide flex items-center gap-1.5">
                  <span>💡</span> نظام اللعبة وكيفية التحدي
                </h3>
                <button 
                  onClick={() => setShowHowToPlay(false)}
                  className="w-6 h-6 rounded-full bg-purple-950 border border-purple-500/30 text-purple-300 flex items-center justify-center text-[10px] font-bold hover:bg-purple-900 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-[11px] text-purple-100">
                <div className="bg-gradient-to-r from-[#2c104e]/80 to-[#1f0938]/80 p-2.5 rounded-2xl border border-purple-500/20 flex items-center justify-between shadow-inner">
                  <span className="text-[11px] text-purple-200 font-medium text-right leading-tight flex-1 ml-2">
                    هتظهرلك حالة واقعية — اختر الإجراء الصح قبل ما الوقت (<span className="text-orange-400 font-bold">6 ثوانٍ</span>) يخلص!
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shrink-0 shadow border border-orange-400/30 text-xs">
                    🩺
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#2c104e]/80 to-[#1f0938]/80 p-2.5 rounded-2xl border border-purple-500/20 flex items-center justify-between shadow-inner">
                  <span className="text-[11px] text-purple-200 font-medium text-right leading-tight flex-1 ml-2">
                    لديك <span className="text-orange-400 font-bold">محاولة واحدة فقط</span> لكل سؤال، فكن دقيقاً!
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow border border-blue-400/30 text-white text-xs font-bold">
                    🎯
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-orange-950/50 p-2.5 rounded-2xl border border-orange-500/30 flex items-center justify-between shadow-inner">
                  <span className="text-[11px] text-orange-200 font-bold text-right leading-tight flex-1 ml-2">
                    🔥 زر الرجوع أثناء اللعبة يوديك لصفحة الشرح والمقدمة الخاصة باللعبة مش للقائمة الرئيسية!
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shrink-0 shadow border border-orange-400/30 text-xs">
                    ⬅️
                  </div>
                </div>
              </div>

              <button 
                onClick={() => startGameDirectly(activeGame)}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 text-white font-black py-2.5 rounded-2xl text-xs shadow-lg shadow-orange-600/30 transition-all border border-orange-400/30"
              >
                فهمت! يلا نبدأ 🚀
              </button>

              <div className="text-center pt-0.5">
                <p className="text-[9px] text-purple-300/60 font-medium">
                  إعداد: فريق مكافحة العدوى — مستشفى الهرم
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

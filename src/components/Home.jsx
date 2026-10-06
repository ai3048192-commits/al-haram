import React, { useState, useEffect } from "react";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // أسئلة اللعبة "خارج الصندوق" وبالمصري الخالص
  const questions = [
    {
      id: 1,
      title: "نزلت من البيت الصبح، ولقيت الميكروباص أو العربية زحمة.. رد فعل أعصابك إيه؟",
      options: [
        { id: 1, text: "بصبر نفسي وأقول بكرة أحلى 🧘‍♂️", points: 25, icon: "🌿" },
        { id: 2, text: "بتعصب بس بسكت عشان اليوم ما يبوظش 🤐", points: 15, icon: "☕" },
        { id: 3, text: "العروق بتطلع في قورتي وعايزمولاة ولطمة 🤯", points: 5, icon: "🔥" },
        { id: 4, text: "بقرر أرجع أنام تاني وأطنش الدنيا 🛏️", points: 20, icon: "🌙" }
      ]
    },
    {
      id: 2,
      title: "شخص في الشغل أو الصحاب رخم عليك بكلمة.. بتتعامل إزاي؟",
      options: [
        { id: 1, text: "ببرد عليه بابتسامة تخليه يتحرج لوحده 😎", points: 25, icon: "🧊" },
        { id: 2, text: "بحط في قلبي وأقعد أفكر فيها بالليل وأنا نايم 🧠", points: 10, icon: "💭" },
        { id: 3, text: "رد الإهانة بألعن منها فوراً مفيش وقت ⚡", points: 5, icon: "⚡" },
        { id: 4, text: "بعمل نفسي أطرش وأطنش أصلاً 🎧", points: 20, icon: "🚶‍♂️" }
      ]
    },
    {
      id: 3,
      title: "أكتر حاجة بتفصل دماغك وتديك طاقة إيجابية بالليل إيه؟",
      options: [
        { id: 1, text: "قعدة هادية مع كوباية نسكافيه وموبايل صامت ☕", points: 25, icon: "✨" },
        { id: 2, text: "أكل حاجة حلوة تضرب في الانسولين وتعدل المزاج 🍫", points: 20, icon: "🍰" },
        { id: 3, text: "النوم العميق فوراً أول ما أحط رأسي على المخخدة 🛌", points: 25, icon: "💤" },
        { id: 4, text: "ألف في الشارع بلا هدف لحد ما أصفى 🚗", points: 15, icon: "🌃" }
      ]
    },
    {
      id: 4,
      title: "لما بتعب أو يجيلي إرهاق جسدي، أول حاجة بتعملها إيه؟",
      options: [
        { id: 1, text: "أجري أزور الدكتورة وأطمن على نفسي فوراً 🩺", points: 25, icon: "💖" },
        { id: 2, text: "أشرب أعشاب وأنام وأنا ساكت 🍃", points: 20, icon: "🍵" },
        { id: 3, text: "أكبر دماغي لحد ما الجسم ينهار لوحده 🤷‍♂️", points: 5, icon: "⚠️️" },
        { id: 4, text: "أسأل جروبات العيلة والفيسبوك أخد إيه 📱", points: 10, icon: "💬" }
      ]
    }
  ];

  const handleAnswer = (option) => {
    setSelectedOption(option.id);
    setScore(prev => prev + option.points);
    setFeedback(`اختيار رايق: ${option.text}`);

    setUserAnswers(prev => [
      ...prev,
      { question: questions[currentIndex].title, selectedText: option.text }
    ]);

    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentScreen("results");
      }
    }, 1000);
  };

  const startTest = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setCurrentScreen("game");
    setShowHowToPlay(false);
  };

  const getResultAnalysis = () => {
    if (score >= 85) {
      return {
        title: "روقان وزهوة وعقل رايق 🌟",
        desc: "ما شاء الله أعصابك حديد ورايق ومش بتخلي أي حاجة تضايقك. بس برضه صحتك تهمنا، ودكتورة [اسم الدكتورة] بتقولك حافظ على الروقان ده!"
      };
    } else if (score >= 50) {
      return {
        title: "حبة فوق وحبة تحت ( ماشي الحال ) ☕",
        desc: "أنت ماشي بالستر يا صاحبي! يوم بتبقى رايق ويوم الدنيا بتجيبك لورا. محتاج تفصل شوية وتدلع نفسك."
      };
    } else {
      return {
        title: "إنذار خطر! الفيشة فصلت تماماً 🔥",
        desc: "يا ساتر يا رب! ده أنت أعصابك متدمرة والضغط طالع للسماء من الزحمة والتوتر. محتاج كبسولة طاقة عاجلة وزيارة سريعة للعيادة تظبط بيها الدماغ!"
      };
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#070314] via-[#100624] to-[#1c0838] p-2 sm:p-4" dir="rtl">
      
      {/* إطار الموبايل الأنيق */}
      <div className="w-full max-w-[390px] h-[850px] max-h-[95vh] bg-gradient-to-b from-[#130722] via-[#0d0317] to-[#05010a] rounded-[36px] sm:rounded-[48px] border-[3px] border-pink-500/30 flex flex-col justify-between overflow-hidden shadow-[0_0_60px_rgba(236,72,153,0.15),0_0_90px_rgba(139,92,246,0.2)] relative">
        
        {/* خلفيات إضاءة ناعمة (Glow) */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* الترويسة العلوية */}
        <div className="pt-4 pb-2.5 px-4 sm:px-6 bg-gradient-to-r from-[#18082e] via-[#220d3f] to-[#18082e] border-b border-pink-500/20 relative z-20 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 border border-pink-400/30 text-sm">
              🧠
            </div>
            <div className="text-right">
              <h2 className="text-xs font-black text-white tracking-wide">عيادة د. [اسم الدكتورة]</h2>
              <p className="text-[10px] text-pink-400 font-bold">رادار المزاج والروقان</p>
            </div>
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-900/80 to-pink-950/80 border border-pink-500/30 text-[10px] text-pink-200 font-bold shadow-inner">
            تجارب حية ✨
          </div>
        </div>

        {/* محتوى الشاشات */}
        <div className="flex-1 overflow-y-auto px-4 py-3 sm:p-5 flex flex-col justify-between relative z-10">

          {/* 1. الشاشة الرئيسية */}
          {currentScreen === "home" && (
            <div className="w-full flex flex-col items-center justify-center flex-1 space-y-6 my-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-[28px] mx-auto flex items-center justify-center shadow-2xl shadow-pink-500/30 border border-pink-400/30 animate-bounce">
                <span className="text-3xl">☕</span>
              </div>
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] font-black tracking-wide">
                  <span>✨</span> إفصل عن زحمة اليوم
                </span>
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  أعصابك عاملة إيه النهارده؟
                </h1>
                <p className="text-xs text-purple-200/70 max-w-[270px] mx-auto leading-relaxed">
                  تعال نعمل اختبار سريع وخفيف بعيد عن الدوشة، ونعرف حالتك المزاجية الحقيقية برعاية العيادة.
                </p>
              </div>

              <div className="w-full space-y-2.5 pt-2">
                <button 
                  onClick={startTest}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 text-white font-black py-3 rounded-2xl shadow-lg shadow-pink-600/40 text-xs sm:text-sm transition-all border border-pink-400/30"
                >
                  ابدأ الاختبار السريع ➔
                </button>
                <button 
                  onClick={() => setShowHowToPlay(true)}
                  className="w-full bg-gradient-to-r from-purple-900/60 to-[#220c3d] text-purple-200 font-bold py-2.5 rounded-2xl text-xs transition-all border border-purple-500/30 flex items-center justify-center gap-2 shadow-md"
                >
                  <span>💡</span> فكرة اللعبة دي إيه؟
                </button>
              </div>
            </div>
          )}

          {/* 2. شاشة الأسئلة */}
          {currentScreen === "game" && (
            <div className="w-full flex flex-col justify-between flex-1 py-1">
              <div className="w-full flex justify-between items-center mb-2">
                <button onClick={() => setCurrentScreen("home")} className="bg-purple-950/60 border border-purple-500/30 text-pink-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  🏠 الرئيسية
                </button>
                <div className="text-xs font-black bg-pink-500/20 border border-pink-500/40 text-pink-300 px-3 py-1.5 rounded-2xl">
                  السؤال {currentIndex + 1} من {questions.length} 🎯
                </div>
              </div>

              {/* شريط التقدم */}
              <div className="w-full bg-purple-950/80 h-2 rounded-full overflow-hidden border border-purple-500/30 my-1">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* كارت السؤال */}
              <div className="bg-gradient-to-b from-[#220d3f] to-[#130626] border border-pink-500/30 p-4 rounded-3xl shadow-xl text-center my-2 backdrop-blur-md">
                <span className="text-2xl mb-1 block">📌</span>
                <h3 className="text-xs sm:text-sm font-black text-white leading-relaxed">
                  {questions[currentIndex].title}
                </h3>
              </div>

              {feedback && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/40 text-pink-200 text-xs p-2.5 rounded-2xl text-center font-black animate-pulse my-1">
                  {feedback}
                </div>
              )}

              {/* خيارات الإجابة */}
              <div className="space-y-2 w-full my-2">
                {questions[currentIndex].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between text-xs font-bold text-white transition-all ${
                      selectedOption === opt.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 border-pink-300 scale-[1.02] shadow-lg"
                        : "bg-gradient-to-r from-[#1c0a33] to-[#280e4a] hover:from-[#260e44] hover:to-[#351361] border-purple-500/30 hover:border-pink-500/50"
                    }`}
                  >
                    <span className="text-right flex-1 ml-2 leading-relaxed">{opt.text}</span>
                    <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-sm shrink-0">
                      {opt.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. شاشة النتائج */}
          {currentScreen === "results" && (() => {
            const result = getResultAnalysis();
            return (
              <div className="w-full flex flex-col justify-between flex-1 py-2 overflow-y-auto">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl border border-pink-400 text-2xl">
                    🎉
                  </div>
                  <h1 className="text-base sm:text-lg font-black text-white">نتيجة رادار مزاجك:</h1>
                  <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl">
                    <h2 className="text-xs font-black text-pink-300 mb-1">{result.title}</h2>
                    <p className="text-[11px] text-purple-200/90 leading-relaxed">{result.desc}</p>
                  </div>
                </div>

                {/* ملخص الإجابات السريعة */}
                <div className="space-y-1.5 my-2 max-h-[160px] overflow-y-auto px-1">
                  <h3 className="text-[11px] font-bold text-purple-300 text-right">إجاباتك اللي كشفتك:</h3>
                  {userAnswers.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-purple-950/50 border border-purple-500/20 text-right text-[10px]">
                      <div className="text-purple-300 font-bold">{idx + 1}. {item.question}</div>
                      <div className="text-white mt-0.5 font-medium">✨ {item.selectedText}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  <button 
                    onClick={startTest}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 text-white font-black py-2.5 rounded-2xl text-xs shadow-lg transition-all border border-pink-400/30"
                  >
                    🔄 إعادة الاختبار
                  </button>
                  <button 
                    onClick={() => setCurrentScreen("home")}
                    className="w-full bg-gradient-to-r from-purple-900 to-[#220c3d] text-purple-200 font-bold py-2 rounded-2xl text-xs transition-all border border-purple-500/30 shadow-md"
                  >
                    🏠 العودة للرئيسية
                  </button>
                </div>
              </div>
            );
          })()}

        </div>

        {/* نافذة "فكرة اللعبة دي إيه؟" */}
        {showHowToPlay && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3">
            <div className="bg-gradient-to-b from-[#220d3f] via-[#150628] to-[#0d0317] border border-pink-500/40 p-4 sm:p-5 rounded-[32px] shadow-2xl max-w-[340px] w-full text-right space-y-3 relative">
              
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                <h3 className="text-xs font-black text-pink-400 tracking-wide flex items-center gap-1.5">
                  <span>💡</span> عن الفكرة بره الصندوق
                </h3>
                <button 
                  onClick={() => setShowHowToPlay(false)}
                  className="w-6 h-6 rounded-full bg-purple-950 border border-pink-500/30 text-pink-300 flex items-center justify-center text-[10px] font-bold hover:bg-purple-900 transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-[11px] text-purple-100 leading-relaxed">
                <p>
                  🎯 بلاش الكلام الطبي الناشف اللي بيخوف الناس. الفكرة هنا عبارة عن <span className="text-pink-400 font-bold">ترفيه خفيف ومصري أصيل</span> يقرب الدكتورة للمتابعين بطريقة مرحة تخليهم يشاركونا اللينك مع أصحابهم.
                </p>
                <p>
                  💖 في الآخر بنربط صفاء المزاج والصحة العامة بالاهتمام بالنفس وزيارة العيادة بأسلوب لطيف ودبدوب جداً!
                </p>
              </div>

              <button 
                onClick={startTest}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black py-2.5 rounded-2xl text-xs shadow-lg transition-all border border-pink-400/30"
              >
                فهمت اللعبة! يلا نبدأ 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

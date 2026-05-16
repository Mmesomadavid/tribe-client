import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Briefcase, Users, Sparkles } from 'lucide-react';

const HOW_IT_WORKS = [
  { step: 1, title: 'Create your profile', desc: 'Tell us about your skills and preferences so AI can match you.', icon: Sparkles },
  { step: 2, title: 'Get matched', desc: 'AI recommends the best roles or candidates tailored to you.', icon: Briefcase },
  { step: 3, title: 'Connect & hire', desc: 'Message, interview, and hire — all in one place.', icon: Users },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.step-card'),
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.65, stagger: 0.18, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    );
  }, []);
 
  return (
    <section ref={sectionRef} className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-950 tracking-tight">
            Three steps to your<br />
            <span className="text-gray-400 font-light italic">perfect match.</span>
          </h2>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="step-card opacity-0 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gray-950 flex items-center justify-center shadow-lg">
                  <step.icon size={22} className="text-white" />
                </div>
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-400 flex items-center justify-center shadow-sm">
                  {step.step}
                </span>
              </div>
              <h3 className="font-semibold text-[17px] text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks
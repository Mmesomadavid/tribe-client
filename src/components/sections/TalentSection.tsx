import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

const TOP_TALENT = [
  { name: 'Aisha Okonkwo', role: 'Product Designer',    skills: ['Figma', 'UX Research'], rate: '$85/hr',  avatar: 'AO', avail: true  },
  { name: 'Marcus Chen',   role: 'Full-Stack Engineer', skills: ['React', 'Node.js'],     rate: '$110/hr', avatar: 'MC', avail: true  },
  { name: 'Sofia Herrera', role: 'Data Scientist',      skills: ['Python', 'ML'],         rate: '$95/hr',  avatar: 'SH', avail: false },
  { name: 'James Oduya',   role: 'Brand Strategist',    skills: ['Strategy', 'Copy'],     rate: '$75/hr',  avatar: 'JO', avail: true  },
];


const TalentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.talent-card'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    );
  }, []);
 
  return (
    <section ref={sectionRef} className="bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Top Talent</p>
            <h2 className="text-3xl font-semibold text-white tracking-tight leading-tight">
              Hire people who<br />
              <span className="text-gray-500 font-light italic">get things done.</span>
            </h2>
          </div>
          <a href="/talent" className="hidden sm:flex text-[13px] font-medium text-gray-400 hover:text-white items-center gap-1 transition-colors">
            Browse talent <ArrowRight size={13} />
          </a>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_TALENT.map((person) => (
            <div key={person.name} className="talent-card group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer opacity-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-gray-800 text-white text-sm font-semibold">{person.avatar}</AvatarFallback>
                  </Avatar>
                  {person.avail && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-gray-950" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{person.name}</p>
                  <p className="text-[12px] text-gray-400">{person.role}</p>
                </div>
              </div>
 
              <div className="flex flex-wrap gap-1.5 mb-4">
                {person.skills.map((skill) => (
                  <span key={skill} className="text-[11px] bg-white/10 text-gray-300 px-2.5 py-1 rounded-lg">{skill}</span>
                ))}
              </div>
 
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">{person.rate}</p>
                  <p className="text-[11px] text-gray-500">{person.avail ? 'Available now' : 'Booked'}</p>
                </div>
                <button className="h-8 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentSection
import { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {Search, MapPin, Sparkles} from "lucide-react"
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";



const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};


const Hero = () => {
  const [query,    setQuery]    = useState('');
  const [location, setLocation] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    gsap.to('.hero-badge', {
      y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.4,
    });
  }, []);
 
  return (
    <section ref={heroRef} className="relative pt-28 pb-20 overflow-hidden bg-white">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-gray-50 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none" />
 
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
 
          {/* Eyebrow */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={0}
            className="hero-badge inline-flex items-center gap-2 mb-6 bg-gray-950 text-white text-xs font-medium px-4 py-2 rounded-full"
          >
            <Sparkles size={11} className="text-yellow-400" />
            AI-Powered Labour Marketplace
            <span className="h-1 w-1 rounded-full bg-green-500" />
            Now in Beta
          </motion.div>
 
          {/* Headline */}
          <motion.h1 variants={itemVariants} initial="hidden" animate="visible" custom={1}
            className="text-[3.5rem] sm:text-[4.5rem] leading-[1.08] font-semibold tracking-tight text-gray-950 mb-6"
          >
            Find the work<br />
            <span className="text-gray-400 font-light italic">that finds you.</span>
          </motion.h1>
 
          <motion.p variants={itemVariants} initial="hidden" animate="visible" custom={2}
            className="text-[17px] text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto"
          >
            Tribe matches top talent with great companies using AI — so every application lands where it counts.
          </motion.p>
 
          {/* Search */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={3}
            className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-2 shadow-lg shadow-gray-100"
          >
            <div className="flex items-center gap-2.5 flex-1 px-3">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Job title, skills, or company" value={query} onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent" />
            </div>
            <Separator orientation="vertical" className="hidden sm:block h-8 self-center bg-gray-200" />
            <div className="flex items-center gap-2.5 flex-1 px-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <input type="text" placeholder="Location or Remote" value={location} onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none bg-transparent" />
            </div>
            <Button className="h-11 px-6 rounded-xl bg-gray-950 hover:bg-gray-800 text-white text-sm font-medium shrink-0 transition-all">
              Search Jobs
            </Button>
          </motion.div>
 
          {/* Popular tags */}
          <motion.div variants={itemVariants} initial="hidden" animate="visible" custom={4}
            className="flex flex-wrap items-center justify-center gap-2 mt-5"
          >
            <span className="text-xs text-gray-400">Popular:</span>
            {['Remote', 'React', 'Product Manager', 'Design', 'Python', 'Marketing'].map((tag) => (
              <button key={tag} className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-3 py-1 rounded-full transition-all">
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero
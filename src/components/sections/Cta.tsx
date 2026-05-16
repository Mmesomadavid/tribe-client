import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";


const CTABanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
 
  return (
    <section ref={ref} className="py-20 bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div style={{ y }} className="relative bg-gray-950 rounded-3xl px-8 py-16 text-center overflow-hidden">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Get started free</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4 leading-tight">
                Your next opportunity<br />
                <span className="text-gray-500 font-light italic">is one click away.</span>
              </h2>
              <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
                Join 98,000+ professionals and 4,200+ companies already on Tribe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/sign-up?role=talent">
                  <Button className="h-11 px-7 rounded-xl bg-white hover:bg-gray-100 text-gray-950 text-sm font-medium transition-all">
                    I'm looking for work
                  </Button>
                </a>
                <a href="/sign-up?role=hiring_manager">
                  <Button variant="outline" className="h-11 px-7 rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white text-sm font-medium transition-all">
                    I'm hiring talent <ArrowRight size={14} className="ml-1.5 opacity-70" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner
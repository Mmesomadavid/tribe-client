import { useState } from 'react';
import { ArrowRight, SlidersHorizontal as Filter, MapPin, DollarSign, Clock, Users, BookmarkPlus } from 'lucide-react';
import { motion } from 'framer-motion'
import { Button } from '../ui/button';


const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const FEATURED_JOBS = [
  { id: 1, title: 'Senior Product Designer',  company: 'Linear',   logo: 'LN', logoColor: '#5E6AD2', location: 'Remote · Worldwide',  salary: '$120k – $160k', type: 'Full-time', tags: ['Figma', 'Design Systems', 'B2B'],    posted: '2h ago',  applicants: 34, featured: true  },
  { id: 2, title: 'Staff Software Engineer',   company: 'Vercel',   logo: 'VC', logoColor: '#000000', location: 'Remote · US',          salary: '$180k – $240k', type: 'Full-time', tags: ['Next.js', 'TypeScript', 'Infra'],  posted: '5h ago',  applicants: 87, featured: true  },
  { id: 3, title: 'Growth Marketing Lead',     company: 'Notion',   logo: 'NO', logoColor: '#000000', location: 'San Francisco, CA',    salary: '$110k – $140k', type: 'Full-time', tags: ['SEO', 'Paid Ads', 'Analytics'],    posted: '1d ago',  applicants: 52, featured: false },
  { id: 4, title: 'AI Research Engineer',      company: 'Cohere',   logo: 'CO', logoColor: '#39594D', location: 'Toronto · Hybrid',     salary: '$160k – $200k', type: 'Full-time', tags: ['PyTorch', 'LLMs', 'Python'],       posted: '3h ago',  applicants: 29, featured: true  },
  { id: 5, title: 'Head of Product',           company: 'Loom',     logo: 'LM', logoColor: '#625DF5', location: 'Remote · Americas',    salary: '$170k – $210k', type: 'Full-time', tags: ['SaaS', 'PLG', 'Roadmap'],          posted: '6h ago',  applicants: 41, featured: false },
  { id: 6, title: 'DevRel Engineer',           company: 'Supabase', logo: 'SB', logoColor: '#3ECF8E', location: 'Remote · Global',      salary: '$130k – $160k', type: 'Full-time', tags: ['PostgreSQL', 'React', 'Content'],   posted: '12h ago', applicants: 63, featured: false },
];

const CATEGORIES = [
  { label: 'All', count: FEATURED_JOBS.length },
  { label: 'Design', count: 124 },
  { label: 'Engineering', count: 512 },
  { label: 'Product', count: 73 },
  { label: 'Marketing', count: 38 },
];


// ─── Category Bar ─────────────────────────────────────────────────────────────
 
const CategoryBar = ({ active, setActive }: { active: string; setActive: (c: string) => void }) => (
  <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
        {CATEGORIES.map((cat) => (
          <button key={cat.label} onClick={() => setActive(cat.label)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all duration-150 ${
              active === cat.label ? 'bg-gray-950 text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {cat.label}
            <span className={`text-[11px] ${active === cat.label ? 'text-white/60' : 'text-gray-400'}`}>{cat.count}</span>
          </button>
        ))}
        <div className="ml-auto shrink-0 pl-4">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 transition-all">
            <Filter size={13} /> Filters
          </button>
        </div>
      </div>
    </div>
  </div>
);
 
// ─── Job Card ─────────────────────────────────────────────────────────────────
 
const JobCard = ({ job, index }: { job: typeof FEATURED_JOBS[0]; index: number }) => {
  const [saved, setSaved] = useState(false);
 
  return (
    <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={index}
      className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {job.featured && (
        <span className="absolute top-4 right-4 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}
      <div className="flex items-start gap-3 mb-4">
        <div className="h-11 w-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: job.logoColor }}>
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[15px] text-gray-900 truncate group-hover:text-gray-700 transition-colors">{job.title}</h3>
          <p className="text-[13px] text-gray-400">{job.company}</p>
        </div>
      </div>
 
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="flex items-center gap-1 text-[12px] text-gray-500"><MapPin size={11} className="text-gray-400" />{job.location}</span>
        <span className="flex items-center gap-1 text-[12px] text-gray-500"><DollarSign size={11} className="text-gray-400" />{job.salary}</span>
        <span className="flex items-center gap-1 text-[12px] text-gray-500"><Clock size={11} className="text-gray-400" />{job.posted}</span>
      </div>
 
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map((tag) => (
          <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-lg font-medium">{tag}</span>
        ))}
      </div>
 
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-gray-400" />
          <span className="text-[12px] text-gray-400">{job.applicants} applicants</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${saved ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-200'}`}>
            <BookmarkPlus size={13} />
          </button>
          <Button className="h-8 px-4 rounded-lg bg-gray-950 hover:bg-gray-800 text-white text-xs font-medium transition-all">Apply</Button>
        </div>
      </div>
    </motion.div>
  );
};
 
// ─── Jobs Section ─────────────────────────────────────────────────────────────
 
const JobsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
 
  return (
    <section>
      <CategoryBar active={activeCategory} setActive={setActiveCategory} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-2xl font-semibold text-gray-950 tracking-tight">
              Featured Openings
            </motion.h2>
            <motion.p variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="text-sm text-gray-400 mt-1">
              Hand-picked roles from top companies
            </motion.p>
          </div>
          <a href="/jobs" className="text-[13px] font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={13} />
          </a>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {FEATURED_JOBS.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
        </div>
 
        <div className="text-center mt-10">
          <Button variant="outline" className="h-11 px-8 rounded-xl border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all">
            Load more jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  Bookmark,
  MapPin,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type EmploymentType = 'Full-time' | 'Contract' | 'Freelance';

type JobCardItem = {
  id: string;
  title: string;
  description: string;
  postedAt: string;
  skills: string[];
  employmentType: EmploymentType;
  payment: {
    amount?: number;
    currency?: string;
    verified?: boolean;
  };
  location: string;
};

type JobCardsProps = {
  jobs?: JobCardItem[];
};

const demoJobs: JobCardItem[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    description:
      'Lead end-to-end design for a B2B AI workflow platform, shaping onboarding, dashboards, and polished product experiences for fast-growing teams.',
    postedAt: '2026-07-31T09:00:00.000Z',
    skills: ['Figma', 'Design Systems', 'UX Research', 'Product Thinking'],
    employmentType: 'Full-time',
    payment: { amount: 120000, currency: 'USD', verified: true },
    location: 'Remote · US / Europe',
  },
  {
    id: '2',
    title: 'Backend Engineer – Payments',
    description:
      'Own payment flows, webhook handling, and risk-aware API integrations while collaborating closely with product, finance, and security.',
    postedAt: '2026-07-30T18:00:00.000Z',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    employmentType: 'Contract',
    payment: { amount: 95, currency: 'USD', verified: false },
    location: 'Hybrid · Lagos, NG',
  },
  {
    id: '3',
    title: 'UI Motion Specialist',
    description:
      'Create motion-first interactive interfaces for a web app brand refresh, spanning landing pages, dashboards, and social campaign visuals.',
    postedAt: '2026-07-29T13:00:00.000Z',
    skills: ['Framer Motion', 'GSAP', 'CSS', 'Animation'],
    employmentType: 'Freelance',
    payment: { amount: 0, currency: 'USD', verified: false },
    location: 'Remote · Worldwide',
  },
];

const formatPostedText = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffHours = Math.max(1, Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return diffHours <= 1 ? 'Posted 1 hour ago' : `Posted ${diffHours} hours ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return diffDays === 1 ? 'Posted yesterday' : `Posted ${diffDays} days ago`;
};

const formatPayment = (job: JobCardItem) => {
  if (job.employmentType === 'Freelance') {
    return job.payment.amount === 0
      ? `0 payment ${job.payment.verified ? 'verified' : 'unverified'}`
      : `${job.payment.amount ?? 0} ${job.payment.currency ?? 'USD'} ${job.payment.verified ? 'verified' : 'unverified'}`;
  }

  const amount = job.payment.amount ?? 0;
  return `${job.employmentType} · ${job.payment.currency ?? 'USD'} ${amount.toLocaleString()}`;
};

const JobCards = ({ jobs = demoJobs }: JobCardsProps) => {
  const cardsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { autoAlpha: 0, y: 24, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <motion.article
          key={job.id}
          ref={(element) => {
            cardsRef.current[index] = element;
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.4)]"
        >
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="gap-4 px-5 pb-0 pt-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={14} className="text-gray-400" />
                    <span>{formatPostedText(job.postedAt)}</span>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-gray-950 sm:text-xl">{job.title}</CardTitle>
                    <CardDescription className="max-w-2xl text-sm text-gray-600">{job.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button type="button" variant="ghost" size="icon-sm" aria-label="Dislike job" className="rounded-full bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600">
                    <ThumbsDown size={15} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon-sm" aria-label="Like job" className="rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600">
                    <ThumbsUp size={15} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-700">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
                  <BriefcaseBusiness size={14} className="text-gray-500" />
                  <span>{formatPayment(job)}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
                  <MapPin size={14} className="text-gray-500" />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
                  <CircleDollarSign size={14} className="text-gray-500" />
                  <span>{job.payment.verified ? 'Payment verified' : 'Payment unverified'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-emerald-600" />
                  <span>High-trust match potential</span>
                </div>

                <Button type="button" variant="outline" size="sm" className="gap-1.5 rounded-full">
                  <Bookmark size={14} />
                  Bookmark
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.article>
      ))}
    </div>
  );
};

export default JobCards;

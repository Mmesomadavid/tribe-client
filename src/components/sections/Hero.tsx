import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Mail,
//   Slack,
//   Chrome,
  Zap,
  Link2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-8">
      <div className="container">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <Badge className="flex items-center gap-2 px-3 py-1">
            <Star
                size={12}
                className="fill-current"
            />
                <span>
                    5.4K Professionals · AI-Powered Career Platform
                </span>
            </Badge>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mx-auto mt-6 max-w-4xl text-center text-5xl font-semibold leading-tight tracking-tight sm:text-6xl"
        >
          Stop hunting.
          <br />
          Start landing your dream career.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-muted-foreground"
        >
          WorkTribe uses AI to match you with the right jobs, freelance
          opportunities, and companies—helping you spend less time searching
          and more time getting hired.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg">
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
          >
            Hire Talent
          </Button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 gap-4 rounded-3xl border bg-background/60 p-4 backdrop-blur md:grid-cols-4">
            {/* Profile */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-orange-100 to-orange-200 p-5">
              <div className="aspect-[4/5] rounded-xl bg-orange-300" />

              <div className="mt-4">
                <p className="font-semibold">
                  Thomas Adam
                </p>

                <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Senior Software Engineer</span>

                  <span className="flex items-center gap-1">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    4.9
                  </span>
                </div>
              </div>
            </div>

            {/* AI Matching */}
            <div className="rounded-2xl bg-muted p-5 md:col-span-2">
              <h3 className="text-lg font-semibold">
                AI Smart Matching
              </h3>

              <div className="my-6 flex items-center justify-center gap-3">
                {/* <IconDot>
                  <Slack size={16} />
                </IconDot>

                <IconDot delay={0.1}>
                  <Chrome size={16} />
                </IconDot> */}

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                >
                  <Zap size={18} />
                </motion.div>

                <IconDot delay={0.2}>
                  <Mail size={16} />
                </IconDot>

                <IconDot delay={0.3}>
                  <Link2 size={16} />
                </IconDot>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="font-medium">
                    AI Integrations
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Connect your favorite tools and let AI automate your career
                    workflow.
                  </p>
                </div>

                <div className="flex items-end justify-end gap-2">
                  <div className="h-7 w-7 rounded-full bg-background shadow" />
                  <div className="h-7 w-7 rounded-full bg-background shadow" />
                  <div className="h-7 w-7 rounded-full bg-background shadow" />
                </div>
              </div>
            </div>

            {/* Integrations */}
            <div className="rounded-2xl bg-muted p-5">
              <h3 className="font-semibold">
                Integrations
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Connect GitHub, LinkedIn, Google Drive, Slack, Notion and more.
              </p>
            </div>

            {/* Stat */}
            <div className="rounded-2xl bg-black p-6 text-white">
              <p className="text-3xl font-bold">
                4.5B+
              </p>

              <p className="mt-2 text-sm text-white/70">
                AI recommendations generated for professionals worldwide.
              </p>
            </div>

            {/* Stat */}
            <div className="rounded-2xl bg-muted p-6 md:col-span-2">
              <p className="text-3xl font-bold">
                6.5M+
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Job applications optimized using AI-powered resume matching.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const IconDot = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => (
  <motion.div
    animate={{
      y: [0, -6, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm"
  >
    {children}
  </motion.div>
);

export default Hero;
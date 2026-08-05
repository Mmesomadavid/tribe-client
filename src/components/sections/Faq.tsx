import { HelpCircle } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Reveal from "../ui/reveal";

const FAQS = [
  {
    question: "Is WorkTribe right for first-time professionals?",
    answer:
      "Absolutely. Whether you're a student, graduate, freelancer or experienced professional, WorkTribe uses AI to recommend opportunities that fit your skills and career goals. From your first internship to your next executive role, the platform grows with you.",
  },
  {
    question: "What type of jobs does WorkTribe support?",
    answer:
      "WorkTribe supports full-time, part-time, contract, freelance, internship, graduate, remote, hybrid and on-site opportunities across thousands of companies.",
  },
  {
    question: "How accurate is WorkTribe AI matching?",
    answer:
      "Our AI analyzes your skills, experience, projects and preferences to recommend opportunities with a much higher relevance than traditional keyword searches.",
  },
  {
    question: "Can I import my LinkedIn profile or resume?",
    answer:
      "Yes. You can upload your resume or connect your LinkedIn profile to automatically build and optimize your WorkTribe profile.",
  },
  {
    question: "Does WorkTribe automatically apply to jobs?",
    answer:
      "No. You remain in complete control. AI recommends opportunities and prepares your application, but nothing is submitted without your approval.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. Your data is encrypted, securely stored, and never shared without your permission.",
  },
  {
    question: "How is WorkTribe different from LinkedIn or Indeed?",
    answer:
      "Instead of simply listing jobs, WorkTribe acts as your AI Career Operating Systemâ€”matching you with opportunities, improving your resume, tracking applications, preparing you for interviews, and helping companies discover you.",
  },
];

const FAQ = () => {
  return (
    <section className="px-6 py-28 lg:px-10 xl:px-16">
      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-[380px_1fr]">
          {/* Left */}
          <Reveal>
            <Badge className="inline-flex items-center gap-2 rounded-full">
              <HelpCircle size={12} />
              FAQ
            </Badge>

            <h2 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">
              Common
              <br />
              questions
            </h2>

            <p className="mt-6 max-w-sm text-base leading-8 text-muted-foreground">
              Everything you need to know about finding work and hiring talent
              with WorkTribe. Can't find the answer you're looking for? Reach
              out to our friendly team.
            </p>

            <div className="mt-14 rounded-3xl border border-border p-8">
              <h3 className="text-lg font-semibold">
                Still have questions?
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Can't find the answer you're looking for? Please chat with our
                friendly team.
              </p>

              <Button
                variant="outline"
                className="mt-6"
              >
                Get in touch
              </Button>
            </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.15}>
            <Accordion
              defaultValue={["faq-0"]}
              className="space-y-4"
            >
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-3xl border border-border bg-background px-6"
                >
                  <AccordionTrigger className="py-6 text-lg font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 text-base leading-8 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: { name: string; avatar?: string | null };
  date: string;
  readTime: string;
  category: string;
  /** Full article body, one paragraph per entry. */
  content: string[];
};

// The big hero card: reserved for updates coming from us, the platform itself,
// or whatever is trending across the whole community right now.
export const FEATURED_POST: BlogPost = {
  id: 'featured-1',
  slug: 'discover-redesign-q3',
  title: "What's new in Discover: faster search, smarter matches",
  excerpt:
    "We rebuilt search from the ground up and shipped a matching model that learns from what you actually click on. Here's everything that changed this quarter, and why.",
  image:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
  tags: ['Feature Update', 'Search'],
  author: { name: 'Team', avatar: null },
  date: 'Jul 28, 2026',
  readTime: '4 min read',
  category: 'Platform Updates',
  content: [
    'Search has been rebuilt from the ground up this quarter. The old keyword-matching system is gone, replaced by a model trained on what people actually click, save, and follow through on, not just what they type.',
    'The biggest visible change is speed. Results now return in under 200ms for most queries, even with filters applied. Behind the scenes, that came from moving the ranking step off the request path and pre-computing candidate sets as your profile and activity change.',
    "We've also made matching two-way. Instead of only ranking results against your query, the same model now surfaces you to relevant searches from the other side, so a strong profile keeps working for you even when you are not actively searching.",
    "This is the first of several updates landing this quarter. Next up: smarter filters that learn from what you dismiss, and a rebuilt companies directory. We'll cover both here as they ship.",
  ],
};

export const POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'standout-ai-portfolio',
    title: 'How to write a standout portfolio for AI-first roles',
    excerpt:
      'Hiring managers skim in seconds. Here is how to structure your case studies so the right ten seconds land.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    tags: ['Careers'],
    author: { name: 'Azunyan U. Wu', avatar: null },
    date: 'Jul 25, 2026',
    readTime: '6 min read',
    category: 'Careers',
    content: [
      'Most portfolios lose a reviewer in the first ten seconds, not because the work is weak, but because the strongest project is buried under a table of contents. Lead with the case study you are proudest of, not the one that happened first chronologically.',
      'Structure each case study around a decision, not a timeline. What was the constraint, what were the options, and why did you choose the one you did? Hiring managers are evaluating judgment, and judgment only shows up when there was a real choice involved.',
      'Cut anything that describes what a tool does. Everyone reading your portfolio already knows what Figma or PyTorch does. Spend that space on what you decided and what changed because of it.',
      'Close every case study with an outcome, even an imperfect one. "We shipped it and usage went up" is fine. "We shipped it, it did not move the number we expected, and here is what we learned" is often more convincing.',
    ],
  },
  {
    id: '2',
    slug: 'hiring-manager-playbook',
    title: 'The hiring manager playbook for fast-moving teams',
    excerpt:
      'A repeatable process for shipping great hires without slowing your roadmap down. Templates included.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop',
    tags: ['Hiring'],
    author: { name: 'Darack Babama', avatar: null },
    date: 'Jul 22, 2026',
    readTime: '8 min read',
    category: 'Hiring',
    content: [
      'The teams that hire well under time pressure are not the ones who move fastest through each stage. They are the ones who decided, before the search started, exactly what a yes looks like.',
      'Write the scorecard before you write the job post. Three to five criteria, each with a concrete pass bar, not "strong communicator" but "can explain a technical tradeoff to a non-technical stakeholder in under two minutes."',
      'Keep the loop to three conversations for most roles: a screen, a working session, and a values conversation. Every stage beyond that adds drop-off risk without adding much new signal.',
      'Decide within 24 hours of the final conversation. Momentum is part of the offer. A great candidate who waits a week for a decision is already fielding other offers by the time you call.',
    ],
  },
  {
    id: '3',
    slug: 'freelance-pricing-tips',
    title: 'Freelance pricing tips that protect your margins',
    excerpt:
      'Stop pricing by the hour. A simple framework for quoting projects that actually reflects the value you deliver.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop',
    tags: ['Freelance'],
    author: { name: 'X_AE_A-13b', avatar: null },
    date: 'Jul 19, 2026',
    readTime: '5 min read',
    category: 'Freelance',
    content: [
      'Hourly pricing punishes you for getting faster. The better you get at your craft, the less an hourly rate pays you for the same outcome. Project pricing fixes that by tying the fee to the result, not the clock.',
      'Start every quote by naming the outcome, not the deliverable. "A landing page that converts at 3%+" gets you a very different budget conversation than "five pages of design."',
      'Price in three tiers whenever you can: a lean version, the recommended scope, and a stretch version with extras. Most clients pick the middle option, but showing the range anchors the whole negotiation higher.',
      'Always quote revisions separately from the base scope. Two rounds included, anything past that billed at your day rate. This one line protects more margin than any pricing formula.',
    ],
  },
  {
    id: '4',
    slug: 'career-paths-product-design',
    title: 'Career paths for product designers in the AI era',
    excerpt:
      'The ladder looks different now. A look at where design roles are heading and how to stay ahead of the shift.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1200&auto=format&fit=crop',
    tags: ['Careers'],
    author: { name: 'Kaori Miyazono', avatar: null },
    date: 'Jul 16, 2026',
    readTime: '7 min read',
    category: 'Careers',
    content: [
      'The traditional ladder from junior to senior to lead designer assumed that craft output was the scarce resource. As generation tools handle more of the pixel-pushing, the roles that grow in value are the ones centered on judgment: knowing what to build, not just how to build it.',
      'Three tracks are emerging within product design. Systems designers who own consistency at scale. Product strategists who sit closer to roadmap decisions than pure execution. And AI-interaction specialists who design for probabilistic, generative interfaces rather than deterministic ones.',
      'None of these tracks require abandoning craft. If anything, taste becomes more valuable, not less, when the cost of producing options drops. The designers who thrive will be the ones who can look at ten AI-generated directions and immediately know which one is right.',
    ],
  },
  {
    id: '5',
    slug: 'toins-explained',
    title: 'Toins, explained: earning and spending on the platform',
    excerpt:
      'A plain-language walkthrough of how Toins work, where you earn them, and what they unlock.',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1200&auto=format&fit=crop',
    tags: ['Platform Updates'],
    author: { name: 'Team', avatar: null },
    date: 'Jul 12, 2026',
    readTime: '3 min read',
    category: 'Platform Updates',
    content: [
      'Toins are the platform currency you earn through activity: completing your profile, getting a project marked as delivered, receiving a strong review, or contributing in Communities.',
      'You can spend Toins on visibility features, like boosting a proposal to the top of a job queue or unlocking early access to new postings before they go public.',
      'Toins do not expire, and they cannot be purchased directly. The entire system is built around rewarding activity on the platform rather than spend, so the balance reflects what you have actually done here.',
    ],
  },
  {
    id: '6',
    slug: 'ai-insights-hiring-signals',
    title: 'What our AI is learning about strong hiring signals',
    excerpt:
      'A behind-the-scenes look at the patterns our matching model has picked up from thousands of successful hires.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI Insights'],
    author: { name: 'Team', avatar: null },
    date: 'Jul 8, 2026',
    readTime: '5 min read',
    category: 'AI Insights',
    content: [
      'When we started analyzing which matches turned into long, successful working relationships, the strongest predictor was not skill overlap. It was response pattern: how quickly and specifically both sides answered the first few messages.',
      'Profiles with detailed, concrete case studies matched into repeat engagements at a noticeably higher rate than profiles listing skills alone. Specificity appears to work as a trust signal on both sides of the match.',
      'We are feeding these patterns back into ranking, gradually, and testing each change against actual outcomes rather than click-through rate alone. More on this as the next iteration ships.',
    ],
  },
];

/** Every post, featured included, useful for lookups by slug. */
export const getAllPosts = (): BlogPost[] => [FEATURED_POST, ...POSTS];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  getAllPosts().find((post) => post.slug === slug);

export const getRelatedPosts = (post: BlogPost, limit = 3): BlogPost[] => {
  const pool = getAllPosts().filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = pool.filter((candidate) => candidate.category === post.category);
  const rest = pool.filter((candidate) => candidate.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
};
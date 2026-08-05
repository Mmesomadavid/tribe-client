import Logo from "../Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      "Find Talent",
      "Find Work",
      "AI Matching",
      "Enterprise",
      "Pricing",
      "Changelog",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "Blog",
      "API Reference",
      "Community",
      "Status",
      "Signal Methodology",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Press Kit",
      "Security",
      "Terms of Service",
      "Privacy Policy",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-6 rounded-[32px] bg-white text-black">
      <div className="container mx-auto px-10 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="inline-flex items-center"
            >
              <Logo />
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              The AI that finds the right work, right clients, and right pay
              for every professional.
            </p>
          </div>

          {/* Footer Columns */}
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-black"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 worktribe. All rights reserved. Built by New Studio.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
const LOGOS = [
  "Apple",
  "HubSpot",
  "OpenAI",
  "Crisp",
  "Rareburg",
  "InDrive",
  "Walmart",
];

const TrustedBy = () => {
  const loop = [...LOGOS, ...LOGOS];
  return (
    <section className="border-y border-line bg-paper py-10">
      <div className="container">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-wide text-muted">
          Trusted by 800,000 clients
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-xl font-semibold text-ink/30"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
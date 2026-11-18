
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Users,
  CalendarDays,
  BookOpen,
  MoveUpRight,
} from "lucide-react";

// ============================================
// MBCGEA HOMEPAGE IMAGE CONFIGURATION
// Replace these URLs with local photos later.
// ============================================

const images = {
  hero: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85",
  about: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1100&q=85",
  workplace: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85",
  leadership: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85",
  collaboration: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85",
};

// ============================================
// HOMEPAGE CONTENT
// Draft content for demonstration
// ============================================

const focusAreas = [
  {
    number: "01",
    title: "Workplace Gender Equality",
    description:
      "Supporting businesses to create fair, respectful, and inclusive workplaces where everyone has the opportunity to thrive.",
    image: images.workplace,
  },
  {
    number: "02",
    title: "Women's Leadership",
    description:
      "Promoting equal opportunities and encouraging women's participation and leadership in business.",
    image: images.leadership,
  },
  {
    number: "03",
    title: "Business Collaboration",
    description:
      "Bringing organizations together to exchange knowledge, share good practices, and advance workplace equality.",
    image: images.collaboration,
  },
];

const updates = [
  {
    type: "News & Insights",
    title: "Advancing Gender Equality in the Workplace",
    description:
      "Explore conversations and approaches that support more inclusive business environments.",
    image: images.leadership,
    link: "/news",
  },
  {
    type: "Events & Activities",
    title: "Connecting Business Leaders for Change",
    description:
      "Discover opportunities for learning, discussion, and collaboration.",
    image: images.collaboration,
    link: "/events",
  },
  {
    type: "Knowledge & Resources",
    title: "Resources for More Inclusive Workplaces",
    description:
      "Access information and practical knowledge to support organizational progress.",
    image: images.workplace,
    link: "/resources",
  },
];

const sampleMembers = [
  "MEMBER LOGO",
  "PARTNER LOGO",
  "MEMBER LOGO",
  "PARTNER LOGO",
  "MEMBER LOGO",
  "PARTNER LOGO",
];

// ============================================
// REUSABLE ANIMATION
// ============================================

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <div
        className={`mb-5 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-[3px] w-9 bg-primary" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </span>
      </div>

      <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-heading md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-base leading-8 text-body md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================

export default function Home() {
  return (
    <div className="overflow-hidden bg-background">

      {/* =====================================
          1. FULL-WIDTH PHOTOGRAPHIC HERO
      ====================================== */}

      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-secondary-dark lg:min-h-[780px]">

        <motion.img
          src={images.hero}
          alt="Professionals collaborating in a workplace"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
          fetchPriority="high"
        />

        {/* Image overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d092f]/95 via-[#27113c]/80 to-[#241130]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[760px]"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white sm:text-sm">
                Myanmar Business Coalition for Gender Equality
              </span>
            </div>

            <h1 className="text-[42px] font-bold leading-[1.12] tracking-tight !text-white sm:text-6xl lg:text-[76px]">
              Empowering People.
              <br />
              <span className="text-primary">
                Transforming
              </span>{" "}
              Workplaces.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/85 md:text-xl md:leading-9">
              Working with businesses to advance gender equality,
              strengthen inclusive leadership, and create
              opportunities for everyone.
            </p>

            <div className="mt-11 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-primary-dark"
              >
                Discover MBCGEA
                <ArrowUpRight size={19} />
              </Link>

              <Link
                to="/membership"
                className="inline-flex items-center gap-3 rounded-button border border-white/60 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-secondary"
              >
                Become a Member
                <ArrowRight size={19} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 z-10 h-2 w-full bg-gradient-to-r from-primary via-primary to-secondary" />

        <div className="absolute bottom-10 right-10 z-10 hidden items-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/80 lg:flex">
          <span>Explore Our Work</span>
          <div className="h-[1px] w-12 bg-white/60" />
        </div>
      </section>

      {/* =====================================
          2. ABOUT MBCGEA
      ====================================== */}

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">

          <Reveal>
            <div className="relative pb-8 pr-8">
              <img
                src={images.about}
                alt="Business professionals participating in a discussion"
                loading="lazy"
                className="h-[380px] w-full rounded-2xl object-cover shadow-card md:h-[530px]"
              />

              <div className="absolute bottom-0 right-0 flex max-w-[240px] items-center gap-4 rounded-xl bg-secondary p-6 text-white shadow-xl sm:max-w-[290px] sm:p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Users size={24} />
                </div>

                <p className="text-base font-bold leading-snug !text-white sm:text-lg">
                  Together for a More Inclusive Future
                </p>
              </div>

              <div className="absolute -left-5 -top-5 -z-10 h-40 w-40 rounded-2xl bg-primary-light" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Who We Are"
              title="Championing Gender Equality in Business"
              description="The Myanmar Business Coalition for Gender Equality (MBCGEA) brings businesses together around a shared commitment to advancing workplace gender equality."
            />

            <p className="mt-6 text-base leading-8 text-body">
              Through collaboration, learning, and engagement,
              we aim to support organizations in creating
              more equitable and inclusive workplaces.
            </p>

            <div className="mt-9 border-l-4 border-primary bg-surface px-6 py-5">
              <p className="text-lg font-semibold leading-8 text-heading">
                Promoting opportunity, strengthening leadership,
                and supporting meaningful workplace change.
              </p>
            </div>

            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-secondary-dark"
            >
              More About MBCGEA
              <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          3. OUR FOCUS AREAS
      ====================================== */}

      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Working Together for Meaningful Change"
              description="Our work focuses on areas that can support more inclusive, equitable, and sustainable workplaces."
              centered
            />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Reveal key={area.number} delay={index * 0.1}>
                <Link
                  to="/our-work"
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                    <span className="absolute bottom-5 left-6 text-5xl font-bold text-white/85">
                      {area.number}
                    </span>
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-bold text-heading md:text-2xl">
                      {area.title}
                    </h3>

                    <p className="mt-4 leading-7 text-body">
                      {area.description}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-all group-hover:gap-4 group-hover:text-primary">
                      Learn More
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          4. MEMBERS & PARTNERS
      ====================================== */}

      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>
            <SectionHeading
              eyebrow="Our Network"
              title="Stronger Together"
              description="Recognizing the role of business collaboration and partnerships in building a more gender-equal future."
              centered
            />
          </Reveal>

          <div
            className="relative mt-14 overflow-hidden"
            aria-label="Sample member logo placeholders"
          >
            <div className="mbcgea-logo-track flex w-max gap-5">
              {[...sampleMembers, ...sampleMembers].map(
                (member, index) => (
                  <div
                    key={index}
                    aria-hidden={index >= sampleMembers.length}
                    className="flex h-28 w-52 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-7 shadow-sm"
                  >
                    <span className="text-center text-sm font-bold tracking-wider text-muted">
                      {member}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 font-bold text-secondary transition hover:text-primary"
            >
              Discover Our Membership
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================
          5. LATEST NEWS & UPDATES
      ====================================== */}

      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="News & Insights"
                title="Stay Informed. Stay Connected."
                description="Explore developments, events, and resources related to gender equality in business."
              />

              <Link
                to="/news"
                className="inline-flex shrink-0 items-center gap-2 font-bold text-secondary hover:text-primary"
              >
                View All Updates
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {updates.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <Link
                  to={item.link}
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <span className="absolute bottom-5 left-5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-white">
                      {item.type}
                    </span>
                  </div>

                  <div className="p-7">
                    <h3 className="text-xl font-bold leading-snug text-heading transition-colors group-hover:text-secondary">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-7 text-body">
                      {item.description}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                      Read More
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          6. MEMBERSHIP CALL TO ACTION
      ====================================== */}

      <section className="relative overflow-hidden bg-secondary py-24 md:py-28">
        <div className="pointer-events-none absolute -right-32 -top-48 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-48 -left-32 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-light">
                  Be Part of the Change
                </span>

                <h2 className="mt-6 text-3xl font-bold leading-tight !text-white md:text-5xl">
                  Let's Build More Inclusive Workplaces Together.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                  Connect with MBCGEA to learn more about our
                  network, initiatives, and membership opportunities.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-3 rounded-button bg-primary px-8 py-5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-primary-dark"
              >
                Get in Touch
                <MoveUpRight size={20} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

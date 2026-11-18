
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Search,
  Users,
  BookOpen,
  Handshake,
  Award,
  CheckCircle2,
  Building2,
} from "lucide-react";

// ==========================================
// SAMPLE PHOTOGRAPHY
// ==========================================

const images = {
  hero:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&q=85",
  about:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1100&q=85",
};

// ==========================================
// MEMBERSHIP BENEFITS
// Draft descriptions
// ==========================================

const benefits = [
  {
    icon: BookOpen,
    title: "Learning & Development",
    description:
      "Access opportunities to learn about workplace gender equality and inclusive business practices.",
  },
  {
    icon: Handshake,
    title: "Networking",
    description:
      "Connect with businesses and professionals committed to advancing workplace equality.",
  },
  {
    icon: Users,
    title: "Advisory Support",
    description:
      "Explore guidance and services related to workplace gender equality.",
  },
  {
    icon: Award,
    title: "Recognition",
    description:
      "Share organizational commitments and progress towards more inclusive workplaces.",
  },
];

// ==========================================
// HISTORICAL MEMBERSHIP TIERS
// Pricing and detailed entitlements omitted
// until MBCGEA confirms current packages.
// ==========================================

const membershipTiers = [
  {
    name: "Observer",
    subtitle: "Explore",
    description:
      "For organizations interested in learning about workplace gender equality and connecting with the network.",
  },
  {
    name: "Initiator",
    subtitle: "Begin",
    description:
      "For organizations beginning to take practical steps towards gender equality in the workplace.",
  },
  {
    name: "Implementer",
    subtitle: "Progress",
    description:
      "For organizations working to strengthen and improve workplace equality policies and practices.",
  },
  {
    name: "Leader",
    subtitle: "Lead",
    description:
      "For organizations demonstrating leadership and commitment to workplace gender equality.",
  },
];

// ==========================================
// HISTORICAL FOUNDING ORGANIZATIONS
// Not a verified current member directory.
// ==========================================

const foundingMembers = [
  { name: "AYA Bank", category: "Banking" },
  { name: "City Mart Holding Limited", category: "Retail" },
  { name: "First Myanmar Investment", category: "Investment" },
  { name: "KBZ Bank", category: "Banking" },
  { name: "Shwe Taung", category: "Diversified Business" },
];

// ==========================================
// ANIMATION
// ==========================================

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// MAIN MEMBERSHIP PAGE
// ==========================================

export default function Membership() {
  const [search, setSearch] = useState("");

  const filteredMembers = foundingMembers.filter((member) =>
    `${member.name} ${member.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="overflow-hidden bg-background">

      {/* HERO */}
      <section className="relative flex min-h-[400px] items-center bg-secondary-dark md:min-h-[470px]">
        <img
          src={images.hero}
          alt="Business professionals collaborating"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#220c37]/95 via-[#220c37]/80 to-[#220c37]/35" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <Reveal>
            <div className="mb-7 flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight size={16} />
              <span className="text-primary-light">
                Our Members
              </span>
            </div>

            <h1 className="text-4xl font-bold !text-white md:text-6xl">
              Our Members & Membership
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Bringing businesses together to advance
              gender equality and build more inclusive
              workplaces in Myanmar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-24 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={images.about}
                alt="Professionals working together"
                loading="lazy"
                className="h-[350px] w-full object-cover md:h-[470px]"
              />
            </div>
          </Reveal>

          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Membership
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-heading md:text-5xl">
              Stronger Businesses. Shared Commitment.
            </h2>

            <p className="mt-7 text-lg leading-8 text-body">
              MBCGEA brings organizations together around
              a shared commitment to promoting gender
              equality, diversity, and inclusion in
              the workplace.
            </p>

            <p className="mt-5 leading-8 text-body">
              Membership provides opportunities for
              learning, collaboration, networking, and
              engagement with workplace equality initiatives.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-secondary px-7 py-4 text-sm font-semibold text-white hover:bg-secondary-dark"
            >
              Membership Enquiry
              <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Why Join
              </span>

              <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
                Membership Benefits
              </h2>

              <p className="mt-5 leading-8 text-body">
                Explore opportunities available through
                membership and network participation.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <Reveal key={benefit.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-xl font-bold text-heading">
                      {benefit.title}
                    </h3>

                    <p className="mt-4 leading-7 text-body">
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Membership Options
              </span>

              <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
                Membership Categories
              </h2>

              <p className="mt-5 leading-8 text-body">
                The following categories reflect MBCGEA's
                previously published membership structure.
                Current benefits and eligibility will be
                confirmed before launch.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {membershipTiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                  <div className={`h-2 ${
                    index === 3 ? "bg-primary" : "bg-secondary"
                  }`} />

                  <div className="flex flex-1 flex-col p-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {tier.subtitle}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-heading">
                      {tier.name}
                    </h3>

                    <p className="mt-5 flex-1 leading-7 text-body">
                      {tier.description}
                    </p>

                    <div className="mt-7 border-t border-border pt-6">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary"
                      >
                        Enquire Now
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDING MEMBERS */}
      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Network
            </span>

            <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
              Our Founding Organizations
            </h2>

            <p className="mt-5 max-w-3xl leading-8 text-body">
              These five businesses are identified as founding
              organizations in MBCGEA's published history.
              The current member directory will be added
              through our CMS.
            </p>
          </Reveal>

          {/* Search */}
          <div className="relative mt-10 max-w-md">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search founding organizations..."
              aria-label="Search founding organizations"
              className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-5 text-sm text-heading outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/10"
            />
          </div>

          {/* Organization cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-border bg-white p-8 shadow-card transition duration-300 hover:shadow-card-hover"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                  <Building2 size={36} strokeWidth={1.5} />
                </div>

                <span className="mt-7 inline-block text-xs font-bold uppercase tracking-wider text-primary">
                  Founding Organization
                </span>

                <h3 className="mt-3 text-xl font-bold text-heading">
                  {member.name}
                </h3>

                <p className="mt-3 text-sm text-body">
                  {member.category}
                </p>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="mt-10 rounded-xl border border-border bg-white p-10 text-center text-body">
              No organizations match your search.
            </div>
          )}

          <p className="mt-8 text-sm text-muted">
            Organization logos and the verified current
            member list will be added later.
          </p>
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="bg-secondary py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-light">
              Join the Network
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight !text-white md:text-5xl">
              Become Part of a More Inclusive Future
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Interested in learning more about
              MBCGEA membership and collaboration
              opportunities? Get in touch with our team.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Contact Us About Membership
              <ArrowRight size={19} />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
}


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Eye,
  Target,
  Scale,
  Users,
  Handshake,
  Lightbulb,
} from "lucide-react";

// Temporary sample images
const images = {
  banner:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85",
  about:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=85",
};

// Draft values — replace with approved MBCGEA content
const values = [
  {
    title: "Equality",
    description:
      "Promoting fair opportunities and respectful workplaces for everyone.",
    icon: Scale,
  },
  {
    title: "Inclusion",
    description:
      "Encouraging participation and belonging across diverse workplaces.",
    icon: Users,
  },
  {
    title: "Collaboration",
    description:
      "Working together with businesses and stakeholders to advance shared goals.",
    icon: Handshake,
  },
  {
    title: "Leadership",
    description:
      "Supporting responsible leadership and meaningful workplace change.",
    icon: Lightbulb,
  },
];

// Reusable entrance animation
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE BANNER */}
      <section className="relative flex min-h-[350px] items-center overflow-hidden bg-secondary-dark md:min-h-[430px]">
        <img
          src={images.banner}
          alt="Professionals collaborating"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#220c37]/95 via-[#220c37]/75 to-[#220c37]/30" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>

              <ChevronRight size={16} />

              <span className="text-primary-light">
                About Us
              </span>
            </div>

            <h1 className="text-4xl font-bold !text-white md:text-6xl">
              Who We Are
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Bringing businesses together to advance gender equality
              and inclusive workplaces in Myanmar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ABOUT ORGANIZATION */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">

          <Reveal>
            <div className="relative pb-8 pr-8">
              <img
                src={images.about}
                alt="Business professionals in a meeting"
                loading="lazy"
                className="h-[380px] w-full rounded-2xl object-cover shadow-card md:h-[510px]"
              />

              <div className="absolute bottom-0 right-0 max-w-[260px] rounded-xl bg-secondary p-7 shadow-xl">
                <p className="text-xl font-bold leading-snug !text-white">
                  Building Better Workplaces Together
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
              About MBCGEA
            </span>

            <h2 className="text-3xl font-bold leading-tight text-heading md:text-5xl">
              Advancing Gender Equality Through Business
            </h2>

            <p className="mt-7 text-base leading-8 text-body">
              The Myanmar Business Coalition for Gender Equality
              (MBCGEA) is a business-focused network committed to
              promoting gender equality and inclusion in workplaces
              across Myanmar.
            </p>

            <p className="mt-5 text-base leading-8 text-body">
              By encouraging collaboration, sharing knowledge,
              and supporting responsible business practices,
              MBCGEA aims to contribute to workplaces where
              people have equitable opportunities to grow,
              participate, and lead.
            </p>

            <Link
              to="/membership"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-secondary-dark"
            >
              Explore Membership
              <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* VISION AND MISSION */}
      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Purpose
            </span>

            <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
              Our Vision & Mission
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">

            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-white p-10 shadow-card md:p-12">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <Eye size={32} />
                </div>

                <h3 className="text-2xl font-bold text-heading">
                  Our Vision
                </h3>

                <p className="mt-5 text-base leading-8 text-body">
                  A future where workplaces in Myanmar provide
                  equitable opportunities and inclusive environments
                  in which everyone can thrive.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-border bg-white p-10 shadow-card md:p-12">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-light text-secondary">
                  <Target size={32} />
                </div>

                <h3 className="text-2xl font-bold text-heading">
                  Our Mission
                </h3>

                <p className="mt-5 text-base leading-8 text-body">
                  To engage and support businesses in advancing
                  workplace gender equality through collaboration,
                  knowledge sharing, and inclusive practices.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What Guides Us
            </span>

            <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
              Our Core Values
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.1}>
                  <div className="h-full rounded-2xl border border-border bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                      <Icon size={27} />
                    </div>

                    <h3 className="text-xl font-bold text-heading">
                      {value.title}
                    </h3>

                    <p className="mt-4 leading-7 text-body">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-secondary py-20 md:py-24">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold leading-tight !text-white md:text-5xl">
            Be Part of a More Inclusive Future
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Discover how businesses and organizations can
            connect with MBCGEA.
          </p>

          <Link
            to="/membership"
            className="mt-9 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Learn About Membership
            <ArrowRight size={19} />
          </Link>
        </Reveal>
      </section>

    </div>
  );
}

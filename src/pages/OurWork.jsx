
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  BookOpen,
  ClipboardCheck,
  Handshake,
  Users,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

// Temporary images — replace with MBCGEA photos later.
const images = {
  hero: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&q=85",
  training: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1100&q=85",
  advisory: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1100&q=85",
  assessment: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1100&q=85",
};

const services = [
  {
    number: "01",
    eyebrow: "Learning & Development",
    title: "Training & Workshops",
    description:
      "Interactive learning opportunities that help organizations understand workplace gender equality, diversity, equity, and inclusion.",
    examples: [
      "Inclusive leadership",
      "Unconscious bias",
      "Workplace harassment prevention",
      "Inclusive recruitment and communication",
    ],
    image: images.training,
    icon: BookOpen,
  },
  {
    number: "02",
    eyebrow: "Organizational Support",
    title: "Advisory & Consultancy",
    description:
      "Practical guidance for organizations seeking to strengthen workplace policies, promote respectful working environments, and improve inclusive practices.",
    examples: [
      "Workplace policy review",
      "Flexible working arrangements",
      "Equality and diversity guidelines",
      "Respectful workplace practices",
    ],
    image: images.advisory,
    icon: Handshake,
  },
  {
    number: "03",
    eyebrow: "Measurement & Progress",
    title: "Workplace Gender Equality Assessments",
    description:
      "Assessment and reporting approaches that help businesses understand workplace equality, identify opportunities, and support evidence-informed improvements.",
    examples: [
      "Workplace gender equality diagnostics",
      "Employee surveys",
      "Gender reporting",
      "Organizational progress assessment",
    ],
    image: images.assessment,
    icon: ClipboardCheck,
  },
];

const approaches = [
  {
    icon: Users,
    title: "Engage",
    description:
      "Bring businesses and stakeholders together around workplace equality.",
  },
  {
    icon: Lightbulb,
    title: "Build Knowledge",
    description:
      "Support learning through practical information and training.",
  },
  {
    icon: TrendingUp,
    title: "Support Progress",
    description:
      "Encourage organizations to translate knowledge into workplace improvements.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
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

export default function OurWork() {
  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE HERO */}
      <section className="relative flex min-h-[380px] items-center overflow-hidden bg-secondary-dark md:min-h-[470px]">
        <img
          src={images.hero}
          alt="Business professionals collaborating"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#220c37]/95 via-[#220c37]/75 to-[#220c37]/30" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
          <Reveal>
            <div className="mb-7 flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>

              <ChevronRight size={16} />

              <span className="text-primary-light">
                What We Do
              </span>
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Our Work
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight !text-white md:text-6xl">
              Creating More Inclusive Workplaces
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Supporting businesses through knowledge,
              practical services, and collaboration to
              advance workplace gender equality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-8">
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Approach
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-heading md:text-5xl">
                Turning Commitment Into Meaningful Action
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg leading-9 text-body">
              Workplace gender equality requires more than
              awareness. It also involves practical tools,
              organizational commitment, and continuous learning.
            </p>

            <p className="mt-5 leading-8 text-body">
              MBCGEA's work brings together learning,
              advisory support, and workplace assessments
              to help businesses identify opportunities
              for building more equitable and inclusive
              working environments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What We Offer
            </span>

            <h2 className="mt-5 max-w-3xl text-3xl font-bold text-heading md:text-5xl">
              Our Services & Focus Areas
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-body">
              Explore the services and activities that
              support organizations in advancing
              workplace gender equality.
            </p>
          </Reveal>

          <div className="mt-16 space-y-20 md:space-y-28">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  <Reveal
                    className={
                      index % 2 === 1
                        ? "lg:order-2"
                        : ""
                    }
                  >
                    <div className="group relative overflow-hidden rounded-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-[330px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[450px]"
                      />

                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/55 to-transparent" />

                      <div className="absolute bottom-6 left-7 text-6xl font-bold text-white/85">
                        {service.number}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.1}
                    className={
                      index % 2 === 1
                        ? "lg:order-1"
                        : ""
                    }
                  >
                    <div>
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                        <Icon size={27} />
                      </div>

                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {service.eyebrow}
                      </span>

                      <h3 className="mt-4 text-3xl font-bold leading-tight text-heading md:text-4xl">
                        {service.title}
                      </h3>

                      <p className="mt-6 text-base leading-8 text-body">
                        {service.description}
                      </p>

                      <div className="mt-8 space-y-3">
                        {service.examples.map((example) => (
                          <div
                            key={example}
                            className="flex items-center gap-3 text-sm font-medium text-heading md:text-base"
                          >
                            <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                            {example}
                          </div>
                        ))}
                      </div>

                      <Link
                        to="/contact"
                        className="mt-9 inline-flex items-center gap-3 rounded-button bg-secondary px-7 py-4 text-sm font-semibold text-white transition hover:bg-secondary-dark"
                      >
                        Enquire About This Service
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              How We Work
            </span>

            <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
              From Awareness to Action
            </h2>

            <p className="mt-6 text-lg leading-8 text-body">
              An approach centered on engagement,
              learning, and continuous improvement.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {approaches.map((approach, index) => {
              const Icon = approach.icon;

              return (
                <Reveal
                  key={approach.title}
                  delay={index * 0.1}
                >
                  <div className="h-full rounded-2xl border border-border bg-white p-9 shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-card-hover">
                    <span className="text-sm font-bold text-primary">
                      0{index + 1}
                    </span>

                    <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                      <Icon size={30} />
                    </div>

                    <h3 className="mt-7 text-2xl font-bold text-heading">
                      {approach.title}
                    </h3>

                    <p className="mt-4 leading-8 text-body">
                      {approach.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-secondary py-24">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            Work With Us
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight !text-white md:text-5xl">
            Start Building a More Inclusive Workplace
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Interested in workplace gender equality
            training, advisory services, or assessments?
            Connect with MBCGEA to learn more.
          </p>

          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Contact MBCGEA
            <ArrowRight size={19} />
          </Link>
        </Reveal>
      </section>

    </div>
  );
}

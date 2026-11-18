
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Send,
  Clock3,
  MessageSquare,
  CheckCircle2,
  Info,
} from "lucide-react";

// ==========================================
// CONTACT CONFIGURATION
// Add verified MBCGEA information here.
// Later, this will be managed through CMS.
// ==========================================

const contactInfo = {
  email: "",
  phone: "",
  address: "",
  officeHours: "",
};

const inquiryTypes = [
  "General Inquiry",
  "Membership",
  "Training & Workshops",
  "Advisory Services",
  "Partnerships",
  "Other",
];

const initialForm = {
  name: "",
  email: "",
  organization: "",
  inquiryType: "",
  subject: "",
  message: "",
};

// Reusable animation.
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

// Reusable contact information card.
function ContactCard({ icon: Icon, title, value, href }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-card">
      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-secondary-light text-secondary">
        <Icon size={25} />
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-bold text-heading">
          {title}
        </h3>

        {value ? (
          href ? (
            <a
              href={href}
              className="mt-2 block break-words leading-7 text-body hover:text-primary"
            >
              {value}
            </a>
          ) : (
            <p className="mt-2 whitespace-pre-line leading-7 text-body">
              {value}
            </p>
          )
        ) : (
          <p className="mt-2 text-sm text-muted">
            Details will be added soon.
          </p>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [formStatus, setFormStatus] = useState("");

  // Update the form without creating state for each field.
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormStatus("");
  }

  // Validate the form. Actual sending comes later.
  function handleSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      "name",
      "email",
      "inquiryType",
      "subject",
      "message",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !form[field].trim()
    );

    if (hasEmptyField) {
      setFormStatus("Please complete all required fields.");
      return;
    }

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setFormStatus(
      "Your form is valid. Online submission is not enabled yet. No message has been sent."
    );
  }

  const fieldsClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3.5 text-sm text-heading outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/10";

  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE BANNER */}
      <section className="relative flex min-h-[390px] items-center overflow-hidden bg-secondary-dark">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=85"
          alt="Modern professional office"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#220c37]/95 via-[#220c37]/80 to-[#220c37]/35" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <Reveal>
            <div className="mb-7 flex items-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight size={16} />
              <span className="text-primary-light">
                Contact Us
              </span>
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Get In Touch
            </span>

            <h1 className="mt-5 text-4xl font-bold !text-white md:text-6xl">
              Contact Us
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Have a question about MBCGEA, membership,
              or workplace gender equality services?
              We'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INTRODUCTION */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Connect With Us
            </span>

            <h2 className="mt-5 max-w-3xl text-3xl font-bold text-heading md:text-5xl">
              Let's Start a Conversation
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-body">
              Whether you're interested in membership,
              training opportunities, advisory services,
              or collaboration, you can reach out to
              the MBCGEA team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT INFORMATION AND FORM */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">

          {/* LEFT: CONTACT INFORMATION */}
          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Contact Information
              </span>

              <h2 className="mt-4 text-3xl font-bold text-heading">
                Reach Our Team
              </h2>

              <p className="mt-5 leading-8 text-body">
                Get in touch with MBCGEA through our
                official contact channels.
              </p>

              <div className="mt-9 space-y-4">
                <ContactCard
                  icon={Mail}
                  title="Email Address"
                  value={contactInfo.email}
                  href={
                    contactInfo.email
                      ? `mailto:${contactInfo.email}`
                      : undefined
                  }
                />

                <ContactCard
                  icon={Phone}
                  title="Phone Number"
                  value={contactInfo.phone}
                  href={
                    contactInfo.phone
                      ? `tel:${contactInfo.phone.replace(/[\s()-]/g, "")}`
                      : undefined
                  }
                />

                <ContactCard
                  icon={MapPin}
                  title="Office Address"
                  value={contactInfo.address}
                />

                <ContactCard
                  icon={Clock3}
                  title="Office Hours"
                  value={contactInfo.officeHours}
                />
              </div>

              <div className="mt-8 rounded-2xl bg-secondary p-8">
                <MessageSquare
                  size={30}
                  className="text-primary-light"
                />

                <h3 className="mt-5 text-xl font-bold !text-white">
                  Interested in Membership?
                </h3>

                <p className="mt-4 leading-7 text-white/75">
                  Explore our membership information
                  and learn how businesses can
                  connect with MBCGEA.
                </p>

                <Link
                  to="/membership"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary-light"
                >
                  Explore Membership
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: INQUIRY FORM */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-7 shadow-card md:p-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Send an Inquiry
              </span>

              <h2 className="mt-4 text-2xl font-bold text-heading md:text-3xl">
                How Can We Help You?
              </h2>

              <p className="mt-4 leading-7 text-body">
                Fill out the form below to prepare your inquiry.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-9 space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-heading"
                    >
                      Full Name <span className="text-primary">*</span>
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={fieldsClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-heading"
                    >
                      Email Address <span className="text-primary">*</span>
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={fieldsClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-organization"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Organization
                  </label>

                  <input
                    id="contact-organization"
                    name="organization"
                    type="text"
                    maxLength={160}
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Your organization (optional)"
                    className={fieldsClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Inquiry Type <span className="text-primary">*</span>
                  </label>

                  <select
                    id="contact-type"
                    name="inquiryType"
                    required
                    value={form.inquiryType}
                    onChange={handleChange}
                    className={fieldsClass}
                  >
                    <option value="">
                      Select inquiry type
                    </option>

                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Subject <span className="text-primary">*</span>
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={200}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is your inquiry about?"
                    className={fieldsClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-heading"
                  >
                    Message <span className="text-primary">*</span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    minLength={10}
                    maxLength={5000}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`${fieldsClass} resize-y`}
                  />
                </div>

                {/* Form validation feedback */}
                {formStatus && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-body"
                  >
                    <Info size={19} className="shrink-0 text-secondary" />
                    <p>{formStatus}</p>
                  </div>
                )}

                <div className="flex items-start gap-3 rounded-xl bg-primary-light p-4">
                  <Info
                    size={19}
                    className="mt-0.5 shrink-0 text-primary-dark"
                  />
                  <p className="text-sm leading-6 text-body">
                    This is a preview form. Online submissions
                    will be enabled after we connect our
                    secure backend.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-button bg-secondary px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-secondary-dark"
                >
                  Check Inquiry
                  <CheckCircle2 size={19} />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Find Us
              </span>

              <h2 className="mt-5 text-3xl font-bold text-heading md:text-5xl">
                Our Location
              </h2>
            </div>

            {/* Map will be enabled after address confirmation */}
            <div className="flex min-h-[330px] flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light text-secondary">
                <MapPin size={30} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-heading">
                MBCGEA Office Location
              </h3>

              <p className="mt-4 max-w-md leading-7 text-body">
                The office address and interactive map
                will be added once the official
                location is confirmed.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

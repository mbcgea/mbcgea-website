
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  X,
} from "lucide-react";

// ==========================================
// EVENT DATA
// Demo content. Later supplied by Supabase.
// Dates, locations and titles are illustrative.
// ==========================================

const events = [
  {
    id: 1,
    title: "Workplace Gender Equality Forum",
    category: "Forum",
    date: "2027-02-18",
    time: "9:00 AM – 4:00 PM",
    location: "Yangon, Myanmar",
    format: "In Person",
    description:
      "A discussion on building more equitable workplaces through business leadership and collaboration.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85",
  },
  {
    id: 2,
    title: "Inclusive Leadership Workshop",
    category: "Workshop",
    date: "2027-01-22",
    time: "10:00 AM – 12:00 PM",
    location: "Online",
    format: "Online",
    description:
      "An interactive learning session exploring inclusive leadership and equal opportunities.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=85",
  },
  {
    id: 3,
    title: "Business Networking and Knowledge Sharing",
    category: "Networking",
    date: "2026-12-15",
    time: "2:00 PM – 5:00 PM",
    location: "Yangon, Myanmar",
    format: "In Person",
    description:
      "An opportunity for business professionals to exchange ideas and explore collaboration.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85",
  },
  {
    id: 4,
    title: "Gender Equality in Business Webinar",
    category: "Webinar",
    date: "2026-09-18",
    time: "10:00 AM – 11:30 AM",
    location: "Online",
    format: "Online",
    description:
      "A sample learning session on practical approaches to gender equality in business.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=85",
  },
  {
    id: 5,
    title: "Workplace Inclusion Workshop",
    category: "Workshop",
    date: "2026-08-21",
    time: "9:00 AM – 12:00 PM",
    location: "Yangon, Myanmar",
    format: "In Person",
    description:
      "Exploring workplace inclusion, employee participation and respectful communication.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
  },
  {
    id: 6,
    title: "Women in Leadership Discussion",
    category: "Forum",
    date: "2026-07-15",
    time: "1:00 PM – 3:00 PM",
    location: "Online",
    format: "Online",
    description:
      "A sample discussion highlighting the importance of women's participation in leadership.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85",
  },
  {
    id: 7,
    title: "Business Collaboration Session",
    category: "Networking",
    date: "2026-06-12",
    time: "10:00 AM – 12:00 PM",
    location: "Yangon, Myanmar",
    format: "In Person",
    description:
      "A sample networking session focused on partnerships and shared workplace equality goals.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85",
  },
];

const categories = [
  "All Events",
  "Forum",
  "Workshop",
  "Webinar",
  "Networking",
];

const EVENTS_PER_PAGE = 6;

// Use local date boundaries to separate upcoming and past events.
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );
}

function getDateParts(date) {
  const parsed = new Date(`${date}T00:00:00`);

  return {
    month: parsed.toLocaleString("en-US", { month: "short" }),
    day: parsed.getDate(),
  };
}

// Reusable entrance animation.
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

// Reusable event card for both upcoming and past events.
function EventCard({ event, isPast }) {
  const { month, day } = getDateParts(event.date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
      <div className="relative h-60 overflow-hidden bg-surface">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating event date */}
        <div className="absolute left-5 top-5 flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-white shadow-lg">
          <span className="text-xs font-bold uppercase text-primary">
            {month}
          </span>
          <span className="text-3xl font-bold text-secondary">
            {day}
          </span>
        </div>

        <span className="absolute bottom-5 left-5 rounded-md bg-secondary px-4 py-2 text-xs font-semibold text-white">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 size={15} />
            {event.time}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold leading-snug text-heading">
          {event.title}
        </h3>

        <p className="mt-4 leading-7 text-body">
          {event.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm text-muted">
          <MapPin size={17} />
          {event.location} · {event.format}
        </div>

        <div className="mt-auto border-t border-border pt-6">
          <span
            className={`text-sm font-semibold ${
              isPast ? "text-muted" : "text-secondary"
            }`}
          >
            {isPast ? "Past Event" : "Upcoming Event"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Events");
  const [tab, setTab] = useState("upcoming");
  const [page, setPage] = useState(1);

  const today = getToday();

  // Filter by event status, selected category and search.
  const filteredEvents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return events
      .filter((event) =>
        tab === "upcoming"
          ? event.date >= today
          : event.date < today
      )
      .filter((event) =>
        category === "All Events" ||
        event.category === category
      )
      .filter((event) =>
        [
          event.title,
          event.description,
          event.category,
          event.location,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      )
      .sort((a, b) =>
        tab === "upcoming"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date)
      );
  }, [tab, category, search, today]);

  // Pagination is calculated after applying the filters.
  const totalPages = Math.ceil(
    filteredEvents.length / EVENTS_PER_PAGE
  );

  const visibleEvents = filteredEvents.slice(
    (page - 1) * EVENTS_PER_PAGE,
    page * EVENTS_PER_PAGE
  );

  const resetPage = () => setPage(1);

  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE HERO */}
      <section className="relative flex min-h-[410px] items-center overflow-hidden bg-secondary-dark">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=85"
          alt="Professional conference"
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
                Events
              </span>
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Connect · Learn · Collaborate
            </span>

            <h1 className="mt-5 text-4xl font-bold !text-white md:text-6xl">
              Events & Activities
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Explore opportunities for dialogue,
              collaboration, and learning to advance
              gender equality in business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Discover Our Activities
                </span>
                <h2 className="mt-4 text-3xl font-bold text-heading md:text-5xl">
                  Explore Events
                </h2>
              </div>

              <p className="text-sm text-muted">
                {filteredEvents.length} events found
              </p>
            </div>
          </Reveal>

          {/* UPCOMING / PAST TABS */}
          <div className="mt-12 flex flex-wrap gap-3 border-b border-border">
            {[
              { value: "upcoming", label: "Upcoming Events" },
              { value: "past", label: "Past Events" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setTab(item.value);
                  resetPage();
                }}
                className={`border-b-[3px] px-5 py-4 text-sm font-semibold transition ${
                  tab === item.value
                    ? "border-primary text-secondary"
                    : "border-transparent text-muted hover:text-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* SEARCH AND CATEGORY FILTER */}
          <div className="mt-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search events..."
                aria-label="Search events"
                className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-11 text-sm text-heading outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    resetPage();
                  }}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    resetPage();
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    category === item
                      ? "bg-secondary text-white"
                      : "border border-border bg-white text-body hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* EVENT CARDS */}
          {visibleEvents.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleEvents.map((event, index) => (
                <Reveal key={event.id} delay={index * 0.05}>
                  <EventCard
                    event={event}
                    isPast={tab === "past"}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-border bg-surface px-6 py-20 text-center">
              <CalendarDays
                size={48}
                className="mx-auto text-muted"
              />

              <h3 className="mt-5 text-xl font-bold text-heading">
                No Events Found
              </h3>

              <p className="mt-3 text-body">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All Events");
                  resetPage();
                }}
                className="mt-6 font-semibold text-secondary hover:text-primary"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page === 1}
                aria-label="Previous page"
                onClick={() => setPage((p) => p - 1)}
                className="rounded-lg border border-border p-3 text-secondary disabled:opacity-40"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map((number) => (
                <button
                  key={number}
                  type="button"
                  aria-current={page === number ? "page" : undefined}
                  onClick={() => setPage(number)}
                  className={`h-11 w-11 rounded-lg text-sm font-semibold ${
                    page === number
                      ? "bg-secondary text-white"
                      : "border border-border text-secondary"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                disabled={page === totalPages}
                aria-label="Next page"
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-border p-3 text-secondary disabled:opacity-40"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-secondary py-24">
        <Reveal>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-light">
              Get Connected
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight !text-white md:text-5xl">
              Interested in Our Events?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Contact MBCGEA to learn more about
              activities and engagement opportunities.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white hover:bg-primary-dark"
            >
              Contact Us
              <ArrowRight size={19} />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

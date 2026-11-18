
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Search,
  CalendarDays,
  Newspaper,
  X,
} from "lucide-react";

// ==========================================
// SAMPLE NEWS DATA
// Later, this will come from Supabase CMS.
// ==========================================

const newsArticles = [
  {
    id: 1,
    title: "Advancing Gender Equality in Myanmar's Workplaces",
    category: "Workplace Equality",
    date: "2026-10-20",
    description:
      "Exploring approaches that can support businesses in building fairer and more inclusive working environments.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=85",
    featured: true,
  },
  {
    id: 2,
    title: "Supporting Women's Leadership in Business",
    category: "Leadership",
    date: "2026-10-15",
    description:
      "Understanding the importance of leadership opportunities and professional development for women.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85",
  },
  {
    id: 3,
    title: "Building More Inclusive Workplace Cultures",
    category: "Workplace Equality",
    date: "2026-10-10",
    description:
      "How organizations can encourage respectful, supportive, and inclusive workplace environments.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
  },
  {
    id: 4,
    title: "Connecting Businesses Through Collaboration",
    category: "Partnerships",
    date: "2026-09-25",
    description:
      "The role of business collaboration and knowledge sharing in advancing gender equality.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85",
  },
  {
    id: 5,
    title: "Learning Opportunities for Inclusive Leadership",
    category: "Leadership",
    date: "2026-09-18",
    description:
      "Exploring learning approaches that help managers and teams strengthen inclusive leadership practices.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85",
  },
  {
    id: 6,
    title: "The Importance of Workplace Equality Assessments",
    category: "Research & Insights",
    date: "2026-09-10",
    description:
      "Understanding how workplace assessments can identify strengths and opportunities for improvement.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
  },
  {
    id: 7,
    title: "Encouraging Shared Commitment to Gender Equality",
    category: "Partnerships",
    date: "2026-08-22",
    description:
      "Why shared business commitments can contribute to sustainable workplace improvements.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85",
  },
];

// Categories are generated automatically from news data.
const categories = [
  "All News",
  ...new Set(newsArticles.map((article) => article.category)),
];

const ARTICLES_PER_PAGE = 6;

// Format dates consistently for display.
function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

// Reusable entrance animation.
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Reusable news card.
function NewsCard({ article }) {
  return (
    <Link
      to={`/news/${article.id}`}
      className="group block h-full overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
    >
      <div className="relative h-60 overflow-hidden bg-surface">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute bottom-5 left-5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-white">
          {article.category}
        </span>
      </div>

      <div className="flex min-h-[260px] flex-col p-7">
        <div className="flex items-center gap-2 text-xs text-muted">
          <CalendarDays size={15} />
          {formatDate(article.date)}
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug text-heading transition-colors group-hover:text-secondary">
          {article.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-body">
          {article.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-bold text-secondary">
          Read More
          <ArrowUpRight size={17} />
        </div>
      </div>
    </Link>
  );
}

export default function News() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All News");
  const [currentPage, setCurrentPage] = useState(1);

  // Featured article is displayed separately from the news grid.
  const featuredArticle = newsArticles.find(
    (article) => article.featured
  );

  const regularArticles = newsArticles.filter(
    (article) => !article.featured
  );

  // Filter news based on selected category and search input.
  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return regularArticles
      .filter((article) => {
        const matchesCategory =
          category === "All News" ||
          article.category === category;

        const matchesSearch = [
          article.title,
          article.description,
          article.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, category]);

  // Calculate pagination after filtering.
  const totalPages = Math.ceil(
    filteredArticles.length / ARTICLES_PER_PAGE
  );

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const updateSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE BANNER */}
      <section className="relative bg-secondary-dark py-24 md:py-32">
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-7 flex items-center gap-2 text-sm text-white/75">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight size={16} />
              <span className="text-primary-light">
                Latest News
              </span>
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Resources & Updates
            </span>

            <h1 className="mt-5 text-4xl font-bold !text-white md:text-6xl">
              Latest News
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Discover updates, stories, and insights
              related to advancing gender equality
              in business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED NEWS */}
      {featuredArticle && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="mb-9 flex items-center gap-3">
                <span className="h-[3px] w-9 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Featured Story
                </span>
              </div>

              <Link
                to={`/news/${featuredArticle.id}`}
                className="group grid overflow-hidden rounded-2xl bg-surface shadow-card lg:grid-cols-2"
              >
                <div className="relative min-h-[320px] overflow-hidden lg:min-h-[470px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {featuredArticle.category}
                  </span>

                  <h2 className="mt-5 text-3xl font-bold leading-tight text-heading md:text-4xl">
                    {featuredArticle.title}
                  </h2>

                  <div className="mt-5 flex items-center gap-2 text-sm text-muted">
                    <CalendarDays size={17} />
                    {formatDate(featuredArticle.date)}
                  </div>

                  <p className="mt-6 text-base leading-8 text-body">
                    {featuredArticle.description}
                  </p>

                  <div className="mt-9 inline-flex items-center gap-3 font-bold text-secondary transition group-hover:gap-5">
                    Read Featured Story
                    <ArrowUpRight size={19} />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* NEWS LISTING */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Explore Our Updates
                </span>

                <h2 className="mt-4 text-3xl font-bold text-heading md:text-5xl">
                  News & Stories
                </h2>
              </div>

              <p className="text-sm text-muted">
                {filteredArticles.length} articles found
              </p>
            </div>
          </Reveal>

          {/* SEARCH AND CATEGORY FILTERS */}
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-sm">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search news..."
                aria-label="Search news"
                className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-11 text-sm text-heading outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
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
                  onClick={() => updateCategory(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
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

          {/* NEWS GRID */}
          {paginatedArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.05}>
                  <NewsCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white px-6 py-20 text-center">
              <Newspaper
                size={45}
                className="mx-auto text-muted"
              />

              <h3 className="mt-5 text-xl font-bold text-heading">
                No News Found
              </h3>

              <p className="mt-3 text-body">
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={() => {
                  updateSearch("");
                  updateCategory("All News");
                }}
                className="mt-6 font-semibold text-secondary hover:text-primary"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-heading disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-11 w-11 rounded-lg text-sm font-semibold ${
                    currentPage === page
                      ? "bg-secondary text-white"
                      : "border border-border bg-white text-heading hover:bg-secondary-light"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-heading disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="bg-secondary py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold !text-white md:text-4xl">
              Stay Connected with MBCGEA
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/75">
              Connect with our team to learn more
              about our activities and initiatives.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white hover:bg-primary-dark"
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

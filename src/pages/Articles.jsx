
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  X,
} from "lucide-react";

// ==========================================
// SAMPLE ARTICLE DATA
// This will be replaced by Supabase CMS data.
// All articles below are demonstration content.
// ==========================================

const articles = [
  {
    id: 1,
    title: "Why Workplace Gender Equality Matters for Business",
    category: "Workplace Equality",
    date: "2026-10-25",
    readingTime: 6,
    excerpt:
      "Explore why gender equality is an important consideration for businesses and how inclusive workplaces can benefit employees and organizations.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=85",
    featured: true,
  },
  {
    id: 2,
    title: "Building Inclusive Leadership in the Workplace",
    category: "Leadership",
    date: "2026-10-12",
    readingTime: 5,
    excerpt:
      "Discover leadership practices that encourage participation, respect, and equal opportunities across teams.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85",
  },
  {
    id: 3,
    title: "Understanding Unconscious Bias at Work",
    category: "Diversity & Inclusion",
    date: "2026-09-28",
    readingTime: 7,
    excerpt:
      "Learn how unconscious bias can influence workplace decisions and explore practical approaches to addressing it.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=85",
  },
  {
    id: 4,
    title: "Creating Fair Recruitment and Promotion Practices",
    category: "Workplace Equality",
    date: "2026-09-15",
    readingTime: 6,
    excerpt:
      "Explore how transparent recruitment and promotion processes can support equitable workplace opportunities.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85",
  },
  {
    id: 5,
    title: "Supporting Women in Leadership Roles",
    category: "Leadership",
    date: "2026-08-22",
    readingTime: 5,
    excerpt:
      "Understand the importance of mentorship, professional development, and organizational support for women leaders.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=85",
  },
  {
    id: 6,
    title: "The Role of Workplace Equality Assessments",
    category: "Research & Insights",
    date: "2026-08-10",
    readingTime: 8,
    excerpt:
      "Explore how workplace assessments and employee feedback can help organizations identify opportunities for improvement.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
  },
  {
    id: 7,
    title: "Flexible Working Arrangements and Inclusion",
    category: "Diversity & Inclusion",
    date: "2026-07-18",
    readingTime: 5,
    excerpt:
      "Consider how flexible working practices can help organizations respond to diverse employee needs.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=85",
  },
  {
    id: 8,
    title: "Building Respectful and Safe Workplaces",
    category: "Workplace Equality",
    date: "2026-07-02",
    readingTime: 7,
    excerpt:
      "Learn about organizational practices that encourage workplace respect, clear expectations, and employee wellbeing.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&q=85",
  },
];

const ARTICLES_PER_PAGE = 6;

// Generate categories automatically from article data.
const categories = [
  "All Articles",
  ...new Set(articles.map((article) => article.category)),
];

// Format stored dates for display.
function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

// Reusable scroll entrance animation.
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
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

// ==========================================
// REUSABLE ARTICLE CARD
// ==========================================

function ArticleCard({ article, onPreview }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
      <div className="relative h-60 overflow-hidden bg-surface">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <span className="absolute bottom-5 left-5 rounded-md bg-primary px-4 py-2 text-xs font-semibold text-white">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDate(article.date)}
          </span>

          <span className="inline-flex items-center gap-2">
            <Clock3 size={15} />
            {article.readingTime} min read
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold leading-snug text-heading transition-colors group-hover:text-secondary">
          {article.title}
        </h3>

        <p className="mt-4 line-clamp-3 leading-7 text-body">
          {article.excerpt}
        </p>
        <Link
          to={`/articles/${article.id}`}
          className="mt-auto inline-flex items-center gap-2 self-start pt-7 text-sm font-bold text-secondary transition-all hover:gap-4 hover:text-primary"
        >
          Read Full Article
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

// ==========================================
// MAIN ARTICLES PAGE
// ==========================================

export default function Articles() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Articles");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewArticle, setPreviewArticle] = useState(null);

  const featuredArticle = articles.find(
    (article) => article.featured
  );

  // Keep the featured article separate from the listing.
  const regularArticles = articles.filter(
    (article) => !article.featured
  );

  // Search and category filtering.
  const filteredArticles = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return regularArticles
      .filter((article) => {
        const matchesCategory =
          category === "All Articles" ||
          article.category === category;

        const matchesSearch = [
          article.title,
          article.excerpt,
          article.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, category]);

  // Pagination uses the filtered list.
  const totalPages = Math.ceil(
    filteredArticles.length / ARTICLES_PER_PAGE
  );

  const visibleArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  function changeSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function changeCategory(value) {
    setCategory(value);
    setCurrentPage(1);
  }

  return (
    <div className="overflow-hidden bg-background">

      {/* PAGE HERO */}
      <section className="relative flex min-h-[410px] items-center overflow-hidden bg-secondary-dark">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1800&q=85"
          alt="Workspace for reading and research"
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
                Articles
              </span>
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Knowledge & Insights
            </span>

            <h1 className="mt-5 text-4xl font-bold !text-white md:text-6xl">
              Articles & Insights
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Explore ideas, knowledge, and perspectives
              on gender equality, inclusive leadership,
              and better workplace practices.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featuredArticle && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <div className="mb-9 flex items-center gap-3">
                <span className="h-[3px] w-9 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Featured Article
                </span>
              </div>

              <div className="grid overflow-hidden rounded-2xl bg-surface shadow-card lg:grid-cols-2">
                <div className="relative min-h-[320px] overflow-hidden lg:min-h-[470px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {featuredArticle.category}
                  </span>

                  <h2 className="mt-5 text-3xl font-bold leading-tight text-heading md:text-4xl">
                    {featuredArticle.title}
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-5 text-sm text-muted">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={17} />
                      {formatDate(featuredArticle.date)}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={17} />
                      {featuredArticle.readingTime} min read
                    </span>
                  </div>

                  <p className="mt-6 text-base leading-8 text-body">
                    {featuredArticle.excerpt}
                  </p>

                  <button
                    type="button"
                    onClick={() => setPreviewArticle(featuredArticle)}
                    className="mt-9 inline-flex items-center gap-3 self-start font-bold text-secondary transition hover:gap-5"
                  >
                    Read Summary
                    <ArrowUpRight size={19} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ARTICLE DIRECTORY */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Explore Knowledge
                </span>

                <h2 className="mt-4 text-3xl font-bold text-heading md:text-5xl">
                  Browse Articles
                </h2>
              </div>

              <p className="text-sm text-muted">
                {filteredArticles.length} articles found
              </p>
            </div>
          </Reveal>

          {/* SEARCH AND TOPIC FILTERS */}
          <div className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => changeSearch(e.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
                className="w-full rounded-xl border border-border bg-white py-4 pl-12 pr-11 text-sm text-heading outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => changeSearch("")}
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
                  onClick={() => changeCategory(item)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${category === item
                      ? "bg-secondary text-white"
                      : "border border-border bg-white text-body hover:border-secondary hover:text-secondary"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ARTICLE GRID */}
          {visibleArticles.length > 0 ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article, index) => (
                <Reveal key={article.id} delay={index * 0.05}>
                  <ArticleCard
                    article={article}
                    onPreview={setPreviewArticle}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-border bg-white px-6 py-20 text-center">
              <BookOpen
                size={48}
                className="mx-auto text-muted"
              />

              <h3 className="mt-5 text-xl font-bold text-heading">
                No Articles Found
              </h3>

              <p className="mt-3 text-body">
                Try changing your search or topic.
              </p>

              <button
                type="button"
                onClick={() => {
                  changeSearch("");
                  changeCategory("All Articles");
                }}
                className="mt-6 font-semibold text-secondary hover:text-primary"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                aria-label="Previous page"
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                className="rounded-lg border border-border bg-white p-3 text-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={20} />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  type="button"
                  aria-current={
                    currentPage === number ? "page" : undefined
                  }
                  onClick={() => setCurrentPage(number)}
                  className={`h-11 w-11 rounded-lg text-sm font-semibold ${currentPage === number
                      ? "bg-secondary text-white"
                      : "border border-border bg-white text-secondary"
                    }`}
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                aria-label="Next page"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
                className="rounded-lg border border-border bg-white p-3 text-secondary disabled:cursor-not-allowed disabled:opacity-40"
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
              Keep Learning
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight !text-white md:text-5xl">
              Knowledge Can Help Drive Change
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Connect with MBCGEA to learn more about
              workplace gender equality and available resources.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Contact Us
              <ArrowRight size={19} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ARTICLE SUMMARY PREVIEW
          Temporary UI until full CMS article pages exist.
      */}
      {previewArticle && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setPreviewArticle(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-preview-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl md:p-9"
          >
            <div className="flex justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {previewArticle.category}
              </span>

              <button
                type="button"
                onClick={() => setPreviewArticle(null)}
                aria-label="Close article preview"
                className="rounded-lg p-2 text-secondary hover:bg-surface"
              >
                <X size={22} />
              </button>
            </div>

            <h2
              id="article-preview-title"
              className="mt-5 text-2xl font-bold text-heading"
            >
              {previewArticle.title}
            </h2>

            <p className="mt-3 text-sm text-muted">
              {formatDate(previewArticle.date)}
            </p>

            <p className="mt-6 leading-8 text-body">
              {previewArticle.excerpt}
            </p>

            <p className="mt-5 text-sm italic text-muted">
              This is a demonstration summary. Full articles will
              become available when we implement the CMS.
            </p>

            <button
              type="button"
              onClick={() => setPreviewArticle(null)}
              className="mt-8 rounded-button bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary-dark"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

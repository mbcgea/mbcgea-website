
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  ChevronRight,
  Copy,
  Check,
  Share2,
} from "lucide-react";

import {
  newsDetails,
  articleDetails,
  getContentDetail,
  sampleBodies,
} from "../data/contentDetails";

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

export default function ContentDetail({ type = "news" }) {
  const { id } = useParams();

  const [copied, setCopied] = useState(false);

  const isNews = type === "news";
  const listingPath = isNews ? "/news" : "/articles";
  const listingTitle = isNews ? "Latest News" : "Articles";

  // Look up the requested record based on its URL ID.
  const content = getContentDetail(type, id);

  const collection = isNews ? newsDetails : articleDetails;

  const relatedContent = collection
    .filter((item) => item.id !== String(id))
    .sort((a, b) => {
      const aSame = a.category === content?.category ? 1 : 0;
      const bSame = b.category === content?.category ? 1 : 0;

      return bSame - aSame || b.date.localeCompare(a.date);
    })
    .slice(0, 3);

  const bodySections = sampleBodies[`${type}/${id}`];

  // Update browser title and scroll to top when changing stories.
  useEffect(() => {
    document.title = content
      ? `${content.title} | MBCGEA`
      : "Content Not Found | MBCGEA";

    window.scrollTo({ top: 0, behavior: "instant" });

    setCopied(false);

    return () => {
      document.title = "MBCGEA";
    };
  }, [content, id]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  // Native share is used when available; otherwise copy the URL.
  async function shareContent() {
    const shareData = {
      title: content.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User may cancel the native share dialog.
      }
    } else {
      await copyLink();
    }
  }

  // Invalid or unpublished content should show a clear fallback.
  if (!content) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold text-heading">
          Content Not Found
        </h1>

        <p className="mt-5 text-body">
          The requested {isNews ? "news story" : "article"}
          could not be found.
        </p>

        <Link
          to={listingPath}
          className="mt-8 inline-flex items-center gap-2 rounded-button bg-secondary px-6 py-3 font-semibold text-white"
        >
          <ArrowLeft size={18} />
          Back to {listingTitle}
        </Link>
      </section>
    );
  }

  return (
    <div className="overflow-hidden bg-background">

      {/* =====================================
          ARTICLE HEADER
      ====================================== */}
      <section className="border-b border-border bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted"
          >
            <Link to="/" className="hover:text-primary">
              Home
            </Link>

            <ChevronRight size={15} />

            <Link
              to={listingPath}
              className="hover:text-primary"
            >
              {listingTitle}
            </Link>

            <ChevronRight size={15} />

            <span className="text-secondary">
              Detail
            </span>
          </nav>

          <Reveal>
            <span className="inline-flex rounded-md bg-primary-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-dark">
              {content.category}
            </span>

            <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-[1.15] tracking-tight text-heading md:text-5xl lg:text-[58px]">
              {content.title}
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-9 text-body md:text-xl">
              {content.excerpt}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6 border-t border-border pt-7 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{formatDate(content.date)}</span>
              </div>

              {content.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock3 size={18} />
                  <span>{content.readingTime} min read</span>
                </div>
              )}

              <div className="font-semibold text-secondary">
                MBCGEA
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================
          FEATURED IMAGE
      ====================================== */}
      <section className="mx-auto max-w-7xl px-6 pt-10 md:pt-14 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-surface">
            <img
              src={content.image}
              alt={content.title}
              className="aspect-[16/9] w-full object-cover md:aspect-[2/1]"
            />
          </div>

          <p className="mt-3 text-xs text-muted">
            Illustrative photograph — replace with an
            approved MBCGEA image before publication.
          </p>
        </Reveal>
      </section>

      {/* =====================================
          ARTICLE BODY AND SHARE SIDEBAR
      ====================================== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20 lg:px-8">

          {/* Article content */}
          <article className="min-w-0 max-w-3xl">
            <Reveal>
              <p className="text-xl leading-9 text-heading">
                {content.excerpt}
              </p>
            </Reveal>

            {bodySections ? (
              bodySections.map((section, index) => (
                <Reveal key={index}>
                  <section className="mt-12">
                    <h2 className="text-2xl font-bold leading-tight text-heading md:text-3xl">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className="mt-6 text-base leading-9 text-body md:text-[17px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                </Reveal>
              ))
            ) : (
              <Reveal>
                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-heading md:text-3xl">
                    Overview
                  </h2>

                  <p className="mt-6 text-base leading-9 text-body md:text-[17px]">
                    This is a demonstration content page.
                    The full story will be added when MBCGEA
                    approves the final article and we connect
                    the Content Management System.
                  </p>
                </section>
              </Reveal>
            )}

            {/* Highlighted quotation */}
            <Reveal>
              <blockquote className="mt-14 border-l-4 border-primary bg-surface px-7 py-8 md:px-10">
                <p className="text-xl font-semibold leading-9 text-secondary md:text-2xl">
                  “Meaningful workplace change begins with
                  commitment, collaboration, and continuous
                  improvement.”
                </p>
                <p className="mt-4 text-xs text-muted">
                  Sample editorial pull quote — not an official
                  MBCGEA statement.
                </p>
              </blockquote>
            </Reveal>

            {/* Back to listing */}
            <div className="mt-14 border-t border-border pt-8">
              <Link
                to={listingPath}
                className="inline-flex items-center gap-3 text-sm font-bold text-secondary hover:text-primary"
              >
                <ArrowLeft size={19} />
                Back to {listingTitle}
              </Link>
            </div>
          </article>

          {/* Sharing controls */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-7 shadow-card">
              <h3 className="text-lg font-bold text-heading">
                Share This {isNews ? "News" : "Article"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-body">
                Share this page with your network.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={shareContent}
                  className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-surface"
                >
                  <Share2 size={18} />
                  Share Page
                </button>

                <button
                  type="button"
                  onClick={copyLink}
                  className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-surface"
                >
                  {copied ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                  {copied ? "Link Copied" : "Copy Link"}
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.href
                      : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-surface"
                >
                  <ArrowUpRight size={18} />
                  Share on LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =====================================
          RELATED CONTENT
      ====================================== */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Keep Exploring
              </span>

              <h2 className="mt-4 text-3xl font-bold text-heading md:text-4xl">
                Related {isNews ? "News" : "Articles"}
              </h2>
            </div>

            <Link
              to={listingPath}
              className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {relatedContent.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.08}>
                <Link
                  to={`${listingPath}/${item.id}`}
                  className="group block h-full overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-7">
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">
                      {item.category}
                    </span>

                    <h3 className="mt-4 text-lg font-bold leading-snug text-heading group-hover:text-secondary">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-xs text-muted">
                      {formatDate(item.date)}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-secondary">
                      Read More
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold !text-white md:text-4xl">
            Stay Connected With MBCGEA
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/75">
            Explore more resources and opportunities
            related to workplace gender equality.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-primary px-8 py-4 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

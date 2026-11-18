
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">

        <div>
          <div className="mb-5 inline-block rounded-lg bg-white p-3">
            <img
              src="/mbcgea-logo.png"
              alt="MBCGEA"
              className="h-14 w-auto"
            />
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/75">
            Myanmar Business Coalition for Gender Equality.
            Working towards more inclusive and gender-equal workplaces.
          </p>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold !text-white">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link to="/about" className="hover:text-primary">
              About Us
            </Link>
            <Link to="/our-work" className="hover:text-primary">
              Our Work
            </Link>
            <Link to="/membership" className="hover:text-primary">
              Membership
            </Link>
            <Link to="/resources" className="hover:text-primary">
              Resources
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-lg font-semibold !text-white">
            Get Involved
          </h3>

          <p className="mb-5 text-sm leading-7 text-white/75">
            Connect with us to learn more about our work,
            membership, and initiatives.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Contact Us
            <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>

      <div className="border-t border-white/15 px-6 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} MBCGEA. All rights reserved.
      </div>
    </footer>
  );
}

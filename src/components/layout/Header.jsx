
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

// ==========================================
// MBCGEA NAVIGATION CONFIGURATION
// ==========================================

const navigation = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    children: [
      { label: "Who We Are", path: "/about" },
      { label: "Our Members", path: "/membership" },
    ],
  },
  {
    label: "What We Do",
    children: [
      { label: "Our Work", path: "/our-work" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Latest News", path: "/news" },
      { label: "Events", path: "/events" },
      { label: "Articles", path: "/articles" },
    ],
  },
];

// ==========================================
// HEADER COMPONENT
// ==========================================

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);

  const headerRef = useRef(null);
  const location = useLocation();

  // Close menus whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
  }, [location.pathname]);

  // Close desktop dropdowns when clicking outside the header.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setDesktopMenu(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setDesktopMenu(null);
        setMobileMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Check whether the current page belongs to a menu.
  const isActive = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }

    return item.children?.some(
      (child) => location.pathname === child.path
    );
  };

  const closeAllMenus = () => {
    setMobileOpen(false);
    setDesktopMenu(null);
    setMobileMenu(null);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border bg-white"
    >
      {/* ======================================
          MAIN HEADER
          Three columns: Logo | Nav | Contact
      ====================================== */}

      <div className="grid h-24 w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 lg:px-8 2xl:px-12">

        {/* LEFT: MBCGEA LOGO */}
        <Link
          to="/"
          onClick={closeAllMenus}
          className="min-w-0 justify-self-start"
        >
          <img
            src="/mbcgea-logo.png"
            alt="MBCGEA"
            className="h-12 w-auto max-w-full object-contain 2xl:h-14"
          />
        </Link>

        {/* ======================================
            CENTER: DESKTOP NAVIGATION
        ====================================== */}

        <nav
          aria-label="Main navigation"
          className="hidden h-full items-center justify-center whitespace-nowrap xl:flex"
        >
          {navigation.map((item) => {
            const active = isActive(item);

            // Direct navigation link
            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end
                  onClick={() => setDesktopMenu(null)}
                  className={`flex h-full items-center border-b-[3px] px-3 text-[15px] font-medium transition-colors 2xl:px-5 ${
                    active
                      ? "border-primary bg-secondary-light/30 text-primary"
                      : "border-transparent text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            }

            // Dropdown navigation
            const open = desktopMenu === item.label;

            return (
              <div
                key={item.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => setDesktopMenu(item.label)}
                onMouseLeave={() => setDesktopMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                  aria-controls={`desktop-menu-${item.label.replaceAll(" ", "-")}`}
                  onClick={() =>
                    setDesktopMenu(open ? null : item.label)
                  }
                  className={`flex h-full items-center gap-2 border-b-[3px] px-3 text-[15px] font-medium transition-colors 2xl:px-5 ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop dropdown menu */}
                <div
                  id={`desktop-menu-${item.label.replaceAll(" ", "-")}`}
                  className={`absolute left-0 top-full min-w-[230px] border border-border bg-white py-2 shadow-xl transition-all duration-200 ${
                    open
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0 pointer-events-none"
                  }`}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={closeAllMenus}
                      className={({ isActive }) =>
                        `block px-5 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary-light text-primary-dark"
                            : "text-heading hover:bg-secondary-light hover:text-secondary"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ======================================
            RIGHT: CONTACT US BUTTON
            Outside the navigation element
        ====================================== */}

        <Link
          to="/contact"
          onClick={closeAllMenus}
          className="hidden justify-self-end whitespace-nowrap bg-secondary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark xl:inline-flex 2xl:px-8"
        >
          Contact Us
        </Link>

        {/* MOBILE: HAMBURGER BUTTON */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mbcgea-mobile-navigation"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            setMobileMenu(null);
          }}
          className="col-start-3 justify-self-end rounded-lg p-2 text-secondary transition hover:bg-secondary-light xl:hidden"
        >
          {mobileOpen ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>

      {/* ======================================
          MOBILE NAVIGATION
      ====================================== */}

      {mobileOpen && (
        <nav
          id="mbcgea-mobile-navigation"
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-border bg-white px-6 py-5 xl:hidden"
        >
          {navigation.map((item) => {
            // Direct mobile link
            if (!item.children) {
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={closeAllMenus}
                  className={({ isActive }) =>
                    `block border-b border-border py-4 text-base font-medium ${
                      isActive
                        ? "text-primary"
                        : "text-secondary"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            }

            const expanded = mobileMenu === item.label;

            return (
              <div
                key={item.label}
                className="border-b border-border"
              >
                {/* Mobile dropdown button */}
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() =>
                    setMobileMenu(
                      expanded ? null : item.label
                    )
                  }
                  className={`flex w-full items-center justify-between py-4 text-base font-medium ${
                    isActive(item)
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  {item.label}

                  <ChevronDown
                    size={19}
                    className={`transition-transform duration-200 ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile dropdown links */}
                {expanded && (
                  <div className="pb-4 pl-4">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={closeAllMenus}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-3 text-sm transition-colors ${
                            isActive
                              ? "bg-primary-light font-semibold text-primary-dark"
                              : "text-body hover:bg-surface hover:text-secondary"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile Contact Button */}
          <Link
            to="/contact"
            onClick={closeAllMenus}
            className="mt-6 block bg-secondary px-6 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
}

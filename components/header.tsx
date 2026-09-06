"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

const links = [
  { href: "/lavori", label: "Lavori" },
  { href: "/servizi", label: "Cosa faccio" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/guide", label: "Guide" },
];

export function Header() {
  const pathname = usePathname();
  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 701px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="edo-dev, homepage"
          onClick={() => setOpen(false)}
        >
          edo<span>—</span>dev<span className="wordmark-dot">.</span>
        </Link>
        <nav aria-label="Navigazione principale" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contatti" className="header-cta">
          Parliamo del tuo locale <Arrow diagonal />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={open ? "mobile-navigation" : undefined}
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((previous) => !previous)}
        >
          <span>{open ? "Chiudi" : "Menu"}</span>
          <span className={`menu-lines ${open ? "is-open" : ""}`}>
            <i />
            <i />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Navigazione mobile"
          className="mobile-nav"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <Arrow />
            </Link>
          ))}
          <Link href="/contatti" onClick={() => setOpen(false)}>
            Parliamo del tuo locale
            <Arrow />
          </Link>
          <p>
            Siti web per ristoranti indipendenti.
            <br />
            Un progetto, un interlocutore: Edoardo.
          </p>
        </nav>
      )}
      <noscript>
        <style>{".menu-toggle{display:none!important}"}</style>
        <nav className="mobile-nav" aria-label="Navigazione mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
              <Arrow />
            </Link>
          ))}
          <Link href="/contatti">
            Parliamo del tuo locale
            <Arrow />
          </Link>
        </nav>
      </noscript>
    </header>
  );
}

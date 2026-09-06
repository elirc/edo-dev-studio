"use client";

import Link from "next/link";
import { useState } from "react";
import type { MenuCategory, Project } from "@/lib/site";
import { Arrow } from "./icons";

/** Only the changing menu and booking disclosure need client-side JavaScript. */
export function RestaurantMenu({
  categories,
  dishes,
}: {
  categories: readonly MenuCategory[];
  dishes: Project["demo"]["dishes"];
}) {
  const [category, setCategory] = useState(categories[0]);

  function onTabKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? categories.length - 1
          : (index +
              (event.key === "ArrowRight" ? 1 : -1) +
              categories.length) %
            categories.length;
    setCategory(categories[nextIndex]);
    document.getElementById(`tab-${categories[nextIndex]}`)?.focus();
  }

  return (
    <>
      <div className="menu-tabs" role="tablist" aria-label="Categorie del menu">
        {categories.map((tab, index) => (
          <button
            key={tab}
            type="button"
            id={`tab-${tab}`}
            role="tab"
            aria-selected={category === tab}
            aria-controls="menu-panel"
            tabIndex={category === tab ? 0 : -1}
            onClick={() => setCategory(tab)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        id="menu-panel"
        role="tabpanel"
        aria-labelledby={`tab-${category}`}
        tabIndex={0}
      >
        {dishes[category].map(([dish, description, price]) => (
          <article className="dish" key={dish}>
            <div>
              <h3>{dish}</h3>
              <p>{description}</p>
            </div>
            <span>€ {price}</span>
          </article>
        ))}
      </div>
      <noscript>
        <style>{".menu-tabs{display:none!important}"}</style>
        {categories.slice(1).map((tab) => (
          <section key={tab} aria-label={tab}>
            <h3>{tab}</h3>
            {dishes[tab].map(([dish, description, price]) => (
              <article className="dish" key={dish}>
                <div>
                  <h3>{dish}</h3>
                  <p>{description}</p>
                </div>
                <span>€ {price}</span>
              </article>
            ))}
          </section>
        ))}
      </noscript>
    </>
  );
}

export function DemoBooking() {
  const [booking, setBooking] = useState(false);
  return (
    <>
      <button
        type="button"
        className="button button-cream"
        onClick={() => setBooking((previous) => !previous)}
        aria-expanded={booking}
        aria-controls={booking ? "demo-booking-explainer" : undefined}
      >
        {booking ? "Chiudi i dettagli" : "Come funzionerebbe la prenotazione"}{" "}
        <Arrow diagonal />
      </button>
      {booking && (
        <div id="demo-booking-explainer" className="demo-booking-explainer">
          <h3>Dal sito alla tua sala.</h3>
          <p>
            In un sito reale, questo pulsante aprirebbe il sistema di
            prenotazione del locale: scegli giorno, orario e numero di persone,
            poi ricevi l’esito dal servizio collegato.
          </p>
          <Link href="/contatti">
            Parliamo del sistema adatto al tuo ristorante <Arrow />
          </Link>
        </div>
      )}
    </>
  );
}

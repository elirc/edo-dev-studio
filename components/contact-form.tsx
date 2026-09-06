"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/config";
import { Arrow } from "./icons";

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ContactForm() {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientSnapshot,
    serverSnapshot,
  );
  const [prepared, setPrepared] = useState(false);
  const [values, setValues] = useState({
    name: "",
    restaurant: "",
    email: "",
    website: "",
    message: "",
  });
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [clipboard, setClipboard] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");
  const previewHeading = useRef<HTMLHeadingElement>(null);
  const previewText = useRef<HTMLTextAreaElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const hasPrepared = useRef(false);
  const preparedValues = useRef<string | null>(null);
  const copyOperation = useRef(0);
  useEffect(() => {
    if (prepared) {
      previewHeading.current?.focus();
      hasPrepared.current = true;
    } else if (hasPrepared.current) nameInput.current?.focus();
  }, [prepared]);
  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.target.setCustomValidity("");
    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };
  async function copy() {
    const operation = ++copyOperation.current;
    setClipboard("copying");
    try {
      await navigator.clipboard.writeText(
        `A: ${site.email}\nOggetto: ${subject}\n\n${message}`,
      );
      if (operation === copyOperation.current) setClipboard("copied");
    } catch {
      if (operation !== copyOperation.current) return;
      previewText.current?.focus();
      previewText.current?.select();
      setClipboard("error");
    }
  }
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    for (const key of ["name", "restaurant", "email", "website", "message"]) {
      data.set(key, String(data.get(key) ?? "").trim());
    }
    for (const key of ["name", "restaurant", "message"]) {
      const value = String(data.get(key));
      const field = event.currentTarget.elements.namedItem(key) as
        HTMLInputElement | HTMLTextAreaElement;
      if (!value || (key === "message" && value.length < 10)) {
        field.setCustomValidity(
          key === "message"
            ? "Raccontami il progetto in almeno 10 caratteri, senza contare gli spazi iniziali e finali."
            : "Compila questo campo: non bastano gli spazi.",
        );
        field.reportValidity();
        return;
      }
    }
    const body = `Ciao Edoardo,\n\nsono ${data.get("name")} e mi occupo di ${data.get("restaurant")}.\n\n${data.get("message")}\n\nEmail: ${data.get("email")}${data.get("website") ? `\nSito attuale: ${data.get("website")}` : ""}\n\nA presto,\n${data.get("name")}`;
    const snapshot = JSON.stringify(Array.from(data.entries()));
    // Returning to unchanged fields must not discard edits made in the preview.
    if (snapshot !== preparedValues.current) {
      setSubject(`Parliamo di ${data.get("restaurant")}`);
      setMessage(body);
      preparedValues.current = snapshot;
    }
    copyOperation.current++;
    setClipboard("idle");
    setPrepared(true);
  }
  if (prepared)
    return (
      <div className="email-preview">
        <span className="eyebrow">Il messaggio è pronto</span>
        <h2 ref={previewHeading} tabIndex={-1}>
          Un ultimo passaggio.
        </h2>
        <p>
          Apri la tua app email e invia il messaggio a{" "}
          <strong>{site.email}</strong>. Non è ancora stato inviato.
        </p>
        <label htmlFor="email-preview">Puoi rivederlo prima di inviarlo</label>
        <textarea
          ref={previewText}
          id="email-preview"
          rows={11}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            copyOperation.current++;
            setClipboard("idle");
          }}
        />
        <a
          className="button button-dark"
          href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
        >
          Apri l’email e invia <Arrow diagonal />
        </a>
        <div className="email-fallback">
          <button
            type="button"
            className="text-link"
            onClick={copy}
            disabled={clipboard === "copying"}
          >
            {clipboard === "copied"
              ? "Messaggio copiato"
              : clipboard === "copying"
                ? "Copia in corso…"
                : "Copia il messaggio"}
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              copyOperation.current++;
              setPrepared(false);
            }}
          >
            Torna al modulo
          </button>
        </div>
        <p className="form-note" role="status">
          {clipboard === "copied"
            ? "Messaggio copiato negli appunti."
            : clipboard === "error"
              ? "La copia automatica non è disponibile. Il testo è selezionato: copialo manualmente e invialo dalla tua casella email."
              : "Se non si apre un’app, copia il messaggio nella tua casella email."}
        </p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={prepare} method="post">
      <div className="form-heading">
        <span className="micro">QUALCHE PAROLA PER INIZIARE</span>
        <h2>Raccontami del locale.</h2>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="name">
            Come ti chiami <span>*</span>
          </label>
          <input
            ref={nameInput}
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Il tuo nome"
            maxLength={100}
            value={values.name}
            onChange={updateField}
            required
          />
        </div>
        <div>
          <label htmlFor="restaurant">
            Nome del ristorante <span>*</span>
          </label>
          <input
            id="restaurant"
            name="restaurant"
            autoComplete="organization"
            placeholder="Il nome del locale"
            maxLength={150}
            value={values.restaurant}
            onChange={updateField}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="email">
            La tua email <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="nome@ristorante.it"
            maxLength={200}
            value={values.email}
            onChange={updateField}
            required
          />
        </div>
        <div>
          <label htmlFor="website">
            Sito attuale <small>(facoltativo)</small>
          </label>
          <input
            id="website"
            name="website"
            autoComplete="url"
            inputMode="url"
            placeholder="www.iltuoristorante.it"
            maxLength={300}
            value={values.website}
            onChange={updateField}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message">
          A cosa stai pensando? <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Un sito nuovo, un menu più facile da leggere, un modo migliore per prenotare…"
          minLength={10}
          maxLength={4000}
          value={values.message}
          onChange={updateField}
          required
        />
      </div>
      <p className="form-note">
        Preparo un’email con queste informazioni: la invii tu dalla tua casella.
        Nessun dato viene inviato da questo modulo.{" "}
        <Link href="/privacy">Come vengono trattati i dati</Link>.
      </p>
      <noscript>
        <p className="form-note">
          Per usare il modulo serve JavaScript. In alternativa, scrivi a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </noscript>
      <button className="button button-dark" type="submit" disabled={!hydrated}>
        {hydrated ? "Prepara il messaggio" : "Caricamento del modulo…"}{" "}
        <Arrow diagonal />
      </button>
    </form>
  );
}

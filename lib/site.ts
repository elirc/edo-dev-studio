export { site } from "./config";
export { pageMeta } from "./metadata";

export const faqs = [
  {
    question: "Quanto costa un sito per il mio ristorante?",
    answer:
      "Il prezzo dipende da contenuti, numero di lingue e sistema di prenotazione. Dopo il primo confronto ricevi una proposta con attività, costo del progetto e spese ricorrenti separati. Il preventivo è gratuito e puoi valutarlo senza impegno.",
  },
  {
    question: "Ho già un sito. Possiamo partire da quello?",
    answer:
      "Sì. Guardiamo cosa funziona, cosa manca e quali contenuti possiamo recuperare. Valutiamo insieme se conviene intervenire sul sito attuale o riprogettarlo, mantenendo il dominio e gestendo i collegamenti delle pagine esistenti.",
  },
  {
    question: "Devo cambiare il sistema di prenotazione?",
    answer:
      "Non necessariamente. Partiamo dal sistema che usi già e verifichiamo come collegarlo al sito. Abbonamenti e commissioni dipendono dal fornitore: li rendiamo chiari prima di scegliere un’integrazione.",
  },
  {
    question: "Chi aggiorna il menu e gli orari?",
    answer:
      "Lo decidiamo prima di iniziare. Puoi avere un pannello semplice per le modifiche frequenti oppure affidarle a me con un accordo di assistenza. Il modo di aggiornare il sito fa parte del progetto.",
  },
  {
    question: "Quanto tempo serve e cosa devo preparare?",
    answer:
      "La tabella di marcia dipende dal progetto e dalla disponibilità dei materiali. Servono il menu aggiornato, gli orari, i contatti e le fotografie del locale. Definiamo consegne e tempi nella proposta, prima dell’avvio.",
  },
];

/** Menu categories shown in the concept demo. Order matters: it is the tab order. */
export const menuCategories = ["Antipasti", "Primi", "Dolci"] as const;
export type MenuCategory = (typeof menuCategories)[number];

/** A dish as [name, description, price in euro]. */
export type Dish = [name: string, description: string, price: string];

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  /** Colour theme: matches the `.lino` / `.onda` and `.demo-lino` / `.demo-onda` CSS classes. */
  color: "lino" | "onda";
  image: string;
  focus: string[];
  /** Everything the fictional restaurant site (mock preview + /concept demo) needs. */
  demo: {
    wordmark: string;
    descriptor: string;
    kicker: string;
    headline: [line: string, italicLine: string];
    lead: string;
    motto: string;
    mockNote: string;
    heroImageAlt: string;
    story: { title: [line: string, italicLine: string]; body: string };
    dishes: Record<MenuCategory, Dish[]>;
  };
};

export const projects: Project[] = [
  {
    slug: "casa-lino",
    name: "Casa Lino",
    category: "Trattoria contemporanea",
    tagline: "L’ospitalità, prima del primo piatto.",
    description:
      "Toni caldi, un menu che si legge bene e la prenotazione sempre a portata di mano. Un’idea di sito per una trattoria che tiene insieme familiarità e cura.",
    color: "lino",
    image: "/images/restaurant-interior.webp",
    focus: [
      "Identità e direzione visiva",
      "Menu leggibile da telefono",
      "Percorso di prenotazione",
    ],
    demo: {
      wordmark: "casa lino",
      descriptor: "CUCINA, CASA, CONVIVIO",
      kicker: "LA PORTA È APERTA.",
      headline: ["Le cose buone.", "Fatte insieme."],
      lead: "Una cucina di stagione. Una tavola da condividere.",
      motto: "PASTA FRESCA. MANI SAPIENTI. TEMPO PER STARE.",
      mockNote: "Una cucina di stagione. Una tavola da condividere.",
      heroImageAlt:
        "Immagine generata: sala di una trattoria con tavoli apparecchiati e luce calda",
      story: {
        title: ["C’è sempre", "un posto per te."],
        body: "Ci piacciono le tavole lunghe, il pane da spezzare e i piatti che seguono le stagioni. La nostra idea di cucina comincia così: da cose buone, fatte con cura e portate in tavola senza fretta.",
      },
      dishes: {
        Antipasti: [
          [
            "Orto di stagione",
            "Verdure arrosto, crema di ceci, erbe fresche",
            "14",
          ],
          [
            "Pane, pomodoro e burrata",
            "Pane tostato, pomodori maturi e olio buono",
            "15",
          ],
          [
            "Battuta al coltello",
            "Manzo, senape in grani, capperi e pane croccante",
            "17",
          ],
        ],
        Primi: [
          ["Tagliatelle al ragù", "Pasta fresca e un ragù cotto piano", "18"],
          ["Ravioli di ricotta", "Burro, salvia e limone", "19"],
          ["Risotto dell’orto", "Le verdure che ci porta la stagione", "18"],
        ],
        Dolci: [
          ["Tiramisù della casa", "Caffè, mascarpone e cacao", "8"],
          ["Torta del giorno", "Una fetta, come a casa", "7"],
        ],
      },
    },
  },
  {
    slug: "onda",
    name: "Onda",
    category: "Cucina di mare",
    tagline: "Il mare, con una voce propria.",
    description:
      "Un impianto essenziale, fotografie ampie e informazioni chiare. Un’idea di sito per un ristorante di pesce dall’atmosfera raccolta e contemporanea.",
    color: "onda",
    image: "/images/food-detail.webp",
    focus: [
      "Direzione fotografica",
      "Menu stagionale",
      "Informazioni e contatti",
    ],
    demo: {
      wordmark: "onda",
      descriptor: "CUCINA DI MARE",
      kicker: "IL MARE, A TAVOLA.",
      headline: ["Segui", "la marea."],
      lead: "Il pescato del giorno, le stagioni, il piacere di fermarsi.",
      motto: "POCHI INGREDIENTI. UNA GRANDE STORIA.",
      mockNote: "Pesce del giorno. Stagioni vere.",
      heroImageAlt: "Immagine generata: composizione gastronomica stagionale",
      story: {
        title: ["Ogni giorno,", "un mare diverso."],
        body: "La cucina comincia da quello che il mare offre. Pochi ingredienti, cotture attente e sapori che non hanno bisogno di alzare la voce. Per chi ama fermarsi, assaggiare e lasciarsi sorprendere.",
      },
      dishes: {
        Antipasti: [
          ["Crudo del giorno", "Il pescato selezionato, agrumi e olio", "24"],
          ["Polpo, patate e limone", "Cottura lenta, erbe mediterranee", "21"],
          [
            "Alici e pane caldo",
            "Alici marinate, burro montato e finocchietto",
            "16",
          ],
        ],
        Primi: [
          [
            "Spaghetto alle vongole",
            "Vongole, prezzemolo e un filo d’olio",
            "23",
          ],
          ["Risotto al mare", "Pescato del giorno e un brodo leggero", "25"],
          ["Mezzi paccheri", "Pomodoro, ricciola e basilico", "24"],
        ],
        Dolci: [
          ["Limone, olio e sale", "Crema al limone e crumble all’olio", "9"],
          ["Sorbetto di stagione", "Frutta, acqua e poco altro", "7"],
        ],
      },
    },
  },
];

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type Guide = {
  slug: string;
  category: string;
  title: string;
  description: string;
  time: string;
  number: string;
  sections: { title: string; body: string }[];
  source?: { label: string; url: string };
};

export const guides: Guide[] = [
  {
    slug: "menu-digitale-ristorante",
    category: "Menu e mobile",
    title: "Il menu sul telefono deve farsi leggere.",
    description:
      "PDF, pagina web o QR code: cosa cambia per chi sta decidendo dove mangiare.",
    time: "4 min",
    number: "01",
    sections: [
      {
        title: "Parti da chi sta scegliendo",
        body: "Una persona arriva sul sito, spesso dal telefono, e cerca piatti, prezzi e tipo di cucina. Un menu utile lascia trovare queste informazioni senza scaricare un file pesante o ingrandire il testo con le dita. Prima di cambiare strumento, prova il menu attuale sul tuo telefono, anche con una connessione lenta.",
      },
      {
        title: "Il PDF può restare, ma non deve essere l’unica strada",
        body: "Un PDF è comodo per la stampa e per conservare la grafica del menu. Una pagina web permette invece di adattare il testo allo schermo, separare le categorie e rendere le informazioni accessibili. Puoi offrire entrambi: la pagina per consultare il menu e il PDF come download facoltativo.",
      },
      {
        title: "Poche categorie, prezzi visibili, aggiornamenti facili",
        body: "Organizza i piatti in categorie comprensibili, mostra il prezzo accanto al nome e aggiungi descrizioni brevi. Concorda chi aggiorna il menu e con quale frequenza. Se una proposta cambia spesso, meglio una sezione stagionale semplice da modificare che un menu ricco ma fermo a mesi prima.",
      },
      {
        title: "Il QR code è un collegamento, non il menu",
        body: "Fai puntare il QR code a un indirizzo del tuo dominio, così puoi cambiare il contenuto senza ristampare tutto. Verifica la leggibilità del codice e mantieni un’alternativa per chi non può o non vuole usare il telefono. Il contenuto del menu, comprese le informazioni alimentari, resta da verificare con chi gestisce il locale.",
      },
    ],
  },
  {
    slug: "prenotazioni-dirette-ristorante",
    category: "Prenotazioni",
    title: "Dalla voglia di venire al tavolo prenotato.",
    description:
      "Come scegliere un percorso di prenotazione che funzioni per i clienti e per la sala.",
    time: "4 min",
    number: "02",
    sections: [
      {
        title: "Una strada principale, facile da trovare",
        body: "Il sito dovrebbe rendere evidente come prenotare. Scegli un’azione principale, visibile nel menu di navigazione e vicino alle informazioni più cercate. Telefono, modulo e piattaforma possono convivere, purché il cliente capisca quale usare e che cosa succede dopo.",
      },
      {
        title: "Una richiesta non è una conferma",
        body: "Se il cliente invia un messaggio che devi leggere, chiamalo richiesta di prenotazione. Se un sistema verifica la disponibilità e riserva il tavolo, la conferma può essere immediata. Questa differenza va spiegata prima dell’invio, insieme ai tempi di risposta che il locale può effettivamente rispettare.",
      },
      {
        title: "Il sistema giusto è quello che la sala usa",
        body: "Prima di aggiungere uno strumento, considera come vengono gestiti turni, tavoli, gruppi e cancellazioni. Verifica che il sistema si adatti al lavoro del personale. Se hai già un servizio che funziona, spesso basta integrarlo meglio nel sito.",
      },
      {
        title: "Confronta i costi completi",
        body: "Una prenotazione che parte dal tuo sito può comunque passare da un servizio con abbonamenti o commissioni. Chiedi al fornitore il costo complessivo, compresi eventuali costi per coperto, messaggi e pagamenti. Misura gli avvii e le prenotazioni concluse solo quando il sistema rende disponibili questi dati.",
      },
    ],
  },
  {
    slug: "sito-ristorante-google",
    category: "Presenza locale",
    title: "Sito e Google: le informazioni devono tornare.",
    description:
      "Una verifica concreta di orari, menu, indirizzo e collegamenti prima di pensare al posizionamento.",
    time: "3 min",
    number: "03",
    sections: [
      {
        title: "La prima verifica è la coerenza",
        body: "Confronta il sito con il tuo Profilo dell’attività su Google. Nome, indirizzo, telefono e orari devono essere corretti e aggiornati. Controlla i giorni festivi e le chiusure straordinarie: sono dettagli che possono fare la differenza per chi sta organizzando una visita.",
      },
      {
        title: "Collega le pagine giuste",
        body: "Il collegamento al menu dovrebbe aprire il menu; quello alle prenotazioni dovrebbe aprire il percorso per prenotare. Evita di mandare ogni visita alla homepage. Prova i link dal telefono come farebbe un cliente e verifica che arrivino a pagine veloci, leggibili e aggiornate.",
      },
      {
        title: "Spiega il locale con parole riconoscibili",
        body: "Racconta la cucina, il quartiere e le caratteristiche reali del ristorante. Inserisci indicazioni per arrivare e dettagli utili, come accesso, parcheggio o servizi effettivamente disponibili. Non servono elenchi di città o ripetizioni forzate delle stesse parole.",
      },
      {
        title: "La visibilità non si può garantire",
        body: "Google spiega che i risultati locali dipendono soprattutto da pertinenza, distanza ed evidenza. Un sito curato e un profilo completo aiutano a rappresentare correttamente l’attività, ma non assicurano una posizione specifica. Controlla nel tempo ricerche, visite e azioni disponibili, senza confonderle con prenotazioni confermate.",
      },
    ],
    source: {
      label: "Come migliorare il posizionamento locale su Google",
      url: "https://support.google.com/business/answer/7091?hl=it",
    },
  },
];

export function findGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

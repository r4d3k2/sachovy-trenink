import type { DayKey, DayPlan, FeatureGroup, ThemeGroup } from "./types";

const DUOLINGO_PATH = ["Duolingo", "Chess", "pokračuj kde jsi skončil"];
const DUOLINGO_DESCRIPTION =
  "Nespěchej dál – zopakuj lekci, která ti nešla na první pokus.";

export const dayPlans: DayPlan[] = [
  {
    key: "po-pa",
    tabLabel: "Po / Pá",
    title: "Puzzly + partie + Game Review",
    note: "Daily Puzzle, 5 tematických puzzlů, partie 15+10 a Game Review s Coachem + Duolingo.",
    summary: [
      { value: "~45", label: "min celkem" },
      { value: "1+5", label: "puzzlů" },
      { value: "1", label: "partie 15+10" },
      { value: "1", label: "Game Review" },
    ],
    sections: [
      {
        app: "chesscom",
        durationLabel: "~40 min",
        tasks: [
          {
            id: "po-pa.chesscom.daily",
            title: "Daily Puzzle",
            badge: "ok",
            path: ["Puzzles", "Daily Puzzle"],
            description: "Denní jeden taktický puzzle. Nejprve mysli v hlavě, pak ťukej.",
          },
          {
            id: "po-pa.chesscom.themes",
            title: "5 tematických puzzlů",
            badge: "ok",
            path: ["Puzzles", "Themes", "Po: Fork · Pá: Mate in 2"],
            description:
              "Po = Vidlička (Fork). Pá = Mat v 2 (Mate in 2). Procvičuj jedno téma do hloubky.",
          },
          {
            id: "po-pa.chesscom.live",
            title: "1 partie 15+10 vs. živý hráč",
            badge: "ok",
            path: ["Play", "New Game", "Live", "15 | 10"],
            description:
              "Hraj proti živému hráči, ne proti botu – Game Review s Coachem pak dává smysluplnější výstup.",
          },
          {
            id: "po-pa.chesscom.review",
            title: "Game Review s Coachem",
            badge: "diamond-app",
            badgeLabel: "💎 Diamond – appka",
            path: ["Po partii", "Review Game", "Show / Best / Retry"],
            description:
              "Coach ukáže ke každému klíčovému tahu, proč byl špatný a co měl přijít místo toho. Retry = zahraj znovu tu pozici sám. Best = ukaž nejlepší tah s vysvětlením.",
            tip: "Nejcennější Diamond funkce pro začátečníka. Jeden Game Review = víc užitku než 3 lekce.",
          },
        ],
      },
      {
        app: "duolingo",
        durationLabel: "~5 min",
        tasks: [
          {
            id: "po-pa.duolingo.lekce",
            title: "1–2 lekce",
            badge: "ok",
            path: DUOLINGO_PATH,
            description: DUOLINGO_DESCRIPTION,
          },
        ],
      },
    ],
  },
  {
    key: "st",
    tabLabel: "St",
    title: "Lekce + video + Practice Openings",
    note: "Daily Puzzle, lekce Beginner, video lekce a Practice Openings + Duolingo.",
    summary: [
      { value: "~35", label: "min celkem" },
      { value: "1", label: "Daily Puzzle" },
      { value: "1", label: "lekce + video" },
      { value: "1", label: "Practice" },
    ],
    sections: [
      {
        app: "chesscom",
        durationLabel: "~30 min",
        tasks: [
          {
            id: "st.chesscom.daily",
            title: "Daily Puzzle",
            badge: "ok",
            path: ["Puzzles", "Daily Puzzle"],
            description: "Denní jeden taktický puzzle. Nejprve mysli v hlavě, pak ťukej.",
          },
          {
            id: "st.chesscom.lekce",
            title: "1 lekce Beginner",
            badge: "ok",
            path: ["Learn", "Lessons", "filtr Beginner"],
            description:
              "Pořadí: Hodnota figur → 3 principy otevření → Rošáda → Základní maty.",
          },
          {
            id: "st.chesscom.video",
            title: "1 video lekce",
            badge: "diamond-app",
            badgeLabel: "💎 Diamond – appka",
            path: ["Learn", "Videos", "Beginner"],
            description:
              "Chess Fundamentals (Levy Rozman) nebo Road to 1000 (Danny Rensch). ~10 minut.",
          },
          {
            id: "st.chesscom.practice-openings",
            title: "Practice – Openings (vs. engine)",
            badge: "diamond-web",
            badgeLabel: "💎 Diamond – pouze web",
            path: ["Safari", "chess.com/practice", "Openings"],
            description:
              "Vyber zahájení, zvol barvu, hraj tahy zahájení proti botu, který hraje správné tahy. Diamond = volba síly enginu.",
            linkUrl: "https://www.chess.com/practice/openings",
          },
        ],
      },
      {
        app: "duolingo",
        durationLabel: "~5 min",
        tasks: [
          {
            id: "st.duolingo.lekce",
            title: "1–2 lekce",
            badge: "ok",
            path: DUOLINGO_PATH,
            description: DUOLINGO_DESCRIPTION,
          },
        ],
      },
    ],
  },
  {
    key: "ut-ct",
    tabLabel: "Út / Čt",
    title: "Puzzly + Rush + Practice Drills",
    note: "Daily Puzzle, 5 tematických puzzlů, Puzzle Rush a Practice Drills + Duolingo.",
    summary: [
      { value: "~30", label: "min celkem" },
      { value: "1+5", label: "puzzlů" },
      { value: "1", label: "Puzzle Rush" },
      { value: "1", label: "Practice" },
    ],
    sections: [
      {
        app: "chesscom",
        durationLabel: "~25 min",
        tasks: [
          {
            id: "ut-ct.chesscom.daily",
            title: "Daily Puzzle",
            badge: "ok",
            path: ["Puzzles", "Daily Puzzle"],
            description: "Denní jeden taktický puzzle. Nejprve mysli v hlavě, pak ťukej.",
          },
          {
            id: "ut-ct.chesscom.themes",
            title: "5 tematických puzzlů",
            badge: "ok",
            path: ["Puzzles", "Themes", "Út: Mate in 1 · Čt: Hanging"],
            description:
              "Út = Mat v 1 (Mate in 1). Čt = Visělci (Hanging Piece). Stejné téma, různé pozice.",
          },
          {
            id: "ut-ct.chesscom.rush",
            title: "Puzzle Rush – 3 nebo 5 minut",
            badge: "diamond-app",
            badgeLabel: "💎 Diamond – appka",
            path: ["Puzzles", "Puzzle Rush", "3 nebo 5 minut"],
            description:
              "Diamond = neomezené opakování + Retry chybných pozic. Trénuje rychlost rozpoznání vzoru.",
            tip: "Klasické puzzly = hloubka. Puzzle Rush = rychlost rozpoznání vzoru. Obojí se doplňuje.",
          },
          {
            id: "ut-ct.chesscom.practice-drills",
            title: "Practice – Drills (pozice vs. engine)",
            badge: "diamond-web",
            badgeLabel: "💎 Diamond – pouze web",
            path: ["Safari", "chess.com/practice", "Drills"],
            description:
              "Tematické pozice (pawnová struktura, otevření, koncovky) – hraješ z dané pozice proti enginu. Diamond = volba síly.",
            linkUrl: "https://www.chess.com/practice/drills",
          },
        ],
      },
      {
        app: "duolingo",
        durationLabel: "~5 min",
        tasks: [
          {
            id: "ut-ct.duolingo.lekce",
            title: "1–2 lekce",
            badge: "ok",
            path: DUOLINGO_PATH,
            description: DUOLINGO_DESCRIPTION,
          },
        ],
      },
    ],
  },
  {
    key: "so-ne",
    tabLabel: "So / Ne",
    title: "Classical partie + důkladný Review + Insights",
    note: "Classical 30+0, důkladný Game Review, Insights, Practice Master Games a lekce dle problémů + Duolingo.",
    summary: [
      { value: "~80", label: "min celkem" },
      { value: "1", label: "partie 30+0" },
      { value: "1", label: "Review + Insights" },
      { value: "1", label: "Master Games" },
    ],
    sections: [
      {
        app: "chesscom",
        durationLabel: "~75 min",
        tasks: [
          {
            id: "so-ne.chesscom.daily",
            title: "Daily Puzzle",
            badge: "ok",
            path: ["Puzzles", "Daily Puzzle"],
            description: "Denní jeden taktický puzzle. Nejprve mysli v hlavě, pak ťukej.",
          },
          {
            id: "so-ne.chesscom.classical",
            title: "1 partie Classical 30+0",
            badge: "ok",
            path: ["Play", "New Game", "Live", "30 | 0"],
            description:
              "Před každým tahem: Proč soupeř zahrál? Co mi hrozí? Je král v bezpečí? Hraj vs. živý hráč, ať má smysl Review.",
          },
          {
            id: "so-ne.chesscom.review",
            title: "Game Review s Coachem – důkladný",
            badge: "diamond-app",
            badgeLabel: "💎 Diamond – appka",
            path: ["Po partii", "Review Game", "Show / Best / Retry"],
            description:
              "Projdi celou partii s Coachem – Show u každého klíčového tahu, Best u nejhorších, Retry u 2–3 nejdůležitějších pozic. Nespěchej.",
            tip: "Zapiš si 1–2 vzory, které tě překvapily – a hledej je příští týden v puzzlech.",
          },
          {
            id: "so-ne.chesscom.insights",
            title: "Insights – přehled za týden",
            badge: "diamond-app",
            badgeLabel: "💎 Diamond – appka",
            path: ["profil", "Insights"],
            description:
              "Statistiky her: kde ztrácíš ELO, jaká zahájení se ti daří, kde děláš taktické chyby. Jednou týdně stačí – víkendový přehled.",
          },
          {
            id: "so-ne.chesscom.practice-master",
            title: "Practice – Master Games",
            badge: "diamond-web",
            badgeLabel: "💎 Diamond – pouze web",
            path: ["Safari", "chess.com/practice", "Master Games"],
            description:
              "Hraj tahy slavné mistrovské partie – appka tě navádí. Učíš se vzory přímo z velmistrovských her.",
            linkUrl: "https://www.chess.com/practice",
          },
          {
            id: "so-ne.chesscom.lekce",
            title: "1 lekce dle toho, co tě v týdnu trápilo",
            badge: "ok",
            path: ["Learn", "Lessons", "vyber téma"],
            description:
              "Špatná otevření → Opening Principles. Prohraná koncovka → Basic Checkmates. Visělci → Hanging Pieces.",
          },
        ],
      },
      {
        app: "duolingo",
        durationLabel: "~5 min",
        tasks: [
          {
            id: "so-ne.duolingo.lekce",
            title: "1–2 lekce",
            badge: "ok",
            path: DUOLINGO_PATH,
            description: DUOLINGO_DESCRIPTION,
          },
        ],
      },
    ],
  },
];

export const themesIntro =
  "Rotace témat pro 5 tematických puzzlů na Chess.com (Puzzles → Themes). Stejné téma celý den, různé pozice, stejný vzor.";

export const themeGroups: ThemeGroup[] = [
  {
    heading: "Týdny 1–2 – základní rotace (prioritní)",
    rows: [
      {
        dayShort: "Po",
        title: "Vidlička – Fork",
        badge: "ok",
        path: ["Puzzles", "Themes", "Fork"],
        description:
          "Jeden tah útočí na dvě figury zároveň. Nejčastěji jezdec.",
      },
      {
        dayShort: "Út",
        title: "Mat v 1 – Mate in 1",
        badge: "ok",
        path: ["Puzzles", "Themes", "Mate in 1"],
        description:
          "Rozpoznávání matových vzorů. Musí to být konec partie, ne jen šach.",
      },
      {
        dayShort: "St",
        title: "Připnutí – Pin",
        badge: "ok",
        path: ["Puzzles", "Themes", "Pin"],
        description:
          "Figura nemůže odejít – odhalila by krále nebo hodnotnější figuru. (Mimo plán – ve středu Daily Puzzle stačí.)",
      },
      {
        dayShort: "Čt",
        title: "Visělci – Hanging Piece",
        badge: "ok",
        path: ["Puzzles", "Themes", "Hanging Piece"],
        description:
          "Figury bez ochrany. Nejčastější příčina prohry u začátečníků.",
      },
      {
        dayShort: "Pá",
        title: "Mat v 2 – Mate in 2",
        badge: "ok",
        path: ["Puzzles", "Themes", "Mate in 2"],
        description:
          "Přípravný tah + mat. Najdi tah, který soupeře donutí do jedné pozice.",
      },
    ],
  },
  {
    heading: "Týdny 3–4 – rozšíření",
    rows: [
      {
        dayShort: "Po",
        title: "Odhalený útok – Discovered Attack",
        badge: "ok",
        path: ["Puzzles", "Themes", "Discovered Attack"],
        description:
          "Figura odejde → odkryje útok jiné figury. Soupeř musí reagovat a ty bereš jinde.",
      },
      {
        dayShort: "Út",
        title: "Mat v 2 – Mate in 2",
        badge: "ok",
        path: ["Puzzles", "Themes", "Mate in 2"],
        description:
          "Krok dál od Matu v 1 – jeden přípravný tah a mat.",
      },
      {
        dayShort: "Čt",
        title: "Nabodnutí – Skewer",
        badge: "ok",
        path: ["Puzzles", "Themes", "Skewer"],
        description:
          "Opak připnutí – hodnotnější figura je vpředu, musí ustoupit a vzadu padá další.",
      },
      {
        dayShort: "Pá",
        title: "Záhrada věže – Back Rank Mate",
        badge: "ok",
        path: ["Puzzles", "Themes", "Back Rank Mate"],
        description: "Mat přes poslední řadu – král nemá únik za pěšce.",
      },
    ],
  },
  {
    heading: "Doplňky – Chess.com Diamond",
    rows: [
      {
        dayShort: "✓",
        title: "Daily Puzzle – každý den",
        badge: "ok",
        path: ["Puzzles", "Daily Puzzle"],
        description:
          "Jeden puzzle denně. Mimo rotaci témat – součást každého dne v plánu.",
      },
      {
        dayShort: "💎",
        title: "Puzzle Rush – časovaná série",
        badge: "diamond-app",
        badgeLabel: "💎 Diamond – appka",
        path: ["Puzzles", "Puzzle Rush", "3 nebo 5 minut"],
        description:
          "Diamond = neomezené opakování. Trénuje rychlost rozpoznání vzoru – Út / Čt v plánu.",
      },
    ],
  },
];

export const featureGroups: FeatureGroup[] = [
  {
    heading: "Chess.com – v appce zdarma",
    rows: [
      {
        feature: "Daily Puzzle",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Puzzles → Daily Puzzle",
      },
      {
        feature: "Tematické puzzly (Fork, Pin…)",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Puzzles → Themes",
      },
      {
        feature: "Partie online (Live 15+10, 30+0…)",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Play → New Game → Live",
      },
      {
        feature: "Lekce – Beginner kurz",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Learn → Lessons → Beginner",
        url: "https://www.chess.com/lessons/skill-level/beginner",
      },
    ],
  },
  {
    heading: "Chess.com Diamond – v appce",
    rows: [
      {
        feature: "Game Review + Coach (Show/Best/Retry)",
        availability: "diamond-app",
        availabilityLabel: "💎 Diamond – appka",
        pathOrUrl: "Po partii → Review Game",
        isDiamond: true,
      },
      {
        feature: "Puzzle Rush (neomezený)",
        availability: "diamond-app",
        availabilityLabel: "💎 Diamond – appka",
        pathOrUrl: "Puzzles → Puzzle Rush",
        isDiamond: true,
      },
      {
        feature: "Video knihovna",
        availability: "diamond-app",
        availabilityLabel: "💎 Diamond – appka",
        pathOrUrl: "Learn → Videos → Beginner",
        isDiamond: true,
      },
      {
        feature: "Insights (statistiky her)",
        availability: "diamond-app",
        availabilityLabel: "💎 Diamond – appka",
        pathOrUrl: "profil → Insights",
        isDiamond: true,
      },
    ],
  },
  {
    heading: "Chess.com Diamond – pouze web",
    rows: [
      {
        feature: "Practice – Openings vs. engine",
        availability: "diamond-web",
        availabilityLabel: "💎 Diamond – web",
        pathOrUrl: "chess.com/practice → Openings",
        url: "https://www.chess.com/practice/openings",
        isDiamond: true,
      },
      {
        feature: "Practice – Drills (pozice vs. engine)",
        availability: "diamond-web",
        availabilityLabel: "💎 Diamond – web",
        pathOrUrl: "chess.com/practice → Drills",
        url: "https://www.chess.com/practice/drills",
        isDiamond: true,
      },
      {
        feature: "Practice – Master Games",
        availability: "diamond-web",
        availabilityLabel: "💎 Diamond – web",
        pathOrUrl: "chess.com/practice → Master Games",
        url: "https://www.chess.com/practice",
        isDiamond: true,
      },
    ],
  },
  {
    heading: "Lichess – v appce",
    rows: [
      {
        feature: "Puzzle Themes (filtr)",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Puzzles → Puzzle Themes",
      },
      {
        feature: "Partie online (Rapid, Classical)",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Play → Quick Pairing",
      },
      {
        feature: "Partie vs. počítač",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Play → Play the computer → Level 3–4",
      },
      {
        feature: "Analýza partie (základní)",
        availability: "limited",
        availabilityLabel: "Omezeno",
        pathOrUrl: "Po partii → Request Analysis",
      },
    ],
  },
  {
    heading: "Lichess – pouze web",
    rows: [
      {
        feature: "Plný Stockfish engine",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org → partie → Computer Analysis",
        url: "https://lichess.org/",
      },
      {
        feature: "Opening Trainer",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org/learn#/1",
        url: "https://lichess.org/learn#/1",
      },
      {
        feature: "Studie (Studies)",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org/study",
        url: "https://lichess.org/study",
      },
      {
        feature: "Puzzle Dashboard (rating per téma)",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org/training → Themes",
        url: "https://lichess.org/training/dashboard/30/dashboard",
      },
      {
        feature: "Puzzle Storm",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org/storm",
        url: "https://lichess.org/storm",
      },
      {
        feature: "Puzzle Racer",
        availability: "web-only",
        availabilityLabel: "Pouze web",
        pathOrUrl: "lichess.org/racer",
        url: "https://lichess.org/racer",
      },
    ],
  },
  {
    heading: "Duolingo",
    rows: [
      {
        feature: "Duolingo Chess – lekce",
        availability: "ok",
        availabilityLabel: "V appce",
        pathOrUrl: "Duolingo → Chess",
      },
    ],
  },
];

export const featureNotes: string[] = [
  "Učební plán běží na Chess.com Diamond + Duolingo. Lichess sekce níže slouží jako reference alternativy zdarma.",
  "Game Review s Coachem dává nejlepší výstup z partie vs. živý hráč (ne vs. bot).",
  "Practice (Openings / Drills / Master Games) je dostupný jen na webu – v iPhone appce nelze.",
  "Insights jsou týdenní přehled – nemá smysl koukat denně, statistika se nasbírá až po více partiích.",
  "Lichess je celý zdarma, bez reklam – ale nemá Coach (Game Review), Insights ani Master Games. Některé funkce (Studies, Opening Trainer, Puzzle Storm/Racer) jsou jen na webu.",
  "Duolingo Chess je samostatná appka – krátký denní blok 1–2 lekce, ne víc.",
];

export const featureIntro =
  "Co najdeš v jednotlivých appkách a co jen na webu. Plán běží na Chess.com Diamond + Duolingo, Lichess je referenční alternativa zdarma.";

export function getDayPlan(key: DayKey): DayPlan {
  const found = dayPlans.find((p) => p.key === key);
  if (!found) throw new Error(`Unknown day plan: ${key}`);
  return found;
}

export function allTaskIdsForDay(key: DayKey): string[] {
  const plan = getDayPlan(key);
  return plan.sections.flatMap((s) => s.tasks.map((t) => t.id));
}

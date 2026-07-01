/**
 * CareerOS AI Suite — dummy data for the Public MVP.
 * Extracted verbatim from design/references/CareerOS.dc.html (state).
 * Use for Public/Demo edition and Storybook. Real editions replace with API.
 */

export type Status = "applied" | "interview" | "offer" | "rejected";
export type Priority = "high" | "medium" | "low";
export type Edition = "public" | "private" | "business";

export const STATUSES: { key: Status; en: string; es: string; color: string }[] = [
  { key: "applied",   en: "Applied",   es: "Aplicada",   color: "var(--info)" },
  { key: "interview", en: "Interview", es: "Entrevista", color: "var(--warn)" },
  { key: "offer",     en: "Offer",     es: "Oferta",     color: "var(--good)" },
  { key: "rejected",  en: "Rejected",  es: "Descartada", color: "var(--bad)" },
];

export const PRIORITY = {
  high:   { es: "Alta",  en: "High",   color: "var(--bad)" },
  medium: { es: "Media", en: "Medium", color: "var(--warn)" },
  low:    { es: "Baja",  en: "Low",    color: "var(--dim)" },
};

/** Pipeline candidacies. `color` is the brand color used to tint the avatar.
 *  This is the entity behind the Pipeline board, the Candidacies list, and the
 *  Add/Edit Candidacy form. Optional fields (cvUsed, notes) are captured in the form. */
export interface Candidate {
  id: number; company: string; role: string; status: Status; priority: Priority;
  salary: string; location: string; dateLabel: string; color: string; match: number;
  cvUsed?: string; notes?: string;
}
export const CANDIDATES: Candidate[] = [
  { id: 1,  company: "Stripe",  role: "Senior Frontend Engineer", status: "interview", priority: "high",   salary: "€95k",  location: "Remote · EU",     dateLabel: "22 Jun", color: "#635bff", match: 91 },
  { id: 2,  company: "Linear",  role: "Product Engineer",         status: "applied",   priority: "high",   salary: "€88k",  location: "Remote",          dateLabel: "24 Jun", color: "#5e6ad2", match: 84 },
  { id: 3,  company: "Figma",   role: "Design Engineer",          status: "offer",     priority: "high",   salary: "$140k", location: "Remote · US",     dateLabel: "18 Jun", color: "#f24e1e", match: 88 },
  { id: 4,  company: "Datadog", role: "Product Designer",         status: "applied",   priority: "medium", salary: "€82k",  location: "Madrid",          dateLabel: "25 Jun", color: "#7c3aed", match: 72 },
  { id: 5,  company: "Vercel",  role: "Developer Advocate",       status: "interview", priority: "medium", salary: "$120k", location: "Remote",          dateLabel: "20 Jun", color: "#3b82f6", match: 79 },
  { id: 6,  company: "Notion",  role: "Software Engineer",        status: "rejected",  priority: "low",    salary: "$130k", location: "San Francisco",   dateLabel: "10 Jun", color: "#2f6fed", match: 64 },
  { id: 7,  company: "Spotify", role: "Frontend Engineer",        status: "interview", priority: "high",   salary: "€85k",  location: "Stockholm",       dateLabel: "21 Jun", color: "#1db954", match: 81 },
  { id: 8,  company: "GitHub",  role: "Product Engineer",         status: "offer",     priority: "high",   salary: "$150k", location: "Remote",          dateLabel: "15 Jun", color: "#6e7681", match: 90 },
  { id: 9,  company: "Revolut", role: "Senior Engineer",          status: "applied",   priority: "medium", salary: "£90k",  location: "London",          dateLabel: "23 Jun", color: "#0666eb", match: 70 },
  { id: 10, company: "Airbnb",  role: "Frontend Engineer",        status: "rejected",  priority: "low",    salary: "$135k", location: "Remote",          dateLabel: "08 Jun", color: "#ff5a5f", match: 58 },
];

/** Offers = full application records (superset that includes the offer form data). */
export interface QA { q: string; a: string; }
export interface Offer {
  id: number; role: string; company: string; color: string; location: string;
  date: string; status: "active" | "closed";
  description: string; requirements: string;
  url: string; appliedDate: string; cvUsed: string;
  username: string; password: string; notes: string; qa: QA[];
}
export const OFFERS: Offer[] = [
  {
    id: 1, role: "Senior Frontend Engineer", company: "Stripe", color: "#635bff",
    location: "Remote · EU", date: "2026-06-20", status: "active",
    description: "Construye interfaces de pago de alto rendimiento usadas por millones de negocios. Trabajarás con React, TypeScript y nuestro design system interno.",
    requirements: "6+ años en frontend, dominio de React y TypeScript, experiencia con design systems y Core Web Vitals.",
    url: "https://stripe.com/jobs/listing/senior-frontend-engineer",
    appliedDate: "2026-06-22", cvUsed: "Alex_Vidal_Frontend_2026.pdf",
    username: "alex.vidal@gmail.com", password: "Str!pe2026#apply",
    notes: "Recruiter: Marta G. Proceso de 4 rondas (screening, técnica, system design, cultural). Mencionaron bonus objetivo del 12% y stock.",
    qa: [
      { q: "Expectativas salariales", a: "95.000 € brutos/año + bonus" },
      { q: "Años de experiencia con React", a: "6 años" },
      { q: "Disponibilidad / preaviso", a: "15 días" },
      { q: "¿Permiso para trabajar en la UE?", a: "Sí, ciudadanía UE" },
    ],
  },
  {
    id: 2, role: "Product Engineer", company: "Linear", color: "#5e6ad2",
    location: "Remote", date: "2026-06-24", status: "active",
    description: "Diseña y desarrolla funcionalidad de producto end-to-end con un equipo pequeño y de alto impacto.",
    requirements: "Mentalidad de producto, dominio de TypeScript, atención obsesiva al detalle y al rendimiento.",
    url: "https://linear.app/careers/product-engineer",
    appliedDate: "2026-06-24", cvUsed: "Alex_Vidal_Fullstack_2026.pdf",
    username: "", password: "",
    notes: "Aplicación directa por la web. Equipo muy pequeño, valoran ownership end-to-end.",
    qa: [
      { q: "Expectativas salariales", a: "88.000 € brutos/año" },
      { q: "Años de experiencia con TypeScript", a: "5 años" },
      { q: "¿Por qué Linear?", a: "Producto de referencia en velocidad y craft." },
    ],
  },
  // …Figma, Datadog, Vercel (closed), Spotify (closed) follow the same shape in the prototype.
];

export interface CV { id: number; name: string; size: string; date: string; isDefault: boolean; usedIn: number; }
export const CVS: CV[] = [
  { id: 1, name: "Alex_Vidal_Frontend_2026.pdf",  size: "2.4 MB", date: "2026-06-01", isDefault: true,  usedIn: 3 },
  { id: 2, name: "Alex_Vidal_Fullstack_2026.pdf", size: "2.1 MB", date: "2026-05-18", isDefault: false, usedIn: 1 },
  { id: 3, name: "Alex_Vidal_General_ES.pdf",     size: "1.9 MB", date: "2026-04-30", isDefault: false, usedIn: 0 },
];
// Max 4 CVs per user (enforced in CV Manager).

/** Dashboard reminders. */
export const REMINDERS = [
  { company: "Stripe",  color: "#635bff", titleEs: "Entrevista técnica",     titleEn: "Technical interview", whenEs: "Hoy · 16:00",   whenEn: "Today · 4:00 PM", tag: "Today", urgent: true },
  { company: "Figma",   color: "#f24e1e", titleEs: "Responder a la oferta",  titleEn: "Respond to offer",    whenEs: "Mañana · 10:00", whenEn: "Tomorrow · 10:00 AM", tag: "1d", urgent: false },
  { company: "Vercel",  color: "#3b82f6", titleEs: "Llamada con recruiter",  titleEn: "Recruiter call",      whenEs: "Jue · 12:30",   whenEn: "Thu · 12:30 PM", tag: "2d", urgent: false },
  { company: "Spotify", color: "#1db954", titleEs: "Enviar take-home",       titleEn: "Submit take-home",    whenEs: "Vie · 18:00",   whenEn: "Fri · 6:00 PM", tag: "3d", urgent: false },
];

/** AI analysis (selected candidacy). Score breakdown + skill map + evidence. */
export const ANALYSIS = {
  breakdown: [
    { labelEs: "Experiencia",     labelEn: "Experience",      val: 94, color: "var(--good)" },
    { labelEs: "Skills técnicas", labelEn: "Technical skills", val: 88, color: "var(--accent)" },
    { labelEs: "Seniority",       labelEn: "Seniority",        val: 82, color: "var(--accent-2)" },
    { labelEs: "Cultura",         labelEn: "Culture",          val: 76, color: "var(--info)" },
  ],
  // skill map: 1 = matched (accent chip), 0 = gap (dashed chip)
  skills: [
    ["React", 1], ["TypeScript", 1], ["Next.js", 1], ["Design Systems", 1],
    ["Accessibility", 1], ["Testing", 1], ["Performance", 1], ["Node.js", 1],
    ["CI/CD", 1], ["GraphQL", 0], ["Team Lead", 0], ["Kubernetes", 0],
  ] as [string, 0 | 1][],
  // evidence: CV quote ↔ offer quote, strong|partial
};

/** AI agents (Business). */
export const AGENTS = [
  { key: "analyzer",     name: "Job Analyzer",         model: "Gemini 1.5 Pro",         taskEs: "Extrae requisitos, seniority y skills de la oferta" },
  { key: "matcher",      name: "CV Matcher",           model: "Hugging Face · BGE-M3",  taskEs: "Calcula similitud semántica CV ↔ oferta (RAG)" },
  { key: "orchestrator", name: "Insight Orchestrator", model: "Ollama · Llama 3.1",     taskEs: "Sintetiza evidencias y genera la explicación final" },
];

/** Current user. */
export const USER = { name: "Alex Vidal", email: "alex.vidal@careeros.ai", plan: "Pro plan", initials: "AV", timezone: "GMT+1 · Madrid" };

/** Verdict thresholds (score → label + color). */
export const scoreColor = (m: number) =>
  m >= 85 ? "var(--good)" : m >= 72 ? "var(--accent)" : m >= 65 ? "var(--warn)" : "var(--bad)";
export const verdict = (m: number, lang: "es" | "en") =>
  m >= 85 ? (lang === "es" ? "Encaje fuerte" : "Strong match")
  : m >= 72 ? (lang === "es" ? "Encaje sólido" : "Solid match")
  : (lang === "es" ? "Encaje parcial" : "Partial match");

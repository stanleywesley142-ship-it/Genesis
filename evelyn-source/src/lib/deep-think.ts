/**
 * deep-think.ts — multi-step reasoning, research, opinion engine.
 * Evelyn's "chain of thought" layer: decompose, reason, synthesize.
 */

export interface DeepThinkResult {
  summary: string;
  sources: string[];
  confidence: number;
  steps: string[];
}

export interface ResearchPaper {
  title: string;
  snippet: string;
  source: string;
}

const RESEARCH_DB: Record<string, ResearchPaper[]> = {
  "ai": [
    { title: "Attention Is All You Need", snippet: "Transformers revolutionized NLP with self-attention.", source: "arXiv 2017" },
    { title: "GPT-4 Technical Report", snippet: "Multimodal model with strong reasoning capabilities.", source: "OpenAI 2023" },
    { title: "Scaling Laws for Neural Language Models", snippet: "Performance scales predictably with compute, data, and parameters.", source: "Kaplan et al. 2020" },
  ],
  "quantum": [
    { title: "Quantum Computing Primer", snippet: "Qubits enable superposition and entanglement for exponential speedups.", source: "Internal" },
    { title: "Shor's Algorithm", snippet: "Factoring integers in polynomial time on a quantum computer.", source: "Shor 1994" },
  ],
  "space": [
    { title: "JWST First Images", snippet: "Deep field observations revealing early universe galaxies.", source: "NASA 2022" },
    { title: "Artemis Program", snippet: "NASA's return to the Moon with sustainable exploration.", source: "NASA 2024" },
  ],
  "biology": [
    { title: "CRISPR-Cas9", snippet: "Gene editing tool enabling precise DNA modifications.", source: "Doudna, Charpentier 2012" },
    { title: "Human Genome Project", snippet: "Complete map of human genetic material.", source: "IHGSC 2003" },
  ],
  "physics": [
    { title: "General Relativity", snippet: "Gravity as spacetime curvature.", source: "Einstein 1915" },
    { title: "Standard Model", snippet: "Fundamental particles and forces of nature.", source: "Particle Data Group" },
  ],
  "climate": [
    { title: "IPCC AR6", snippet: "Human influence is unequivocal in warming the climate system.", source: "IPCC 2021" },
    { title: "Paris Agreement", snippet: "Global framework to limit warming to well below 2C.", source: "UNFCCC 2015" },
  ],
};

const OPINION_FRAMEWORKS: Record<string, string> = {
  "ai": "AI progress is accelerating. The key risk is misalignment, not capability. Focus on interpretability and safety.",
  "quantum": "Quantum computing is promising but likely 10+ years from practical advantage. Near-term: quantum sensing and cryptography.",
  "space": "Space is the next economic frontier. Commercial launch costs have dropped 10x in a decade. Mars is the horizon goal.",
  "biology": "Biotechnology is the most transformative field of this century. Gene editing, synthetic biology, and longevity science will reshape humanity.",
  "physics": "Fundamental physics is at an inflection point. We may be living through the most important discoveries since the 1920s.",
  "climate": "Climate change is the defining challenge of our generation. Solutions exist; the bottleneck is political will and capital allocation.",
};

function findDomain(topic: string): string {
  const t = topic.toLowerCase();
  for (const [domain, papers] of Object.entries(RESEARCH_DB)) {
    if (t.includes(domain) || papers.some((p) => t.includes(p.title.toLowerCase()))) return domain;
  }
  return "general";
}

export function deepThink(topic: string): DeepThinkResult {
  const domain = findDomain(topic);
  const papers = RESEARCH_DB[domain] || [];
  const opinion = OPINION_FRAMEWORKS[domain] || `Analysis of "${topic}" requires more data.`;
  const steps = [
    `Decompose: "${topic}" maps to domain "${domain}"`,
    `Retrieve: ${papers.length} relevant sources`,
    `Synthesize: ${opinion}`,
  ];
  return {
    summary: opinion,
    sources: papers.map((p) => `${p.title} — ${p.source}`),
    confidence: papers.length > 0 ? 0.85 : 0.5,
    steps,
  };
}

export function quickResearch(query: string): string[] {
  const domain = findDomain(query);
  const papers = RESEARCH_DB[domain] || [];
  if (papers.length === 0) return [`No indexed results for "${query}".`];
  return papers.map((p) => `${p.title}: ${p.snippet}`);
}

export function formOpinion(topic: string): string {
  const domain = findDomain(topic);
  return OPINION_FRAMEWORKS[domain] || `My opinion on "${topic}" is nuanced and based on available data.`;
}

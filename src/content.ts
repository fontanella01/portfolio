// Todo o texto do site fica aqui, nas duas línguas. As páginas só montam o layout.

export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

type Project = {
  name: string;
  summary: string;
  highlights: string[];
  stack: string[];
  repo: string;
  demo?: string;
  images: { src: string; alt: string }[];
};

type CaseStudy = {
  title: string;
  context: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
};

type Job = { role: string; company: string; period: string; items: string[] };

type Product = { name: string; what: string; role: string; stack: string[] };

export type ChatLine = { from: "in" | "out" | "event"; text: string; time?: string };

type Content = {
  meta: { title: string; description: string };
  nav: { projects: string; work: string; cases: string; experience: string; contact: string };
  hero: {
    name: string;
    headline: string;
    summary: string;
    cv: string;
    cvHref: string;
    available: string;
    chat: { contact: string; status: string; lines: ChatLine[]; caption: string };
  };
  projects: { title: string; subtitle: string; repoLabel: string; demoLabel: string; soon: string; items: Project[] };
  work: { title: string; subtitle: string; roleLabel: string; items: Product[] };
  cases: { title: string; subtitle: string; labels: { problem: string; solution: string; result: string }; items: CaseStudy[] };
  experience: { title: string; items: Job[] };
  stack: { title: string; groups: [string, string][] };
  contact: { title: string; text: string; location: string };
  switchLang: string;
};

const LINKS = {
  github: "https://github.com/fontanella01",
  linkedin: "https://www.linkedin.com/in/vinicius-fontanella",
  email: "fontanella.vinicius@gmail.com",
};
export { LINKS };

const helpdeskImages = [
  { src: "/projects/helpdesk-tickets.png", alt: "HelpDesk — tickets" },
  { src: "/projects/helpdesk-ai-assistant.png", alt: "HelpDesk — AI assistant" },
  { src: "/projects/helpdesk-dashboard.png", alt: "HelpDesk — dashboard" },
];
const storeImages = [
  { src: "/projects/store-home.png", alt: "Store — catalog" },
  { src: "/projects/store-product.png", alt: "Store — product" },
  { src: "/projects/store-cart.png", alt: "Store — cart" },
];

export const CONTENT: Record<Lang, Content> = {
  pt: {
    meta: {
      title: "Vinícius Fontanella Kleis — Desenvolvedor Full Stack",
      description:
        "Desenvolvedor full stack em Joinville/SC: React, TypeScript, Node, PostgreSQL/Supabase, integrações com a Meta e agentes de IA.",
    },
    nav: { projects: "Projetos", work: "No trabalho", cases: "Estudos de caso", experience: "Experiência", contact: "Contato" },
    hero: {
      name: "Vinícius Fontanella Kleis",
      headline: "Desenvolvedor full stack. Faço sistemas que conversam com clientes, pagamentos e IA.",
      summary:
        "Construo e mantenho produtos SaaS de ponta a ponta: do banco de dados (PostgreSQL com RLS) às telas em React e TypeScript, passando por APIs, webhooks, integrações com WhatsApp e Meta e agentes de IA em produção.",
      cv: "Baixar currículo",
      cvHref: "/cv/curriculo-vinicius-fontanella-kleis.pdf",
      available: "Aberto a novas oportunidades",
      chat: {
        contact: "Clínica Aurora",
        status: "agente de IA ativo",
        lines: [
          { from: "in", text: "Oi! Vocês atendem no sábado?", time: "09:41" },
          { from: "event", text: "Webhook recebido, agente de IA respondendo" },
          { from: "out", text: "Atendemos sim, das 9h às 13h. Quer que eu reserve um horário?", time: "09:41" },
          { from: "in", text: "Quero, às 10h", time: "09:42" },
          { from: "event", text: "Horário gravado na agenda" },
          { from: "out", text: "Pronto! Sábado às 10h está reservado para você.", time: "09:42" },
        ],
        caption: "Simulação de um agente de IA atendendo pelo WhatsApp, como os que eu mantenho em produção.",
      },
    },
    projects: {
      title: "Projetos",
      subtitle: "Projetos pessoais com código aberto no GitHub.",
      repoLabel: "Código",
      demoLabel: "Ver online",
      soon: "Em construção: agente de atendimento com IA para WhatsApp, com base de conhecimento (RAG) e passagem para humano.",
      items: [
        {
          name: "HelpDesk",
          summary:
            "Sistema de chamados multiempresa com prazos de SLA e um assistente de IA que sugere categoria, prioridade e primeira resposta.",
          highlights: [
            "Cada empresa tem seu espaço; toda consulta é filtrada pela organização do usuário",
            "SLA por prioridade, que para quando o chamado é resolvido e volta se for reaberto",
            "Triagem com a API do Claude: o atendente revisa antes de aplicar, nada é enviado sozinho",
            "Testes automatizados e CI; PostgreSQL rodando em WebAssembly nos testes",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "Zod", "Vitest", "Claude API"],
          repo: `${LINKS.github}/helpdesk`,
          images: helpdeskImages,
        },
        {
          name: "Loja com Mercado Pago",
          summary:
            "Loja virtual completa feita em um dia: catálogo, carrinho, checkout com Pix, cartão e boleto e as páginas legais exigidas no Brasil.",
          highlights: [
            "Funções serverless no Cloudflare Pages criam o pagamento no Mercado Pago",
            "Preços lidos só no servidor: corrigi uma falha em que o navegador podia definir o próprio preço",
            "Webhook que confere a assinatura do Mercado Pago e consulta o pagamento na API, sem confiar no que chega na notificação",
            "Testes automáticos de preço e de assinatura rodando no GitHub Actions; sem dependências nem etapa de build",
          ],
          stack: ["HTML", "CSS", "JavaScript", "Cloudflare Pages Functions", "Mercado Pago", "node:test"],
          repo: `${LINKS.github}/online-store-mercadopago`,
          images: storeImages,
        },
      ],
    },
    work: {
      title: "No trabalho",
      subtitle: "Produtos SaaS em produção em que trabalho hoje. O código é privado; os estudos de caso abaixo contam alguns problemas que resolvi neles.",
      roleLabel: "Meu papel",
      items: [
        {
          name: "Plotado",
          what: "CRM multiempresa para pequenos negócios, com atendimento pelo WhatsApp, agentes de IA respondendo clientes e assinaturas pelo Stripe.",
          role: "Agentes de IA e regras de atendimento, webhooks do WhatsApp, cobrança, banco de dados e sustentação com análise de causa raiz.",
          stack: ["React", "TypeScript", "Supabase", "Edge Functions", "Stripe", "LLM"],
        },
        {
          name: "X-Flow",
          what: "Plataforma de gestão para agências de marketing que reúne clientes, tarefas e as contas de Facebook, Instagram e anúncios.",
          role: "Integração com as APIs da Meta (Graph e Marketing API), coleta de métricas e a revisão do app pela Meta.",
          stack: ["React", "TypeScript", "Supabase", "Meta Graph API", "OAuth"],
        },
        {
          name: "FastBlog",
          what: "Plataforma que gera e publica conteúdo de blog para empresas, com planos por assinatura.",
          role: "Pagamentos, notas fiscais de serviço e manutenção das funções de backend.",
          stack: ["React", "TypeScript", "Supabase", "Stripe"],
        },
        {
          name: "EngraxaMente",
          what: "Plataforma de cursos online com área do aluno, provas, certificados e trilhas de estudo sugeridas por IA.",
          role: "Painéis de engajamento e relatórios calculados no banco, certificados, provas, assistente e trilhas com IA e a migração dos alunos da plataforma antiga.",
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "LLM"],
        },
      ],
    },
    cases: {
      title: "Estudos de caso",
      subtitle: "Problemas reais que resolvi no trabalho, contados sem dados de clientes.",
      labels: { problem: "Problema", solution: "Solução", result: "Resultado" },
      items: [
        {
          title: "O agente de IA que parava de responder",
          context: "CRM SaaS multiempresa com agente de IA atendendo clientes de uma clínica pelo WhatsApp.",
          problem:
            "Desde um dia específico, quase 100% das conversas novas eram pausadas segundos depois de abertas e a IA deixou de responder.",
          solution:
            "Investiguei pelos dados de produção e descobri que o sistema de agendamento da clínica mandava mensagens automáticas pelo mesmo número, gravadas como se fossem de um atendente humano. Ajustei a regra no webhook (Edge Function), cobri com testes usando as mensagens reais, liguei a correção só para esse cliente e reativei as conversas afetadas.",
          result: "As respostas da IA passaram de 2–6 para mais de 150 por dia, sem atropelar atendentes de verdade.",
          tags: ["Supabase", "Edge Functions", "Webhooks", "LLM", "Testes"],
        },
        {
          title: "Integração com a Meta e App Review",
          context: "Plataforma de gestão para agências de marketing que conecta Facebook, Instagram e contas de anúncio.",
          problem:
            "A coleta de métricas do Instagram falhava em silêncio depois de uma mudança na API, e o app precisava passar pela revisão da Meta para liberar novas permissões.",
          solution:
            "Ajustei as métricas pedidas e isolei cada chamada para uma falha não derrubar a coleta inteira; tokens vencidos passaram a pedir reconexão em vez de falhar calados. Conduzi o App Review: vídeos de cada permissão, descrições e questionário de dados.",
          result: "Coleta estável e envio à Meta com 5 permissões.",
          tags: ["Meta Graph API", "Marketing API", "OAuth", "Idempotência"],
        },
        {
          title: "Plataforma de cursos com migração de 7 mil usuários",
          context: "Cliente que precisava de uma plataforma de cursos online (LMS) própria.",
          problem: "Levar cerca de 7 mil alunos de outro sistema sem perder acessos nem histórico.",
          solution: "Desenvolvi a plataforma e a rotina de migração, com conferência dos dados antes e depois da virada.",
          result: "Plataforma no ar com os alunos migrados.",
          tags: ["React", "PostgreSQL", "Migração de dados"],
        },
      ],
    },
    experience: {
      title: "Experiência",
      items: [
        {
          role: "Desenvolvedor Full Stack (PJ)",
          company: "Volúpia Digital / Infoprotect",
          period: "jun 2026 – atual",
          items: [
            "CRM SaaS multiempresa em React, TypeScript e Supabase/PostgreSQL",
            "Integrações com WhatsApp, Instagram, Meta Ads, webhooks e notas fiscais de serviço",
            "Agentes e recursos com IA generativa em produção",
            "Sustentação N2/N3 com análise de causa raiz",
          ],
        },
        {
          role: "Planejador Operacional",
          company: "Orbenk",
          period: "out 2025 – mai 2026",
          items: ["Integrações para automação de processos", "ETL e dashboards em Power BI"],
        },
        {
          role: "Estagiário em Banco de Dados",
          company: "Byseven",
          period: "fev 2025 – jul 2025",
          items: ["Sustentação de bancos Oracle", "Rotinas de integração de dados"],
        },
      ],
    },
    stack: {
      title: "Stack",
      groups: [
        ["Front-end", "React, TypeScript, Next.js, Vite, Tailwind CSS"],
        ["Back-end", "Node.js, Fastify, APIs REST, Supabase Edge Functions, webhooks"],
        ["Dados", "PostgreSQL (RLS, funções, gatilhos), Oracle, SQL, ETL, Power BI"],
        ["IA", "Claude e OpenAI, agentes, RAG, triagem e classificação"],
        ["Integrações", "Meta (WhatsApp, Instagram, Ads), Mercado Pago, Stripe"],
        ["Ferramentas", "Git/GitHub, CI, Claude Code, Lovable, Linux"],
      ],
    },
    contact: {
      title: "Vamos conversar",
      text: "Estou aberto a vagas full stack (remoto ou híbrido) e projetos freelance.",
      location: "Joinville, SC — Brasil",
    },
    switchLang: "English",
  },
  en: {
    meta: {
      title: "Vinícius Fontanella Kleis — Full Stack Developer",
      description:
        "Full stack developer based in Brazil: React, TypeScript, Node, PostgreSQL/Supabase, Meta integrations and AI agents.",
    },
    nav: { projects: "Projects", work: "At work", cases: "Case studies", experience: "Experience", contact: "Contact" },
    hero: {
      name: "Vinícius Fontanella Kleis",
      headline: "Full stack developer. I build systems that talk to customers, payments and AI.",
      summary:
        "I build and maintain SaaS products end to end: from the database (PostgreSQL with Row Level Security) to React and TypeScript interfaces, including APIs, webhooks, WhatsApp and Meta integrations, and AI agents running in production.",
      cv: "Download resume",
      cvHref: "/cv/resume-vinicius-fontanella-kleis.pdf",
      available: "Open to new opportunities",
      chat: {
        contact: "Aurora Clinic",
        status: "AI agent active",
        lines: [
          { from: "in", text: "Hi! Are you open on Saturday?", time: "09:41" },
          { from: "event", text: "Webhook received, AI agent replying" },
          { from: "out", text: "We are, from 9am to 1pm. Want me to book a time for you?", time: "09:41" },
          { from: "in", text: "Yes, 10am please", time: "09:42" },
          { from: "event", text: "Booking saved to the calendar" },
          { from: "out", text: "Done! Saturday at 10am is booked for you.", time: "09:42" },
        ],
        caption: "A simulated AI agent answering on WhatsApp, like the ones I run in production.",
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Personal projects, open source on GitHub.",
      repoLabel: "Code",
      demoLabel: "Live demo",
      soon: "In progress: an AI customer service agent for WhatsApp, with a knowledge base (RAG) and human handoff.",
      items: [
        {
          name: "HelpDesk",
          summary:
            "Multi-tenant support ticket system with SLA tracking and an AI assistant that suggests category, priority and a first reply.",
          highlights: [
            "Each company gets its own workspace; every query is scoped to the user's organization",
            "Per-priority SLA that stops when a ticket is resolved and restarts if it is reopened",
            "Triage with the Claude API: the agent reviews before applying, nothing is sent automatically",
            "Automated tests and CI; PostgreSQL runs in WebAssembly during tests",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "Zod", "Vitest", "Claude API"],
          repo: `${LINKS.github}/helpdesk`,
          images: helpdeskImages,
        },
        {
          name: "Online store with Mercado Pago",
          summary:
            "A complete storefront built in one day: catalog, cart, checkout with Pix, card and boleto, and the legal pages required in Brazil.",
          highlights: [
            "Serverless functions on Cloudflare Pages create the Mercado Pago payment",
            "Prices are read server-side only: I fixed a bug where the browser could set its own price",
            "A webhook that verifies Mercado Pago's signature and reads the payment from the API instead of trusting the notification",
            "Automated tests for prices and signatures on GitHub Actions; no dependencies and no build step",
          ],
          stack: ["HTML", "CSS", "JavaScript", "Cloudflare Pages Functions", "Mercado Pago", "node:test"],
          repo: `${LINKS.github}/online-store-mercadopago`,
          images: storeImages,
        },
      ],
    },
    work: {
      title: "At work",
      subtitle: "SaaS products in production that I work on today. The code is private; the case studies below cover some problems I solved in them.",
      roleLabel: "My role",
      items: [
        {
          name: "Plotado",
          what: "A multi-tenant CRM for small businesses, with customer service on WhatsApp, AI agents answering customers and Stripe subscriptions.",
          role: "AI agents and handoff rules, WhatsApp webhooks, billing, database work and production support with root cause analysis.",
          stack: ["React", "TypeScript", "Supabase", "Edge Functions", "Stripe", "LLM"],
        },
        {
          name: "X-Flow",
          what: "A management platform for marketing agencies that brings together clients, tasks and their Facebook, Instagram and ad accounts.",
          role: "Integration with the Meta APIs (Graph and Marketing API), metrics collection and Meta's app review.",
          stack: ["React", "TypeScript", "Supabase", "Meta Graph API", "OAuth"],
        },
        {
          name: "FastBlog",
          what: "A platform that writes and publishes blog content for businesses, sold as a subscription.",
          role: "Payments, service e-invoices and maintenance of the backend functions.",
          stack: ["React", "TypeScript", "Supabase", "Stripe"],
        },
        {
          name: "EngraxaMente",
          what: "An online learning platform with a student area, exams, certificates and AI-suggested learning paths.",
          role: "Engagement dashboards and reports computed in the database, certificates, exams, the AI assistant and learning paths, and the migration of students from the old platform.",
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "LLM"],
        },
      ],
    },
    cases: {
      title: "Case studies",
      subtitle: "Real problems I solved at work, told without client data.",
      labels: { problem: "Problem", solution: "Solution", result: "Result" },
      items: [
        {
          title: "The AI agent that kept going silent",
          context: "Multi-tenant SaaS CRM with an AI agent answering a clinic's customers on WhatsApp.",
          problem:
            "From one day on, almost 100% of new conversations were paused seconds after opening and the AI stopped replying.",
          solution:
            "I traced it in production data: the clinic's scheduling system sent automated messages from the same number, and they were recorded as a human taking over. I fixed the rule in the webhook (an Edge Function), covered it with tests using the real messages, enabled the fix for that client only and safely re-enabled the affected conversations.",
          result: "AI replies went from 2–6 to over 150 a day, without talking over real agents.",
          tags: ["Supabase", "Edge Functions", "Webhooks", "LLM", "Testing"],
        },
        {
          title: "Meta integration and App Review",
          context: "Management platform for marketing agencies that connects Facebook, Instagram and ad accounts.",
          problem:
            "Instagram metrics collection was failing silently after an API change, and the app had to pass Meta's review to unlock new permissions.",
          solution:
            "I adjusted the requested metrics and isolated each call so one failure couldn't break the whole run; expired tokens now ask for reconnection instead of failing silently. I ran the App Review: a video per permission, descriptions and the data handling questionnaire.",
          result: "Stable collection and a Meta submission with 5 permissions.",
          tags: ["Meta Graph API", "Marketing API", "OAuth", "Idempotency"],
        },
        {
          title: "Online learning platform and a 7,000-user migration",
          context: "A client needed its own online learning platform (LMS).",
          problem: "Move about 7,000 students from another system without losing access or history.",
          solution: "I built the platform and the migration routine, checking the data before and after the cutover.",
          result: "Platform live with every student migrated.",
          tags: ["React", "PostgreSQL", "Data migration"],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          role: "Full Stack Developer (Contractor)",
          company: "Volúpia Digital / Infoprotect",
          period: "Jun 2026 – present",
          items: [
            "Multi-tenant SaaS CRM in React, TypeScript and Supabase/PostgreSQL",
            "WhatsApp, Instagram, Meta Ads, webhook and e-invoice integrations",
            "Generative AI agents and features in production",
            "L2/L3 support with root cause analysis",
          ],
        },
        {
          role: "Operations Planner",
          company: "Orbenk",
          period: "Oct 2025 – May 2026",
          items: ["Process automation integrations", "ETL and Power BI dashboards"],
        },
        {
          role: "Database Intern",
          company: "Byseven",
          period: "Feb 2025 – Jul 2025",
          items: ["Oracle database support", "Data integration routines"],
        },
      ],
    },
    stack: {
      title: "Stack",
      groups: [
        ["Front end", "React, TypeScript, Next.js, Vite, Tailwind CSS"],
        ["Back end", "Node.js, Fastify, REST APIs, Supabase Edge Functions, webhooks"],
        ["Data", "PostgreSQL (RLS, functions, triggers), Oracle, SQL, ETL, Power BI"],
        ["AI", "Claude and OpenAI, agents, RAG, triage and classification"],
        ["Integrations", "Meta (WhatsApp, Instagram, Ads), Mercado Pago, Stripe"],
        ["Tools", "Git/GitHub, CI, Claude Code, Lovable, Linux"],
      ],
    },
    contact: {
      title: "Let's talk",
      text: "I'm open to full stack roles (remote or hybrid) and freelance projects.",
      location: "Joinville, SC — Brazil",
    },
    switchLang: "Português",
  },
};

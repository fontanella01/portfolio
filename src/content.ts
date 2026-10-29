// Todo o texto do site fica aqui, nas duas línguas. As páginas só montam o layout.

export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export type ProjectId = "relay" | "helpdesk" | "store";

type Project = {
  id: ProjectId;
  tab: string;
  name: string;
  summary: string;
  highlights: string[];
  more: string[];
  stack: string[];
  repo: string;
  demo?: string;
  images: { src: string; alt: string }[];
};

// Before/after shown as two bars; pct is only the bar length, the text carries the facts.
type Bar = { label: string; value: string; pct: number };
type Story = { title: string; teaser: string; before: Bar; after: Bar; story: string[]; tags: string[] };
type Job = { role: string; company: string; period: string; summary: string };
type Product = { name: string; what: string; role: string };

export type ChatLink = { label: string; href: string };
// One topic of the conversation: the question the visitor taps, my answer in short
// messages, optional links, and the topics that open up after it.
export type ChatTopic = { q: string; a: string[]; links?: ChatLink[]; next?: string[] };
export type ChatScript = {
  intro: string[];
  start: string[];
  topics: Record<string, ChatTopic>;
  labels: { typing: string; restart: string; pick: string; done: string; me: string };
};

export const NODE_IDS = ["whatsapp", "payments", "webhook", "queue", "ai", "database", "panel"] as const;
export type NodeId = (typeof NODE_IDS)[number];
export type MapNode = { label: string; sub: string; what: string; did: string[]; links: ChatLink[] };

// Texts shown inside the animated project previews.
export type Previews = {
  relay: { business: string; customer1: string; ai1: string; customer2: string; handoff: string; agent: string };
  helpdesk: { ticket: string; urgent: string; open: string; progress: string; resolved: string; assigned: string; note: string; due: string; onTime: string; queue: string[]; high: string };
  store: { product: string; price: string; buy: string; cart: string; pix: string; waiting: string; approved: string; order: string };
};

type Content = {
  meta: { title: string; description: string };
  nav: { map: string; projects: string; path: string; stories: string; contact: string };
  map: { title: string; subtitle: string; hint: string; didLabel: string; nodes: Record<NodeId, MapNode> };
  previews: Previews;
  trajectory: { title: string; subtitle: string; productsLabel: string };
  closing: { title: string; text: string; email: string; cvLabel: string; qr: string; site: string };
  hero: { name: string; role: string; intro: string; cv: string; cvHref: string; available: string; photoAlt: string };
  chat: ChatScript;
  projects: { title: string; subtitle: string; repoLabel: string; demoLabel: string; moreLabel: string; items: Project[] };
  work: { title: string; subtitle: string; items: Product[] };
  stories: { title: string; subtitle: string; readLabel: string; items: Story[] };
  experience: { title: string; items: Job[] };
  contact: { title: string; text: string; location: string };
  switchLang: string;
};

const LINKS = {
  github: "https://github.com/fontanella01",
  linkedin: "https://www.linkedin.com/in/vinicius-fontanella",
  email: "fontanella.vinicius@gmail.com",
  relayDemo: "https://relay-whatsapp-ai-agent.onrender.com",
  helpdeskDemo: "https://helpdesk-demo-l6j8.onrender.com",
};
export { LINKS };

const helpdeskImages = [
  { src: "/projects/helpdesk-tickets.png", alt: "HelpDesk — ticket conversation and history" },
  { src: "/projects/helpdesk-ai-assistant.png", alt: "HelpDesk — AI assistant" },
  { src: "/projects/helpdesk-dashboard.png", alt: "HelpDesk — dashboard" },
];
const relayImages = [
  { src: "/projects/relay-inbox.png", alt: "Relay — inbox with the AI answering and the phone simulator" },
  { src: "/projects/relay-handoff.png", alt: "Relay — conversation handed to the team" },
  { src: "/projects/relay-knowledge.png", alt: "Relay — knowledge base" },
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
      description: "Desenvolvedor full stack em Joinville/SC. Faço sistemas que conversam com clientes, pagamentos e IA.",
    },
    nav: { map: "Como eu construo", projects: "Projetos", path: "Trajetória", stories: "Histórias", contact: "Contato" },
    map: {
      title: "Como eu construo",
      subtitle: "Os sistemas em que trabalho são peças que conversam entre si. Clique numa peça para ver o que eu fiz com ela.",
      hint: "Escolha uma peça do mapa",
      didLabel: "O que eu fiz",
      nodes: {
        whatsapp: {
          label: "WhatsApp e Meta",
          sub: "onde o cliente está",
          what: "As mensagens dos clientes chegam e saem pela API oficial do WhatsApp. Também integro Instagram e anúncios da Meta.",
          did: ["Integração com a API oficial do WhatsApp no Relay e no CRM da empresa", "Coleta de métricas do Instagram e a revisão do app pela Meta"],
          links: [{ label: "Ver o Relay", href: "#p-relay" }, { label: "História das métricas", href: "#stories" }],
        },
        payments: {
          label: "Pagamentos",
          sub: "Stripe e Mercado Pago",
          what: "Cobrança de assinaturas e checkout. O pagamento confirma por webhook, nunca pelo que o navegador diz.",
          did: ["Assinaturas com Stripe nos produtos da empresa", "Loja com Pix, cartão e boleto, com o preço sempre validado no servidor"],
          links: [{ label: "Ver a loja", href: "#p-store" }],
        },
        webhook: {
          label: "Webhooks",
          sub: "a porta de entrada",
          what: "É por aqui que outros sistemas avisam que algo aconteceu: chegou mensagem, um pagamento foi aprovado.",
          did: ["Assinatura conferida em cada chamada, para garantir que veio de quem diz", "Achei e corrigi a regra que fazia a IA de uma clínica parar de responder"],
          links: [{ label: "Ler a história", href: "#stories" }],
        },
        queue: {
          label: "Fila",
          sub: "trabalho em segundo plano",
          what: "O webhook responde na hora e o trabalho pesado fica para depois. Se algo falhar, tenta de novo sozinho.",
          did: ["Fila dentro do próprio PostgreSQL no Relay, sem mensagem duplicada", "Respostas agrupadas quando o cliente manda várias mensagens seguidas"],
          links: [{ label: "Ver o Relay", href: "#p-relay" }],
        },
        ai: {
          label: "IA",
          sub: "Claude e OpenAI",
          what: "Agentes que atendem clientes de verdade. Eles respondem só com o que a empresa ensinou e sabem a hora de chamar uma pessoa.",
          did: ["Agentes de IA atendendo no WhatsApp em produção", "Base de conhecimento (RAG) no Relay", "IA que sugere categoria e resposta no HelpDesk"],
          links: [{ label: "Ver o Relay", href: "#p-relay" }, { label: "Ver o HelpDesk", href: "#p-helpdesk" }],
        },
        database: {
          label: "Banco de dados",
          sub: "PostgreSQL e Supabase",
          what: "Onde tudo fica guardado. Cada empresa só enxerga os próprios dados, e os relatórios são calculados direto no banco.",
          did: ["Separação entre empresas no HelpDesk e no CRM", "Relatórios e painéis calculados no PostgreSQL", "Migração de 7 mil alunos de outra plataforma"],
          links: [{ label: "Ver o HelpDesk", href: "#p-helpdesk" }, { label: "Ler as histórias", href: "#stories" }],
        },
        panel: {
          label: "Painel da equipe",
          sub: "React e TypeScript",
          what: "As telas que a equipe usa no dia a dia, atualizando ao vivo.",
          did: ["Caixa de entrada que atualiza sozinha no Relay", "Painéis de prazo e de carga por atendente no HelpDesk"],
          links: [{ label: "Testar o HelpDesk", href: LINKS.helpdeskDemo }],
        },
      },
    },
    previews: {
      relay: {
        business: "Clínica Aurora",
        customer1: "Vocês abrem no sábado?",
        ai1: "Abrimos sim, das 9h às 13h.",
        customer2: "Quero marcar uma limpeza",
        handoff: "Passou para a equipe",
        agent: "Oi! Tenho terça às 10h, pode ser?",
      },
      helpdesk: {
        ticket: "Internet caiu no escritório",
        urgent: "Urgente",
        open: "Aberto",
        progress: "Em andamento",
        resolved: "Resolvido",
        assigned: "Ana assumiu",
        note: "Fibra rompida na rua. Técnico chega às 11h.",
        due: "vence em",
        onTime: "resolvido no prazo",
        queue: ["Cobrado duas vezes na fatura", "E-mail de senha não chega"],
        high: "Alta",
      },
      store: {
        product: "Luminária com carregador",
        price: "R$ 149,90",
        buy: "Comprar",
        cart: "Carrinho",
        pix: "Pagar com Pix",
        waiting: "Aguardando pagamento",
        approved: "Pagamento aprovado",
        order: "Pedido QU-3F9A1C2B",
      },
    },
    trajectory: {
      title: "Trajetória",
      subtitle: "Do banco de dados até a tela.",
      productsLabel: "Produtos em que trabalho hoje",
    },
    closing: {
      title: "Vamos conversar",
      text: "Estou aberto a vagas full stack, remotas ou híbridas, e a projetos freelance.",
      email: "Mandar e-mail",
      cvLabel: "Currículo (PDF)",
      qr: "Aponte a câmera para abrir meu LinkedIn",
      site: "vinicius-fontanella.vercel.app",
    },
    hero: {
      name: "Vinícius Fontanella Kleis",
      role: "Desenvolvedor full stack",
      intro: "Faço sistemas que conversam com clientes, pagamentos e IA. Em vez de um texto longo sobre mim, pergunte o que te interessa na conversa.",
      cv: "Baixar currículo",
      cvHref: "/cv/curriculo-vinicius-fontanella-kleis.pdf",
      available: "Aberto a novas oportunidades",
      photoAlt: "Foto de Vinícius",
    },
    chat: {
      intro: ["Oi! Eu sou o Vinícius 👋", "Escolhe uma pergunta e eu te conto. Pode ir por onde quiser."],
      start: ["about", "projects", "hardest", "work", "hire"],
      topics: {
        about: {
          q: "Como você chegou na programação?",
          a: [
            "Comecei com Python aos 23, praticando no dia a dia.",
            "Meu primeiro emprego na área foi um estágio cuidando de bancos Oracle. Depois fui para planejamento operacional, onde automatizava processos e montava dashboards no Power BI.",
            "Desde junho de 2026 sou dev full stack. Fui do dado até a tela.",
          ],
          next: ["stack", "work"],
        },
        work: {
          q: "Onde você trabalha hoje?",
          a: [
            "Sou dev full stack PJ na Volúpia Digital / Infoprotect.",
            "Trabalho em quatro produtos SaaS que estão no ar: um CRM com IA atendendo no WhatsApp, uma plataforma para agências integrada à Meta, uma plataforma de cursos e uma de conteúdo para blogs.",
          ],
          links: [{ label: "Ver os produtos", href: "#work" }],
          next: ["hardest", "stack"],
        },
        projects: {
          q: "O que você já construiu?",
          a: [
            "Tenho três projetos abertos no GitHub, e dá para testar dois deles agora.",
            "O Relay é um agente de IA para WhatsApp: responde pela base de conhecimento da empresa e chama uma pessoa quando não sabe.",
            "O HelpDesk é um sistema de chamados para várias empresas, com prazos de SLA e IA ajudando na triagem.",
            "E tem uma loja com Mercado Pago, com Pix, cartão e boleto.",
          ],
          links: [
            { label: "Testar o Relay", href: LINKS.relayDemo },
            { label: "Ver os projetos", href: "#projects" },
          ],
          next: ["relay", "hardest"],
        },
        relay: {
          q: "Como o Relay funciona por dentro?",
          a: [
            "A mensagem chega pelo webhook do WhatsApp e entra numa fila no PostgreSQL. Assim o webhook responde rápido e nada se perde se algo falhar.",
            "A IA só recebe os trechos da base de conhecimento que respondem à pergunta, e não pode inventar.",
            "Se o cliente pede uma pessoa, quer agendar ou pergunta algo fora da base, a conversa vai para a equipe, que acompanha tudo ao vivo.",
          ],
          links: [{ label: "Código no GitHub", href: `${LINKS.github}/whatsapp-ai-agent` }],
          next: ["stack", "hire"],
        },
        hardest: {
          q: "Qual o problema mais difícil que você resolveu?",
          a: [
            "Uma clínica que usa nosso CRM ficou sem respostas da IA de um dia para o outro. Quase toda conversa nova era pausada em segundos.",
            "Fui nos dados de produção e achei a causa: o sistema de agendamento da clínica mandava mensagens automáticas pelo mesmo número, e elas eram gravadas como se um atendente tivesse assumido.",
            "Ajustei a regra, testei com as mensagens reais e reativei as conversas. A IA voltou de 2 a 6 respostas por dia para mais de 150.",
          ],
          links: [{ label: "Mais histórias", href: "#stories" }],
          next: ["more", "work"],
        },
        more: {
          q: "Tem outra história?",
          a: [
            "Tenho! Na plataforma para agências, a coleta de métricas do Instagram parou em silêncio depois de uma mudança na API da Meta. Isolei cada chamada para uma falha não derrubar o resto, e depois conduzi a revisão do app pela Meta.",
            "E numa plataforma de cursos, migrei uns 7 mil alunos de outro sistema, conferindo os dados antes e depois da virada.",
          ],
          links: [{ label: "Ler as histórias", href: "#stories" }],
          next: ["hire"],
        },
        stack: {
          q: "Com que tecnologias você trabalha?",
          a: [
            "No dia a dia: React e TypeScript na tela, Node.js e PostgreSQL (muito via Supabase) no servidor.",
            "Integro bastante com APIs de fora: WhatsApp, Instagram e anúncios da Meta, Mercado Pago, Stripe e nota fiscal.",
            "E uso IA (Claude e OpenAI) dentro dos produtos e no meu jeito de trabalhar.",
          ],
          next: ["projects", "hire"],
        },
        hire: {
          q: "Como falo com você?",
          a: [
            "Estou aberto a vagas full stack, remotas ou híbridas, e a projetos freelance. Falo inglês avançado.",
            "O jeito mais rápido é por e-mail. Também respondo no LinkedIn.",
          ],
          links: [
            { label: "Mandar e-mail", href: `mailto:${LINKS.email}` },
            { label: "LinkedIn", href: LINKS.linkedin },
            { label: "Currículo (PDF)", href: "/cv/curriculo-vinicius-fontanella-kleis.pdf" },
          ],
        },
      },
      labels: {
        typing: "digitando…",
        restart: "Recomeçar a conversa",
        pick: "Perguntas",
        done: "Você viu tudo! Se quiser, desce a página para ver os projetos com calma.",
        me: "Vinícius",
      },
    },
    projects: {
      title: "Projetos",
      subtitle: "Feitos por mim, com código aberto no GitHub.",
      repoLabel: "Código",
      demoLabel: "Testar ao vivo",
      moreLabel: "Mais detalhes",
      items: [
        {
          id: "relay",
          tab: "Relay",
          name: "Relay: agente de IA para WhatsApp",
          summary: "Responde o WhatsApp de uma empresa pela base de conhecimento dela e passa a conversa para uma pessoa quando não sabe ajudar.",
          highlights: ["A equipe vê tudo ao vivo e pode assumir a qualquer momento", "Tem um celular simulado: dá para testar sem conta do WhatsApp"],
          more: [
            "A IA recebe só os trechos da base que respondem à pergunta e é instruída a não inventar.",
            "Webhook oficial do WhatsApp com assinatura conferida, fila no PostgreSQL com novas tentativas e sem mensagem duplicada.",
            "Testes automáticos, CI e Docker.",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Claude API", "WhatsApp Cloud API"],
          repo: `${LINKS.github}/whatsapp-ai-agent`,
          demo: LINKS.relayDemo,
          images: relayImages,
        },
        {
          id: "helpdesk",
          tab: "HelpDesk",
          name: "HelpDesk",
          summary: "Sistema de chamados para várias empresas, com prazos de SLA e uma IA que sugere categoria, prioridade e primeira resposta.",
          highlights: ["Cada empresa só enxerga os próprios dados", "Conversa com o cliente, notas internas e histórico de quem mudou o quê"],
          more: [
            "O prazo para quando o chamado é resolvido e volta se ele for reaberto.",
            "A IA só sugere: o atendente revisa antes de aplicar, nada é enviado sozinho.",
            "Testes automáticos e CI, com um PostgreSQL de verdade rodando nos testes.",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "Claude API"],
          repo: `${LINKS.github}/helpdesk`,
          demo: LINKS.helpdeskDemo,
          images: helpdeskImages,
        },
        {
          id: "store",
          tab: "Loja",
          name: "Loja com Mercado Pago",
          summary: "Loja virtual feita em um dia: catálogo, carrinho e checkout com Pix, cartão e boleto.",
          highlights: ["O preço é sempre lido no servidor, nunca do navegador", "O aviso de pagamento tem a assinatura conferida"],
          more: [
            "Funções serverless no Cloudflare Pages criam o pagamento no Mercado Pago.",
            "Corrigi uma falha da primeira versão, em que dava para editar a requisição e pagar o preço que quisesse.",
            "Testes automáticos de preço e de assinatura no GitHub Actions.",
          ],
          stack: ["JavaScript", "Cloudflare Pages Functions", "Mercado Pago"],
          repo: `${LINKS.github}/online-store-mercadopago`,
          images: storeImages,
        },
      ],
    },
    work: {
      title: "No trabalho",
      subtitle: "Produtos em produção em que trabalho hoje. O código é da empresa, então conto o que eu faço em cada um.",
      items: [
        { name: "Plotado", what: "CRM para pequenos negócios, com IA atendendo clientes no WhatsApp.", role: "Agentes de IA, webhooks do WhatsApp, cobrança e banco de dados." },
        { name: "X-Flow", what: "Gestão para agências de marketing, ligada ao Facebook, Instagram e anúncios.", role: "Integração com as APIs da Meta e a revisão do app pela Meta." },
        { name: "EngraxaMente", what: "Plataforma de cursos com provas, certificados e trilhas sugeridas por IA.", role: "Painéis e relatórios, certificados, IA e a migração dos alunos." },
        { name: "FastBlog", what: "Plataforma que gera e publica conteúdo de blog para empresas.", role: "Pagamentos, notas fiscais e funções de backend." },
      ],
    },
    stories: {
      title: "Histórias",
      subtitle: "Problemas reais que resolvi, sem dados de clientes.",
      readLabel: "Ler a história",
      items: [
        {
          title: "A IA que parou de responder",
          teaser: "De um dia para o outro, quase toda conversa de uma clínica era pausada em segundos.",
          before: { label: "Antes", value: "2 a 6 respostas da IA por dia", pct: 4 },
          after: { label: "Depois", value: "mais de 150 por dia", pct: 100 },
          story: [
            "Uma clínica usa nosso CRM com uma IA respondendo os pacientes no WhatsApp. Um dia, as respostas praticamente sumiram: a IA mandava 2 a 6 mensagens por dia, quando o normal era mais de cem.",
            "Nos dados de produção, vi que as conversas eram pausadas segundos depois de abertas, como se um atendente tivesse assumido. Só que ninguém tinha assumido. O sistema de agendamento da clínica mandava lembretes automáticos pelo mesmo número, e o nosso webhook entendia essas mensagens como um humano entrando na conversa.",
            "Ajustei a regra para reconhecer esses envios automáticos, cobri com testes usando as mensagens reais e reativei as conversas afetadas. As respostas voltaram para mais de 150 por dia, sem a IA atropelar quando um atendente de verdade entra.",
          ],
          tags: ["Webhooks", "Edge Functions", "IA", "Testes"],
        },
        {
          title: "As métricas do Instagram que sumiram",
          teaser: "Uma mudança na API da Meta fez a coleta parar sem nenhum erro aparente.",
          before: { label: "Antes", value: "coleta parada, sem nenhum erro na tela", pct: 6 },
          after: { label: "Depois", value: "coleta estável e app enviado à revisão da Meta", pct: 100 },
          story: [
            "Numa plataforma para agências, os números do Instagram simplesmente pararam de chegar. Não havia erro na tela: a coleta falhava em silêncio.",
            "A Meta tinha mudado quais métricas aceitava. Ajustei o que pedíamos e separei cada chamada, para que uma falha não derrubasse a coleta inteira. Tokens vencidos passaram a pedir reconexão em vez de falhar calados.",
            "Depois conduzi a revisão do app pela Meta: gravei um vídeo para cada permissão, escrevi as descrições e respondi o questionário de dados.",
          ],
          tags: ["Meta Graph API", "OAuth", "Integrações"],
        },
        {
          title: "Sete mil alunos de uma vez",
          teaser: "Trazer os alunos de outra plataforma sem ninguém perder acesso.",
          before: { label: "Antes", value: "nenhum aluno na plataforma nova", pct: 2 },
          after: { label: "Depois", value: "cerca de 7 mil alunos migrados com acesso", pct: 100 },
          story: [
            "Um cliente queria sair de uma plataforma de cursos pronta e ter a sua própria. O desafio era levar uns 7 mil alunos sem ninguém perder o acesso nem o histórico.",
            "Construí a plataforma e a rotina de migração, conferindo os dados antes e depois da virada. Os alunos migrados continuaram vendo os cursos da plataforma antiga.",
          ],
          tags: ["PostgreSQL", "Migração de dados", "React"],
        },
      ],
    },
    experience: {
      title: "Experiência",
      items: [
        { role: "Desenvolvedor Full Stack (PJ)", company: "Volúpia Digital / Infoprotect", period: "jun 2026 – atual", summary: "Produtos SaaS com IA, WhatsApp e Meta, do banco de dados à tela, e sustentação em produção." },
        { role: "Planejador Operacional", company: "Orbenk", period: "out 2025 – mai 2026", summary: "Automação de processos, ETL e dashboards no Power BI." },
        { role: "Estagiário em Banco de Dados", company: "Byseven", period: "fev 2025 – jul 2025", summary: "Sustentação de bancos Oracle e rotinas de integração de dados." },
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
      description: "Full stack developer in Brazil. I build systems that talk to customers, payments and AI.",
    },
    nav: { map: "How I build", projects: "Projects", path: "Path", stories: "Stories", contact: "Contact" },
    map: {
      title: "How I build",
      subtitle: "The systems I work on are pieces that talk to each other. Click a piece to see what I did with it.",
      hint: "Pick a piece of the map",
      didLabel: "What I did",
      nodes: {
        whatsapp: {
          label: "WhatsApp and Meta",
          sub: "where customers are",
          what: "Customer messages come in and go out through the official WhatsApp API. I also integrate Instagram and Meta ads.",
          did: ["Official WhatsApp API integration in Relay and in the company CRM", "Instagram metrics collection and Meta's app review"],
          links: [{ label: "See Relay", href: "#p-relay" }, { label: "The metrics story", href: "#stories" }],
        },
        payments: {
          label: "Payments",
          sub: "Stripe and Mercado Pago",
          what: "Subscription billing and checkout. Payment is confirmed by webhook, never by what the browser says.",
          did: ["Stripe subscriptions in the company's products", "A store with Pix, card and boleto, with prices always checked on the server"],
          links: [{ label: "See the store", href: "#p-store" }],
        },
        webhook: {
          label: "Webhooks",
          sub: "the front door",
          what: "This is how other systems say something happened: a message arrived, a payment was approved.",
          did: ["The signature is checked on every call, to make sure it came from who it claims", "Found and fixed the rule that made a clinic's AI stop answering"],
          links: [{ label: "Read the story", href: "#stories" }],
        },
        queue: {
          label: "Queue",
          sub: "background work",
          what: "The webhook answers right away and the heavy work happens later. If something fails, it retries on its own.",
          did: ["A queue inside PostgreSQL in Relay, with no duplicate messages", "Replies grouped when a customer sends several messages in a row"],
          links: [{ label: "See Relay", href: "#p-relay" }],
        },
        ai: {
          label: "AI",
          sub: "Claude and OpenAI",
          what: "Agents that answer real customers. They only use what the business taught them and know when to call a person.",
          did: ["AI agents answering on WhatsApp in production", "A knowledge base (RAG) in Relay", "AI suggesting category and reply in HelpDesk"],
          links: [{ label: "See Relay", href: "#p-relay" }, { label: "See HelpDesk", href: "#p-helpdesk" }],
        },
        database: {
          label: "Database",
          sub: "PostgreSQL and Supabase",
          what: "Where everything is stored. Each company only sees its own data, and reports are computed right in the database.",
          did: ["Separation between companies in HelpDesk and the CRM", "Reports and dashboards computed in PostgreSQL", "Migrating 7,000 students from another platform"],
          links: [{ label: "See HelpDesk", href: "#p-helpdesk" }, { label: "Read the stories", href: "#stories" }],
        },
        panel: {
          label: "Team dashboard",
          sub: "React and TypeScript",
          what: "The screens the team uses every day, updating live.",
          did: ["An inbox that updates on its own in Relay", "Deadline and workload dashboards in HelpDesk"],
          links: [{ label: "Try HelpDesk", href: LINKS.helpdeskDemo }],
        },
      },
    },
    previews: {
      relay: {
        business: "Aurora Clinic",
        customer1: "Are you open on Saturday?",
        ai1: "We are, from 9am to 1pm.",
        customer2: "I'd like to book a cleaning",
        handoff: "Handed to the team",
        agent: "Hi! I have Tuesday at 10am, does that work?",
      },
      helpdesk: {
        ticket: "Internet down at the office",
        urgent: "Urgent",
        open: "Open",
        progress: "In progress",
        resolved: "Resolved",
        assigned: "Ana took it",
        note: "Fiber cut on the street. Technician arrives at 11am.",
        due: "due in",
        onTime: "resolved on time",
        queue: ["Charged twice on the invoice", "Password e-mail never arrives"],
        high: "High",
      },
      store: {
        product: "Lamp with wireless charger",
        price: "R$ 149.90",
        buy: "Buy",
        cart: "Cart",
        pix: "Pay with Pix",
        waiting: "Waiting for payment",
        approved: "Payment approved",
        order: "Order QU-3F9A1C2B",
      },
    },
    trajectory: {
      title: "Path",
      subtitle: "From the database to the screen.",
      productsLabel: "Products I work on today",
    },
    closing: {
      title: "Let's talk",
      text: "I'm open to full stack roles, remote or hybrid, and freelance projects.",
      email: "Send an e-mail",
      cvLabel: "Resume (PDF)",
      qr: "Point your camera here to open my LinkedIn",
      site: "vinicius-fontanella.vercel.app",
    },
    hero: {
      name: "Vinícius Fontanella Kleis",
      role: "Full stack developer",
      intro: "I build systems that talk to customers, payments and AI. Instead of a long text about me, ask what you're curious about in the chat.",
      cv: "Download resume",
      cvHref: "/cv/resume-vinicius-fontanella-kleis.pdf",
      available: "Open to new opportunities",
      photoAlt: "Photo of Vinícius",
    },
    chat: {
      intro: ["Hi! I'm Vinícius 👋", "Pick a question and I'll tell you. Go wherever you like."],
      start: ["about", "projects", "hardest", "work", "hire"],
      topics: {
        about: {
          q: "How did you get into programming?",
          a: [
            "I started with Python at 23, practicing every day.",
            "My first job in tech was an internship looking after Oracle databases. Then I moved to operations planning, where I automated processes and built Power BI dashboards.",
            "Since June 2026 I've been a full stack developer. I went from the data all the way to the screen.",
          ],
          next: ["stack", "work"],
        },
        work: {
          q: "Where do you work now?",
          a: [
            "I'm a full stack developer (contractor) at Volúpia Digital / Infoprotect in Brazil.",
            "I work on four SaaS products in production: a CRM with AI answering on WhatsApp, a platform for agencies integrated with Meta, an online learning platform and a blog content platform.",
          ],
          links: [{ label: "See the products", href: "#work" }],
          next: ["hardest", "stack"],
        },
        projects: {
          q: "What have you built?",
          a: [
            "I have three open source projects on GitHub, and you can try two of them right now.",
            "Relay is an AI agent for WhatsApp: it answers from the business's knowledge base and calls a person when it doesn't know.",
            "HelpDesk is a ticket system for many companies, with SLA deadlines and AI helping with triage.",
            "And there's a store with Mercado Pago checkout: Pix, card and boleto.",
          ],
          links: [
            { label: "Try Relay", href: LINKS.relayDemo },
            { label: "See the projects", href: "#projects" },
          ],
          next: ["relay", "hardest"],
        },
        relay: {
          q: "How does Relay work inside?",
          a: [
            "A message arrives through the WhatsApp webhook and goes into a queue in PostgreSQL, so the webhook answers fast and nothing is lost if something fails.",
            "The AI only gets the parts of the knowledge base that answer the question, and it isn't allowed to make things up.",
            "If the customer asks for a person, wants to book or asks something not covered, the conversation goes to the team, who follow everything live.",
          ],
          links: [{ label: "Code on GitHub", href: `${LINKS.github}/whatsapp-ai-agent` }],
          next: ["stack", "hire"],
        },
        hardest: {
          q: "What's the hardest problem you've solved?",
          a: [
            "A clinic using our CRM stopped getting AI replies overnight. Almost every new conversation was paused within seconds.",
            "I dug into production data and found it: the clinic's scheduling system sent automated messages from the same number, and they were recorded as if a human agent had taken over.",
            "I fixed the rule, tested it with the real messages and re-enabled the conversations. The AI went from 2–6 replies a day back to over 150.",
          ],
          links: [{ label: "More stories", href: "#stories" }],
          next: ["more", "work"],
        },
        more: {
          q: "Got another story?",
          a: [
            "Sure! On the agency platform, Instagram metrics stopped arriving silently after a Meta API change. I isolated every call so one failure couldn't break the rest, then ran the app review with Meta.",
            "And on a learning platform, I migrated about 7,000 students from another system, checking the data before and after the switch.",
          ],
          links: [{ label: "Read the stories", href: "#stories" }],
          next: ["hire"],
        },
        stack: {
          q: "What do you work with?",
          a: [
            "Day to day: React and TypeScript on the screen, Node.js and PostgreSQL (often through Supabase) on the server.",
            "I integrate a lot with outside APIs: WhatsApp, Instagram and Meta ads, Mercado Pago, Stripe and e-invoicing.",
            "And I use AI (Claude and OpenAI) inside the products and in the way I work.",
          ],
          next: ["projects", "hire"],
        },
        hire: {
          q: "How can I reach you?",
          a: [
            "I'm open to full stack roles, remote or hybrid, and freelance projects. My English is advanced.",
            "E-mail is the fastest way. I also answer on LinkedIn.",
          ],
          links: [
            { label: "Send an e-mail", href: `mailto:${LINKS.email}` },
            { label: "LinkedIn", href: LINKS.linkedin },
            { label: "Resume (PDF)", href: "/cv/resume-vinicius-fontanella-kleis.pdf" },
          ],
        },
      },
      labels: {
        typing: "typing…",
        restart: "Start over",
        pick: "Questions",
        done: "You've seen it all! Scroll down to look at the projects at your own pace.",
        me: "Vinícius",
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Built by me, open source on GitHub.",
      repoLabel: "Code",
      demoLabel: "Try it live",
      moreLabel: "More details",
      items: [
        {
          id: "relay",
          tab: "Relay",
          name: "Relay: WhatsApp AI agent",
          summary: "Answers a business's WhatsApp from its own knowledge base and hands the conversation to a person when it can't help.",
          highlights: ["The team sees everything live and can take over at any moment", "Comes with a simulated phone, so you can try it without WhatsApp"],
          more: [
            "The AI only gets the parts of the knowledge base that answer the question and is told not to make things up.",
            "Official WhatsApp webhook with signature checks, and a queue in PostgreSQL with retries and no duplicate messages.",
            "Automated tests, CI and Docker.",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Claude API", "WhatsApp Cloud API"],
          repo: `${LINKS.github}/whatsapp-ai-agent`,
          demo: LINKS.relayDemo,
          images: relayImages,
        },
        {
          id: "helpdesk",
          tab: "HelpDesk",
          name: "HelpDesk",
          summary: "A ticket system for many companies, with SLA deadlines and an AI that suggests category, priority and a first reply.",
          highlights: ["Each company only sees its own data", "Customer replies, internal notes and a history of who changed what"],
          more: [
            "The deadline stops when a ticket is resolved and restarts if it's reopened.",
            "The AI only suggests: the agent reviews before applying, nothing is sent on its own.",
            "Automated tests and CI, with a real PostgreSQL running in the tests.",
          ],
          stack: ["React", "TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "Claude API"],
          repo: `${LINKS.github}/helpdesk`,
          demo: LINKS.helpdeskDemo,
          images: helpdeskImages,
        },
        {
          id: "store",
          tab: "Store",
          name: "Online store with Mercado Pago",
          summary: "A storefront built in one day: catalog, cart and checkout with Pix, card and boleto.",
          highlights: ["Prices are always read on the server, never from the browser", "Payment notifications have their signature checked"],
          more: [
            "Serverless functions on Cloudflare Pages create the Mercado Pago payment.",
            "I fixed a flaw in the first version where you could edit the request and pay any price you wanted.",
            "Automated price and signature tests on GitHub Actions.",
          ],
          stack: ["JavaScript", "Cloudflare Pages Functions", "Mercado Pago"],
          repo: `${LINKS.github}/online-store-mercadopago`,
          images: storeImages,
        },
      ],
    },
    work: {
      title: "At work",
      subtitle: "Products in production that I work on today. The code belongs to the company, so here is what I do on each.",
      items: [
        { name: "Plotado", what: "A CRM for small businesses, with AI answering customers on WhatsApp.", role: "AI agents, WhatsApp webhooks, billing and the database." },
        { name: "X-Flow", what: "Management for marketing agencies, connected to Facebook, Instagram and ads.", role: "Integration with the Meta APIs and Meta's app review." },
        { name: "EngraxaMente", what: "An online learning platform with exams, certificates and AI-suggested paths.", role: "Dashboards and reports, certificates, AI and the student migration." },
        { name: "FastBlog", what: "A platform that writes and publishes blog content for businesses.", role: "Payments, e-invoices and backend functions." },
      ],
    },
    stories: {
      title: "Stories",
      subtitle: "Real problems I solved, without client data.",
      readLabel: "Read the story",
      items: [
        {
          title: "The AI that stopped answering",
          teaser: "Overnight, almost every conversation at a clinic was paused within seconds.",
          before: { label: "Before", value: "2 to 6 AI replies a day", pct: 4 },
          after: { label: "After", value: "over 150 a day", pct: 100 },
          story: [
            "A clinic uses our CRM with an AI answering patients on WhatsApp. One day the replies nearly vanished: the AI was sending 2 to 6 messages a day, when normal was over a hundred.",
            "In production data I saw conversations being paused seconds after they opened, as if an agent had taken over. Nobody had. The clinic's scheduling system sent automated reminders from the same number, and our webhook read them as a human joining the conversation.",
            "I changed the rule to recognize those automated messages, covered it with tests using the real messages and re-enabled the affected conversations. Replies went back to over 150 a day, without the AI talking over a real agent.",
          ],
          tags: ["Webhooks", "Edge Functions", "AI", "Testing"],
        },
        {
          title: "The Instagram metrics that disappeared",
          teaser: "A Meta API change made data collection stop without any visible error.",
          before: { label: "Before", value: "collection stopped, no error on screen", pct: 6 },
          after: { label: "After", value: "stable collection and the app sent to Meta's review", pct: 100 },
          story: [
            "On a platform for agencies, Instagram numbers simply stopped arriving. Nothing showed an error: collection was failing silently.",
            "Meta had changed which metrics it accepted. I adjusted what we asked for and separated every call, so one failure couldn't take down the whole run. Expired tokens now ask to reconnect instead of failing quietly.",
            "Then I ran the app review with Meta: a video for each permission, the descriptions and the data questionnaire.",
          ],
          tags: ["Meta Graph API", "OAuth", "Integrations"],
        },
        {
          title: "Seven thousand students at once",
          teaser: "Bringing students over from another platform without anyone losing access.",
          before: { label: "Before", value: "no students on the new platform", pct: 2 },
          after: { label: "After", value: "about 7,000 students migrated with access", pct: 100 },
          story: [
            "A client wanted to leave an off-the-shelf course platform and have their own. The challenge was moving about 7,000 students without anyone losing access or history.",
            "I built the platform and the migration routine, checking the data before and after the switch. Migrated students kept seeing the courses from the old platform.",
          ],
          tags: ["PostgreSQL", "Data migration", "React"],
        },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        { role: "Full Stack Developer (Contractor)", company: "Volúpia Digital / Infoprotect", period: "Jun 2026 – present", summary: "SaaS products with AI, WhatsApp and Meta, from the database to the screen, plus production support." },
        { role: "Operations Planner", company: "Orbenk", period: "Oct 2025 – May 2026", summary: "Process automation, ETL and Power BI dashboards." },
        { role: "Database Intern", company: "Byseven", period: "Feb 2025 – Jul 2025", summary: "Oracle database support and data integration routines." },
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

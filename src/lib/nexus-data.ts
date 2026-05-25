export interface Product {
  n: string; // "01"
  module: string;
  moduleN: string; // "01"
  moduleSlug: "cultura" | "pessoas" | "conhecimento" | "comunidade" | "governanca";
  name: string;
  alt: string;
  concept: string;
  objective: string;
  rationale: string;
  tension: string;
  market: string;
  implant: string; // R$ Xk
  monthly: string;
  nexus: string;
  savings: string;
  savingsValue: number; // for bar proportion (in k)
  image: string;
  caption: string;
}

export const FALLBACK_IMAGES: Record<Product["moduleSlug"], string> = {
  cultura: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1400&q=80",
  pessoas: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1400&q=80",
  conhecimento: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80",
  comunidade: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80",
  governanca: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80",
};

export const products: Product[] = [
  {
    n: "01", moduleN: "01", module: "Cultura",
    moduleSlug: "cultura", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Cultura que se escreve para ser vivida",
    name: "Nosso Jeito de Ser",
    alt: "CODEX / MANIFESTO VIVO",
    concept: "Hub interativo de identidade cultural — propósito, valores e manifesto do grupo. Não é PDF: é experiência navegável, pesquisável e viva, acessível a qualquer colaborador a qualquer tempo.",
    objective: "Criar o endereço digital permanente da cultura do grupo — onde o propósito é consultado, não apenas lembrado.",
    rationale: "Em empresas de alto padrão, a cultura é o diferencial mais difícil de replicar. Mas ela só diferencia se for operável — não apenas declarada.",
    tension: "A distância entre o que a organização declara e o que pratica no dia a dia.",
    market: "Culture Amp · Lattice",
    implant: "R$ 120k", monthly: "R$ 12k/mês", nexus: "R$ 0,9k",
    savings: "R$ 426k", savingsValue: 426,
  },
  {
    n: "02", moduleN: "02", module: "Pessoas",
    moduleSlug: "pessoas", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&fit=crop&crop=entropy",
    caption: "O primeiro dia é o único dia em que tudo é possível",
    name: "All Aboard",
    alt: "RITO DE CHEGADA / PORTAL DE PASSAGEM",
    concept: "Plataforma editorial de onboarding — jornada imersiva para novos colaboradores com checklist cultural, narrativa de boas-vindas e apresentação do ecossistema Newe.",
    objective: "Arquitetar o primeiro contato do colaborador com a cultura — transformando a entrada em rito simbólico e funcional.",
    rationale: "O primeiro dia de trabalho é o momento de maior abertura psicológica. Empresas que não o arquitetam desperdiçam a única janela onde a cultura é recebida sem resistência.",
    tension: "O onboarding genérico que trata chegada como burocracia, não como ritual de pertencimento.",
    market: "BambooHR · Workday Onboarding",
    implant: "R$ 90k", monthly: "R$ 8k/mês", nexus: "R$ 0,9k",
    savings: "R$ 314k", savingsValue: 314,
  },
  {
    n: "03", moduleN: "02", module: "Pessoas",
    moduleSlug: "pessoas", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Merecimento que se vê, não que se interpreta",
    name: "PAR 2026",
    alt: "MOTOR DE MERECIMENTO / REMUNERAÇÃO TRANSPARENTE",
    concept: "Plataforma executiva de gestão do Programa de Participação Anual nos Resultados — acompanhamento de metas, indicadores e cálculo de PLR com auditabilidade e transparência.",
    objective: "Tornar a remuneração variável um instrumento de engajamento estratégico — não uma surpresa semestral.",
    rationale: "A PLR é o mecanismo de maior impacto na percepção de equidade. Quando opaca, gera desconfiança. Quando transparente, gera comprometimento com resultado.",
    tension: "A caixa-preta da remuneração variável — onde colaboradores recebem o resultado como loteria, não como consequência de seu desempenho.",
    market: "SAP SuccessFactors · Mercer Workforce",
    implant: "R$ 220k", monthly: "R$ 22k/mês", nexus: "R$ 0,9k",
    savings: "R$ 835k", savingsValue: 835,
  },
  {
    n: "04", moduleN: "02", module: "Pessoas",
    moduleSlug: "pessoas", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Decidir bem é uma disciplina, não um talento",
    name: "Decidir com Intenção",
    alt: "MESA DE DECISÃO / AGENCY OS",
    concept: "Sistema de inteligência decisória para seleção de fornecedores estratégicos — scorecards ponderados por estratégia, custo, capacidade e risco.",
    objective: "Estruturar decisões de alto valor com critério documentado, eliminando viés e criando accountability no processo decisório executivo.",
    rationale: "Decisões estratégicas — como a escolha de uma agência de branding — costumam ser tomadas por impressão. Este sistema transforma julgamento em método auditável.",
    tension: "A intuição não documentada como método decisório em escolhas que impactam milhões de reais.",
    market: "Gartner Peer Insights · Consultoria + SaaS Procurement",
    implant: "R$ 60k", monthly: "R$ 6k/mês", nexus: "R$ 0,9k",
    savings: "R$ 213k", savingsValue: 213,
  },
  {
    n: "05", moduleN: "03", module: "Conhecimento",
    moduleSlug: "conhecimento", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Líderes não se encontram. São forjados.",
    name: "Academia de Líderes Newe",
    alt: "FORJA / ESCOLA DE COMANDO",
    concept: "Sistema editorial de trilhas de desenvolvimento de liderança alinhadas à cultura Newe e à visão do Urbanismo Integrativo — conteúdos curados e jornadas de capacitação proprietárias.",
    objective: "Formar líderes que pensam, falam e decidem dentro do sistema de valores do grupo — não líderes genéricos de frameworks universais.",
    rationale: "Líderes formados por plataformas genéricas produzem liderança genérica. A formação precisa ser proprietária, contextual e conectada ao propósito do grupo.",
    tension: "A terceirização da formação que produz gestores competentes no abstrato e desconectados do concreto do grupo.",
    market: "Cornerstone OnDemand · Docebo LMS",
    implant: "R$ 140k", monthly: "R$ 14k/mês", nexus: "R$ 0,9k",
    savings: "R$ 526k", savingsValue: 526,
  },
  {
    n: "06", moduleN: "03", module: "Conhecimento",
    moduleSlug: "conhecimento", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Vender o modo de habitar, não o metro quadrado",
    name: "Academia de Vendas Newe",
    alt: "ESCOLA DO COMPRADOR / CONSULTORES DE OBRA",
    concept: "Plataforma de formação editorial para consultores de imóveis de alto padrão — método, argumentação de valor, leitura de urbanismo e curadoria sob o sistema Newe.",
    objective: "Formar consultores capazes de vender projeto de vida — não produto imobiliário. A diferença está na profundidade do argumento e na leitura do comprador premium.",
    rationale: "No mercado de alto padrão, o consultor não vende o imóvel — vende o modo de habitar. A formação precisa estar à altura do que é vendido.",
    tension: "O treinamento genérico de vendas que não prepara para a complexidade filosófica e estética do comprador de luxo.",
    market: "TOTVS · Salesforce Trailhead · Academia CIJ",
    implant: "R$ 80k", monthly: "R$ 9k/mês", nexus: "R$ 0,9k",
    savings: "R$ 313k", savingsValue: 313,
  },
  {
    n: "07", moduleN: "04", module: "Comunidade",
    moduleSlug: "comunidade", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Uma empresa são as pessoas que ela consegue manter próximas",
    name: "HYNstaNewe",
    alt: "ALMANAQUE VIVO / REDE DE GENTE",
    concept: "Rede social interna do grupo — perfis de pessoas, histórias, conexões e pertencimento. A inteligência relacional do grupo materializada em produto digital próprio.",
    objective: "Transformar o grupo em comunidade com nome e história — onde pessoas se conhecem, se reconhecem e percebem a rede humana que as sustenta.",
    rationale: "Em organizações que crescem, as pessoas param de se conhecer. A proximidade que existe no time de 15 precisa ser arquitetada quando o time chega a 50, 100, 200.",
    tension: "O anonimato interno que cresce com a empresa — onde colegas são estranhos e a cultura vira abstração.",
    market: "Microsoft Viva Engage · Workplace by Meta",
    implant: "R$ 60k", monthly: "R$ 5k/mês", nexus: "R$ 0,9k",
    savings: "R$ 199k", savingsValue: 199,
  },
  {
    n: "08", moduleN: "04", module: "Comunidade",
    moduleSlug: "comunidade", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Toda estrutura é um argumento sobre como as pessoas devem se relacionar",
    name: "Habitar a Estrutura",
    alt: "TOPOGRAFIA HUMANA / MAPA DE PODER",
    concept: "Organograma executivo interativo e animado — não apenas hierarquia, mas arquitetura de responsabilidade e narrativa institucional das lideranças do grupo.",
    objective: "Transformar a estrutura organizacional em narrativa — quem somos, o que cada pessoa representa, como nos organizamos para executar o propósito.",
    rationale: "Para uma empresa de urbanismo, o organograma deveria ser tratado como planta arquitetônica — com rigor, beleza e função. Estrutura é produto.",
    tension: "A percepção de que hierarquia é distância. O diagrama burocrático que afasta ao invés de orientar.",
    market: "ChartHop · OrgWeaver · Lucidchart Enterprise",
    implant: "R$ 30k", monthly: "R$ 4k/mês", nexus: "R$ 0,9k",
    savings: "R$ 141k", savingsValue: 141,
  },
  {
    n: "09", moduleN: "05", module: "Governança",
    moduleSlug: "governanca", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=80&fit=crop&crop=entropy",
    caption: "Marca não é logo. É a gramática de tudo que você faz.",
    name: "Plataforma de Marca",
    alt: "GRAMÁTICA VIVA / CONSTITUIÇÃO DA MARCA",
    concept: "Brand Book digital e interativo — metodologia É, FAZ E FALA, tokens de design, identidade visual, arquitetura verbal e toolkit estratégico para uso interno e externo.",
    objective: "Criar a constituição visual e verbal da Newe — o que rege tudo que sai com nossa assinatura. Consistência independente de quem executa.",
    rationale: "Uma marca de alto padrão não pode depender do critério individual de quem cria. Aqui, qualquer agência ou colaborador tem acesso ao DNA completo da Newe.",
    tension: "A marca que muda de tom conforme o prestador — o brand deck em PDF que ninguém lê, a identidade que existe só na cabeça de quem a criou.",
    market: "Frontify · Bynder · Zeroheight",
    implant: "R$ 140k", monthly: "R$ 5k/mês", nexus: "R$ 20k",
    savings: "R$ 270k", savingsValue: 270,
  },
  {
    n: "10", moduleN: "05", module: "Governança",
    moduleSlug: "governanca", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80&fit=crop&crop=entropy",
    caption: "O que não está escrito não existe. O que não tem endereço se perde.",
    name: "HUB Hyndra",
    alt: "CONSTITUIÇÃO DO GRUPO / REPOSITÓRIO VIVO",
    concept: "Repositório institucional de políticas, SOPs, fluxogramas e documentos corporativos com versionamento, fluxo de aprovação e auditabilidade — fonte única e viva da governança.",
    objective: "Criar a memória institucional estruturada do grupo — onde toda política tem dono, versão, data e trilha de aprovação documentada.",
    rationale: "Governança que vive em arquivos espalhados por e-mail e Drive não é governança — é arqueologia. O HUB cria o endereço permanente das regras que regem o grupo.",
    tension: "A empresa que cresce sem memória institucional — onde cada novo colaborador reinventa a roda porque o conhecimento não tem endereço fixo.",
    market: "Confluence · Microsoft SharePoint · Notion Enterprise",
    implant: "R$ 60k", monthly: "R$ 4k/mês", nexus: "R$ 10k",
    savings: "R$ 170k", savingsValue: 170,
  },
];

export const altNames = [
  { current: "Nosso Jeito de Ser", alt: "CODEX", rationale: "Um código fundador tem peso de lei, não de inspiração." },
  { current: "All Aboard", alt: "RITO DE CHEGADA", rationale: "Toda cultura séria tem ritos de passagem — esse é o nosso." },
  { current: "PAR 2026", alt: "MOTOR DE MERECIMENTO", rationale: "Transforma a PLR em narrativa de equidade." },
  { current: "Decidir com Intenção", alt: "MESA DE DECISÃO", rationale: "Sala de poder, não de formulário." },
  { current: "Academia de Líderes Newe", alt: "FORJA", rationale: "Uma palavra. Aqui você não aprende — você é transformado." },
  { current: "Academia de Vendas Newe", alt: "ESCOLA DO COMPRADOR", rationale: "Quem entende o comprador de luxo vende diferente." },
  { current: "HYNstaNewe", alt: "ALMANAQUE VIVO", rationale: "Profundidade, não feed. Registro de quem somos." },
  { current: "Habitar a Estrutura", alt: "TOPOGRAFIA HUMANA", rationale: "Organograma como mapa do território — perfeito para urbanismo." },
  { current: "Plataforma de Marca", alt: "GRAMÁTICA VIVA", rationale: "Marca como língua — com vocabulário, sintaxe e regras." },
  { current: "HUB Hyndra", alt: "CONSTITUIÇÃO DO GRUPO", rationale: "Repositório de políticas como carta magna institucional." },
];

export const modules = [
  { n: "01", name: "Cultura", desc: "1 produto · identidade fundacional" },
  { n: "02", name: "Pessoas", desc: "3 produtos · jornada & remuneração" },
  { n: "03", name: "Conhecimento", desc: "2 produtos · formação & capacitação" },
  { n: "04", name: "Comunidade", desc: "2 produtos · pertencimento & marca" },
  { n: "05", name: "Governança", desc: "2 produtos · compliance & estrutura" },
];

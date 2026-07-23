import type { Venue } from "@/types";
import { buildPublicLocation } from "@/lib/geo";

// `rules` (Regras do Local) é um objeto `ListingRules` — nunca uma lista de
// texto solto. Cada campo vem com `status` (permitido/proibido/restrito/
// nao_informado) e, quando fizer sentido, `detail` (informação objetiva
// curta) e `description` (texto opcional mais longo). Categorias inteiras
// ou campos sem informação real são simplesmente omitidos do objeto — a UI
// (VenueRulesSection) nunca inventa "Permitido" nem "Não informado" para
// algo que não veio do cadastro do local. Estrutura pensada para virar,
// futuramente, um formulário editável no painel do proprietário (ver
// types/index.ts).

// Dados demonstrativos. Cobertura: Rio de Janeiro, cidade inteira (PRD Cap. 2, 2.5) —
// bairros variados de propósito, nunca restritos a uma única região.
// Nenhum local possui campo de avaliação: funcionalidade pós-MVP (Design System Cap. 9).
//
// `publicLocation` é gerada por buildPublicLocation() (lib/geo.ts) a partir
// do centro do bairro — são coordenadas públicas de demonstração, nunca o
// endereço real de nenhum imóvel (mapa aproximado — prompt de melhorias
// sobre localização). Os campos privados (realLatitude/realLongitude/
// fullAddress) do tipo Venue ficam propositalmente ausentes aqui.
export const venues: Venue[] = [
  {
    id: "1",
    slug: "casa-jardim-do-recreio",
    name: "Casa Jardim do Recreio",
    shortDescription: "Casa ampla com piscina e área gourmet, a poucos minutos da praia.",
    fullDescription:
      "Uma casa aconchegante com quintal arborizado, ideal para aniversários e confraternizações em família. A piscina grande e a área gourmet coberta garantem conforto mesmo em dias quentes ou chuvosos. Cozinha totalmente equipada para facilitar o serviço de buffet ou catering. Estacionamento privativo para até 8 carros.",
    neighborhood: "Recreio dos Bandeirantes",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Recreio dos Bandeirantes",
      seed: "casa-jardim-do-recreio",
      density: "urbano",
    }),
    category: "casa-piscina",
    recommendedEvents: ["aniversario", "confraternizacao", "festa-infantil"],
    capacityMin: 30,
    capacityMax: 90,
    startingPrice: 1800,
    amenityIds: ["piscina", "churrasqueira", "estacionamento", "cozinha", "area-infantil", "wifi"],
    rules: {
      operatingHours: {
        allowedHours: { status: "permitido", detail: "9h às 22h" },
        extraHours: { status: "restrito", detail: "Mediante consulta, sujeito a disponibilidade e taxa adicional" },
      },
      music: {
        musicAllowed: {
          status: "permitido",
          detail: "Permitida até 22h",
          description: "Som ambiente e DJ liberados; após esse horário, apenas volume baixo.",
        },
        volumeLimit: { status: "restrito", detail: "Reduzir volume após 22h por respeito à vizinhança" },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
        kitchenAvailable: { status: "permitido", detail: "Cozinha equipada disponível" },
        barbecue: { status: "permitido", detail: "Churrasqueira disponível para uso" },
      },
      decoration: {
        decorationAllowed: { status: "permitido", detail: "Liberada, sem restrição de tema" },
        candles: { status: "restrito", detail: "Apenas em suportes seguros, longe de cortinas e vegetação" },
      },
      children: {
        allowed: { status: "permitido", detail: "Bem-vindas", description: "Área infantil disponível no quintal." },
      },
      pets: {
        allowed: { status: "restrito", detail: "Pequeno porte, mediante consulta prévia" },
      },
      parking: {
        spots: { status: "permitido", detail: "8 vagas privativas" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
      additionalRules: "Não é permitido fumar em áreas cobertas.",
    },
    features: [
      { id: "piscina", name: "Piscina", category: "estrutura", status: "included" },
      { id: "area-infantil", name: "Área infantil", category: "estrutura", status: "included", description: "Espaço reservado no quintal." },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included" },
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included", description: "8 vagas privativas." },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional", description: "Contratação opcional." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional", description: "Disponível sob consulta." },
      { id: "recreacao-infantil", name: "Recreação infantil", category: "servicos", status: "optional", description: "Monitores para a área infantil." },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "optional", description: "Recomendada para eventos maiores, sob consulta." },
      { id: "palco", name: "Palco", category: "estrutura", status: "unavailable" },
      { id: "sistema-som", name: "Sistema de som", category: "tecnologia", status: "unavailable", description: "A locação não inclui equipamento de som." },
      { id: "gerador", name: "Gerador", category: "logistica", status: "unavailable" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=1200&q=80",
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1200&q=80",
    ],
    featured: true,
    verified: true,
    demoAvailability: "disponivel",
  },
  {
    id: "2",
    slug: "sitio-vista-serra",
    name: "Sítio Vista Serra",
    shortDescription: "Sítio amplo com vista para as montanhas, perfeito para churrascos e retiros.",
    fullDescription:
      "Localizado em uma região tranquila de Jacarepaguá, este sítio oferece um amplo local verde com churrasqueira de alvenaria, campo de futebol e trilhas curtas. Ambiente ideal para confraternizações de empresa, aniversários grandes e encontros de família que buscam contato com a natureza sem sair da cidade.",
    neighborhood: "Jacarepaguá",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Jacarepaguá",
      seed: "sitio-vista-serra",
      density: "suburbano",
    }),
    category: "sitio",
    recommendedEvents: ["churrasco", "confraternizacao", "aniversario"],
    capacityMin: 50,
    capacityMax: 200,
    startingPrice: 2400,
    amenityIds: ["churrasqueira", "estacionamento", "jardim", "area-coberta", "gerador"],
    rules: {
      operatingHours: {
        allowedHours: { status: "permitido", detail: "10h às 23h" },
        maxEndTime: { status: "permitido", detail: "Encerramento até 23h" },
      },
      music: {
        musicAllowed: {
          status: "permitido",
          detail: "Liberada até 23h",
          description: "Ambiente amplo e aberto, ideal para som mais alto sem incomodar vizinhos.",
        },
      },
      decoration: {
        decorationAllowed: { status: "permitido", detail: "Livre, qualquer tema" },
        fireworks: { status: "proibido", detail: "Não é permitido uso de fogos de artifício" },
      },
      food: {
        barbecue: { status: "permitido", detail: "Churrasqueira de alvenaria disponível" },
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      children: {
        allowed: {
          status: "permitido",
          detail: "Bem-vindas",
          description: "Espaço amplo e aberto; recomendamos supervisão dos responsáveis.",
        },
      },
      pets: {
        allowed: { status: "permitido", detail: "Bem-vindos", description: "Ambiente aberto e arborizado." },
      },
      cleaning: {
        included: { status: "permitido", detail: "Limpeza inclusa na locação" },
      },
      parking: {
        spots: { status: "permitido", detail: "Estacionamento amplo no local" },
      },
    },
    features: [
      { id: "area-externa", name: "Área externa", category: "estrutura", status: "included", description: "Amplo jardim e área verde." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included", description: "Churrasqueira de alvenaria." },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "gerador", name: "Gerador", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "banda", name: "Banda ao vivo", category: "servicos", status: "optional", description: "Espaço aberto, ideal para banda ao vivo." },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "optional", description: "Contratação opcional." },
      { id: "limpeza-adicional", name: "Limpeza adicional", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "unavailable", description: "Ambiente aberto, sem climatização artificial." },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "unavailable", description: "Sinal de internet limitado na região." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1200&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80",
      "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
    ],
    featured: true,
    verified: true,
    demoAvailability: "poucas-datas",
  },
  {
    id: "3",
    slug: "chacara-recanto-verde",
    name: "Chácara Recanto Verde",
    shortDescription: "Chácara com piscina, quiosque e amplo salão coberto para grandes celebrações.",
    fullDescription:
      "Local completo para eventos de médio e grande porte, com salão coberto climatizado, piscina adulto e infantil, quiosque com churrasqueira e uma extensa área verde. Muito procurada para festas de 15 anos, casamentos informais e confraternizações corporativas.",
    neighborhood: "Vargem Grande",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Vargem Grande",
      seed: "chacara-recanto-verde",
      density: "rural",
    }),
    category: "chacara",
    recommendedEvents: ["aniversario", "confraternizacao", "noivado"],
    capacityMin: 80,
    capacityMax: 250,
    startingPrice: 3200,
    amenityIds: ["piscina", "churrasqueira", "estacionamento", "area-coberta", "salao-jogos", "gerador"],
    rules: {
      operatingHours: {
        setupTime: { status: "restrito", detail: "Mediante agendamento prévio de visita técnica" },
      },
      music: {
        musicAllowed: { status: "permitido", detail: "Liberada, com bom senso de volume" },
      },
      food: {
        externalCatering: { status: "restrito", detail: "Buffet próprio ou terceirizado mediante aprovação" },
      },
      suppliers: {
        ownSuppliersAllowed: { status: "restrito", detail: "Permitido mediante aprovação prévia da administração" },
      },
      children: {
        allowed: {
          status: "permitido",
          detail: "Bem-vindas",
          description: "Piscina infantil e salão de jogos disponíveis.",
        },
      },
      capacity: {
        seated: { status: "nao_informado" },
        standing: { status: "nao_informado" },
      },
      additionalRules: "Necessário agendamento de visita prévia antes da confirmação da locação.",
    },
    features: [
      { id: "piscina", name: "Piscina", category: "estrutura", status: "included", description: "Piscina adulto e infantil." },
      { id: "salao", name: "Salão coberto", category: "estrutura", status: "included", description: "Salão coberto e climatizado." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "gerador", name: "Gerador", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Mediante aprovação prévia da administração." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "recreacao-infantil", name: "Recreação infantil", category: "servicos", status: "optional", description: "Monitores para o salão de jogos e a piscina." },
      { id: "cerimonialista", name: "Cerimonialista", category: "servicos", status: "optional" },
      { id: "camarim", name: "Camarim", category: "estrutura", status: "unavailable" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "unknown" },
    ],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1200&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=1200&q=80",
      "https://images.unsplash.com/photo-1591825381624-8c94b1c67052?w=1200&q=80",
      "https://images.unsplash.com/photo-1519874179825-3c0b8b6c0a2e?w=1200&q=80",
      "https://images.unsplash.com/photo-1560184611-33bcbeeaacba?w=1200&q=80",
    ],
    featured: true,
    verified: false,
    demoAvailability: "disponivel",
  },
  {
    id: "4",
    slug: "salao-jardim-tijuca",
    name: "Salão Jardim Tijuca",
    shortDescription: "Salão de festas climatizado no coração da Tijuca, com decoração neutra.",
    fullDescription:
      "Salão fechado e climatizado, com decoração neutra que combina com qualquer tema de festa. Localização privilegiada na Tijuca, próximo a estações de metrô e fácil acesso para convidados de diferentes regiões da cidade. Ideal para festas infantis, chá revelação e aniversários de adultos.",
    neighborhood: "Tijuca",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Tijuca",
      seed: "salao-jardim-tijuca",
      density: "urbano-denso",
    }),
    category: "salao",
    recommendedEvents: ["festa-infantil", "cha-revelacao", "aniversario"],
    capacityMin: 40,
    capacityMax: 120,
    startingPrice: 1500,
    amenityIds: ["area-infantil", "cozinha", "wifi", "banheiros", "estacionamento"],
    rules: {
      operatingHours: {
        allowedHours: { status: "permitido", detail: "Duração padrão de 5 horas" },
        teardownTime: {
          status: "permitido",
          detail: "Até 1h após o evento",
          description: "Prazo para remoção da decoração e desmontagem.",
        },
      },
      music: {
        musicAllowed: {
          status: "permitido",
          detail: "Som ambiente liberado",
          description: "Ambiente fechado e climatizado; evitar volume excessivo.",
        },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      decoration: {
        decorationAllowed: { status: "permitido", detail: "Liberada, sem restrição de tema" },
      },
      children: {
        allowed: {
          status: "permitido",
          detail: "Bem-vindas",
          description: "Decoração neutra do salão combina com festas infantis e chá revelação.",
        },
      },
      parking: {
        spots: { status: "permitido", detail: "Estacionamento próprio no local" },
      },
    },
    features: [
      { id: "salao", name: "Salão", category: "estrutura", status: "included", description: "Salão fechado e climatizado." },
      { id: "area-infantil", name: "Área infantil", category: "estrutura", status: "included", description: "Espaço para recreação infantil." },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "included" },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional", description: "Contratação opcional." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "recreacao-infantil", name: "Recreação infantil", category: "servicos", status: "optional" },
      { id: "sistema-som", name: "Sistema de som", category: "tecnologia", status: "optional", description: "Locação de equipamento sob consulta." },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "unavailable" },
      { id: "area-externa", name: "Área externa", category: "estrutura", status: "unavailable", description: "Espaço totalmente fechado, sem área externa." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=1200&q=80",
    ],
    featured: false,
    verified: true,
    demoAvailability: "disponivel",
  },
  {
    id: "5",
    slug: "espaco-gourmet-botafogo",
    name: "Local Gourmet Botafogo",
    shortDescription: "Local gourmet compacto e sofisticado, perfeito para eventos íntimos.",
    fullDescription:
      "Um local gourmet moderno em prédio residencial de Botafogo, com cozinha profissional, adega climatizada e vista para o Pão de Açúcar. Ideal para jantares de confraternização, aniversários pequenos e reuniões corporativas descontraídas, sem abrir mão da sofisticação.",
    neighborhood: "Botafogo",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Botafogo",
      seed: "espaco-gourmet-botafogo",
      density: "urbano-denso",
    }),
    category: "espaco-gourmet",
    recommendedEvents: ["confraternizacao", "aniversario", "noivado"],
    capacityMin: 15,
    capacityMax: 40,
    startingPrice: 900,
    amenityIds: ["cozinha", "wifi", "area-coberta", "banheiros"],
    rules: {
      condominium: {
        circulationRestrictions: {
          status: "permitido",
          detail: "Uso exclusivo do espaço gourmet",
          description: "Sem circulação em áreas comuns do condomínio.",
        },
      },
      music: {
        musicAllowed: { status: "permitido", detail: "Som ambiente permitido até 23h" },
        externalSoundSystem: { status: "proibido", detail: "Não é permitido uso de caixa de som externa/amplificada" },
      },
      food: {
        kitchenAvailable: { status: "permitido", detail: "Cozinha profissional disponível" },
        externalDrinks: { status: "permitido", detail: "Bebidas externas liberadas" },
      },
      children: {
        allowed: { status: "restrito", detail: "Permitidas com supervisão dos responsáveis" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included", description: "Cozinha profissional equipada." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included" },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "included" },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "included", description: "Prédio residencial com elevador." },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "bartender", name: "Bartender", category: "servicos", status: "optional" },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "dj", name: "DJ", category: "servicos", status: "optional", description: "Apenas som ambiente, conforme regras do condomínio." },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "unavailable" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "unavailable", description: "Prédio residencial sem vaga própria — consulte opções nas proximidades." },
      { id: "palco", name: "Palco", category: "estrutura", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1200&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    ],
    featured: false,
    verified: false,
    demoAvailability: "sob-consulta",
  },
  {
    id: "6",
    slug: "rooftop-vista-copacabana",
    name: "Rooftop Vista Copacabana",
    shortDescription: "Rooftop com vista panorâmica para o mar, ideal para eventos ao entardecer.",
    fullDescription:
      "Terraço no último andar de um edifício em Copacabana, com vista direta para o mar e pôr do sol privilegiado. Ambiente descolado, com iluminação de LED configurável e bar de apoio. Muito procurado para comemorações de aniversário, confraternizações de equipe e pequenos noivados.",
    neighborhood: "Copacabana",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Copacabana",
      seed: "rooftop-vista-copacabana",
      density: "urbano-denso",
    }),
    category: "rooftop",
    recommendedEvents: ["aniversario", "confraternizacao", "noivado"],
    capacityMin: 20,
    capacityMax: 100,
    startingPrice: 2200,
    amenityIds: ["wifi", "area-coberta", "banheiros"],
    rules: {
      operatingHours: {
        maxEndTime: { status: "permitido", detail: "Evento deve encerrar até a meia-noite" },
      },
      music: {
        musicAllowed: { status: "permitido", detail: "Liberada até o encerramento do evento (meia-noite)" },
      },
      decoration: {
        fireworks: { status: "proibido", detail: "Não é permitido uso de fogos ou sinalizadores" },
        smokeMachine: { status: "proibido", detail: "Não é permitido uso de máquina de fumaça" },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      children: {
        allowed: {
          status: "restrito",
          detail: "Permitidas com supervisão",
          description: "Terraço aberto — atenção redobrada com crianças pequenas.",
        },
      },
      condominium: {
        guestRegistration: {
          status: "permitido",
          detail: "Lista de convidados deve ser enviada à portaria com antecedência",
        },
      },
    },
    features: [
      { id: "area-externa", name: "Terraço", category: "estrutura", status: "included", description: "Terraço aberto com vista para o mar." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included", description: "Cobertura parcial do terraço." },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "iluminacao", name: "Iluminação", category: "tecnologia", status: "included", description: "Iluminação de LED configurável." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "bartender", name: "Bartender", category: "servicos", status: "optional", description: "Bar de apoio disponível mediante contratação." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "unavailable", description: "Sem vaga própria no edifício." },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "unavailable" },
      { id: "palco", name: "Palco", category: "estrutura", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
      "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=1200&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=1200&q=80",
    ],
    featured: true,
    verified: true,
    demoAvailability: "poucas-datas",
  },
  {
    id: "7",
    slug: "casa-vila-isabel",
    name: "Casa Vila Isabel",
    shortDescription: "Casa charmosa com quintal e varanda, próxima ao centro da cidade.",
    fullDescription:
      "Casa antiga reformada, preservando detalhes de época e com um quintal generoso nos fundos. A varanda ampla é perfeita para receber os convidados na chegada, e o quintal comporta mesas para almoços e jantares de família. Localização central facilita o acesso de quem vem de diferentes zonas da cidade.",
    neighborhood: "Vila Isabel",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Vila Isabel",
      seed: "casa-vila-isabel",
      density: "urbano-denso",
    }),
    category: "casa",
    recommendedEvents: ["aniversario", "confraternizacao", "cha-revelacao"],
    capacityMin: 25,
    capacityMax: 70,
    startingPrice: 1300,
    amenityIds: ["jardim", "cozinha", "estacionamento", "wifi"],
    rules: {
      operatingHours: {
        allowedHours: { status: "restrito", detail: "Silêncio a partir das 22h por respeito à vizinhança" },
      },
      music: {
        musicAllowed: { status: "restrito", detail: "Liberada com volume moderado até 22h" },
      },
      parking: {
        spots: { status: "restrito", detail: "Estacionamento limitado a 4 vagas" },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
        kitchenAvailable: { status: "permitido", detail: "Cozinha equipada disponível" },
      },
      children: {
        allowed: { status: "permitido", detail: "Bem-vindas" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "area-externa", name: "Quintal e varanda", category: "estrutura", status: "included", description: "Quintal amplo nos fundos e varanda na entrada." },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included", description: "4 vagas." },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "dj", name: "DJ", category: "servicos", status: "optional", description: "Volume moderado, conforme regras da vizinhança." },
      { id: "recreacao-infantil", name: "Recreação infantil", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "unavailable", description: "Casa antiga, sem climatização artificial." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
      { id: "gerador", name: "Gerador", category: "logistica", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
    ],
    featured: false,
    verified: false,
    demoAvailability: "disponivel",
  },
  {
    id: "8",
    slug: "chacara-guaratiba-sol",
    name: "Chácara Guaratiba Sol",
    shortDescription: "Chácara ampla com dois campos, piscina e estrutura para eventos grandes.",
    fullDescription:
      "Uma das maiores chácaras da região de Guaratiba, com dois campos de futebol society, piscina de borda infinita e um salão de festas coberto com capacidade para 300 pessoas. Estrutura completa de banheiros e vestiários, ideal para confraternizações de empresas e grandes aniversários.",
    neighborhood: "Guaratiba",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Guaratiba",
      seed: "chacara-guaratiba-sol",
      density: "rural",
    }),
    category: "chacara",
    recommendedEvents: ["confraternizacao", "aniversario", "churrasco"],
    capacityMin: 100,
    capacityMax: 300,
    startingPrice: 3800,
    amenityIds: ["piscina", "churrasqueira", "estacionamento", "area-coberta", "banheiros", "gerador"],
    rules: {
      operatingHours: {
        allowedHours: { status: "permitido", detail: "Locação mínima de 8 horas" },
      },
      security: {
        mandatorySecurity: {
          status: "restrito",
          detail: "Obrigatória para eventos acima de 150 pessoas",
          description: "Equipe de segurança própria contratada pelo locatário.",
        },
      },
      food: {
        barbecue: { status: "permitido", detail: "Estrutura de churrasqueira disponível" },
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      children: {
        allowed: {
          status: "permitido",
          detail: "Bem-vindas",
          description: "Campos de futebol e piscina disponíveis para recreação.",
        },
      },
      pets: {
        allowed: { status: "permitido", detail: "Bem-vindos", description: "Ambiente amplo e aberto." },
      },
      parking: {
        spots: { status: "permitido", detail: "Amplo estacionamento no local" },
      },
      capacity: {
        standing: { status: "nao_informado" },
      },
    },
    features: [
      { id: "piscina", name: "Piscina", category: "estrutura", status: "included", description: "Piscina de borda infinita." },
      { id: "salao", name: "Salão coberto", category: "estrutura", status: "included", description: "Salão coberto para até 300 pessoas." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included" },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included", description: "Banheiros e vestiários completos." },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "gerador", name: "Gerador", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "optional", description: "Obrigatória para eventos acima de 150 pessoas." },
      { id: "brigadista", name: "Brigadista", category: "servicos", status: "optional" },
      { id: "recreacao-infantil", name: "Recreação infantil", category: "servicos", status: "optional" },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "banda", name: "Banda ao vivo", category: "servicos", status: "optional" },
      { id: "camarim", name: "Camarim", category: "estrutura", status: "unavailable" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "unavailable", description: "Sinal de internet limitado na região." },
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
      "https://images.unsplash.com/photo-1601758228041-3caa4f39e3e8?w=1200&q=80",
    ],
    featured: false,
    verified: true,
    demoAvailability: "disponivel",
  },
  {
    id: "9",
    slug: "casa-piscina-barra",
    name: "Casa Piscina Barra Premium",
    shortDescription: "Casa de alto padrão com piscina aquecida e deck de madeira.",
    fullDescription:
      "Residência de alto padrão em condomínio fechado na Barra da Tijuca, com piscina aquecida, deck de madeira e área gourmet integrada. Perfeita para aniversários que buscam mais exclusividade e conforto, com segurança 24 horas do próprio condomínio.",
    neighborhood: "Barra da Tijuca",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Barra da Tijuca",
      seed: "casa-piscina-barra",
      density: "urbano",
    }),
    category: "casa-piscina",
    recommendedEvents: ["aniversario", "noivado", "confraternizacao"],
    capacityMin: 20,
    capacityMax: 60,
    startingPrice: 2900,
    amenityIds: ["piscina", "churrasqueira", "estacionamento", "cozinha", "deck", "wifi"],
    rules: {
      condominium: {
        circulationRestrictions: { status: "permitido", detail: "Acesso controlado pela portaria do condomínio" },
        guestRegistration: {
          status: "permitido",
          detail: "Lista de convidados deve ser enviada com antecedência",
        },
      },
      music: {
        musicAllowed: {
          status: "restrito",
          detail: "Permitida com volume controlado",
          description: "Conforme regras internas do condomínio.",
        },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
        kitchenAvailable: { status: "permitido", detail: "Área gourmet integrada disponível" },
      },
      children: {
        allowed: { status: "permitido", detail: "Bem-vindas" },
      },
      security: {
        includedSecurity: { status: "permitido", detail: "Segurança 24 horas do condomínio" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "piscina", name: "Piscina", category: "estrutura", status: "included", description: "Piscina aquecida com deck de madeira." },
      { id: "cozinha", name: "Área gourmet", category: "alimentacao", status: "included", description: "Área gourmet integrada." },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included" },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "included", description: "Segurança 24 horas do condomínio." },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "dj", name: "DJ", category: "servicos", status: "optional", description: "Volume controlado, conforme regras do condomínio." },
      { id: "bartender", name: "Bartender", category: "servicos", status: "optional" },
      { id: "cerimonialista", name: "Cerimonialista", category: "servicos", status: "optional" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable", description: "Casa térrea, sem necessidade de elevador." },
      { id: "palco", name: "Palco", category: "estrutura", status: "unavailable" },
      { id: "camarim", name: "Camarim", category: "estrutura", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcbf25?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80",
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1200&q=80",
    ],
    featured: true,
    verified: true,
    demoAvailability: "poucas-datas",
  },
  {
    id: "10",
    slug: "salao-festas-meier",
    name: "Salão de Festas Méier",
    shortDescription: "Salão amplo e bem localizado, com ótimo custo-benefício.",
    fullDescription:
      "Salão amplo no Méier, com pé-direito alto, boa ventilação natural e fácil acesso pela Linha 2 do metrô e principais avenidas da Zona Norte. Excelente opção para quem busca um local funcional, com bom custo-benefício, sem abrir mão de conforto e estrutura.",
    neighborhood: "Méier",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Méier",
      seed: "salao-festas-meier",
      density: "urbano-denso",
    }),
    category: "salao",
    recommendedEvents: ["aniversario", "festa-infantil", "confraternizacao"],
    capacityMin: 50,
    capacityMax: 150,
    startingPrice: 1100,
    amenityIds: ["cozinha", "banheiros", "estacionamento", "wifi"],
    rules: {
      operatingHours: {
        allowedHours: { status: "permitido", detail: "Locação por período de 6 horas" },
      },
      decoration: {
        decorationAllowed: {
          status: "permitido",
          detail: "Permitida, por conta do locatário",
          description: "O valor da locação não inclui serviço de decoração.",
        },
      },
      food: {
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      children: {
        allowed: { status: "permitido", detail: "Bem-vindas" },
      },
      parking: {
        spots: { status: "permitido", detail: "Estacionamento próprio no local" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "salao", name: "Salão", category: "estrutura", status: "included", description: "Pé-direito alto e boa ventilação natural." },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional", description: "Não inclui decoração — contratação à parte." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional" },
      { id: "limpeza-adicional", name: "Limpeza adicional", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "unavailable", description: "Ventilação natural, sem climatização artificial." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "unavailable" },
    ],
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1200&q=80",
      "https://images.unsplash.com/photo-1505322266913-eba3c8fbb2b3?w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
      "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1200&q=80",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
    ],
    featured: false,
    verified: false,
    demoAvailability: "disponivel",
  },
  {
    id: "11",
    slug: "sitio-nova-friburgo-mirim",
    name: "Sítio Nova Serra",
    shortDescription: "Sítio arborizado com trilhas curtas e amplo local para churrasco.",
    fullDescription:
      "Refúgio verde em Campo Grande, com área arborizada, trilhas curtas para caminhada e um local central para churrasco com mesas de madeira. Ambiente descontraído, ótimo para encontros de família aos finais de semana e pequenas confraternizações.",
    neighborhood: "Campo Grande",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Campo Grande",
      seed: "sitio-nova-friburgo-mirim",
      density: "suburbano",
    }),
    category: "sitio",
    recommendedEvents: ["churrasco", "confraternizacao"],
    capacityMin: 20,
    capacityMax: 80,
    startingPrice: 1000,
    amenityIds: ["churrasqueira", "jardim", "estacionamento", "area-coberta"],
    rules: {
      music: {
        musicAllowed: { status: "restrito", detail: "Uso de som limitado até 21h" },
      },
      cleaning: {
        trashRemoval: {
          status: "proibido",
          detail: "Recolhimento do lixo é responsabilidade do locatário",
          description: "O sítio não inclui equipe de limpeza pós-evento.",
        },
      },
      food: {
        barbecue: { status: "permitido", detail: "Local para churrasco com mesas de madeira" },
      },
      children: {
        allowed: {
          status: "permitido",
          detail: "Bem-vindas",
          description: "Trilhas curtas e área arborizada — recomendamos supervisão dos responsáveis.",
        },
      },
      pets: {
        allowed: { status: "permitido", detail: "Bem-vindos" },
      },
      parking: {
        spots: { status: "permitido", detail: "Estacionamento disponível no local" },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "area-externa", name: "Área arborizada", category: "estrutura", status: "included", description: "Trilhas curtas e área verde." },
      { id: "cobertura", name: "Área coberta", category: "conforto", status: "included" },
      { id: "churrasqueira", name: "Churrasqueira", category: "alimentacao", status: "included", description: "Mesas de madeira no local do churrasco." },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "dj", name: "DJ", category: "servicos", status: "optional", description: "Uso de som limitado até 21h." },
      { id: "seguranca", name: "Segurança", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "unavailable", description: "Sinal de internet limitado na região." },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "unavailable" },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable" },
      { id: "limpeza", name: "Limpeza pós-evento", category: "servicos", status: "unavailable", description: "Recolhimento do lixo é responsabilidade do locatário." },
    ],
    images: [
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1200&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=80",
    ],
    featured: false,
    verified: true,
    demoAvailability: "disponivel",
  },
  {
    id: "12",
    slug: "espaco-gourmet-laranjeiras",
    name: "Local Gourmet Laranjeiras",
    shortDescription: "Local gourmet aconchegante em casarão histórico, ideal para eventos íntimos.",
    fullDescription:
      "Instalado no térreo de um casarão histórico em Laranjeiras, este local gourmet combina charme antigo com conforto contemporâneo. Pé-direito alto, piso original preservado e uma cozinha compacta, porém completa. Perfeito para chás revelação, pequenos noivados e aniversários intimistas.",
    neighborhood: "Laranjeiras",
    city: "Rio de Janeiro",
    state: "RJ",
    publicLocation: buildPublicLocation({
      neighborhood: "Laranjeiras",
      seed: "espaco-gourmet-laranjeiras",
      density: "urbano-denso",
    }),
    category: "espaco-gourmet",
    recommendedEvents: ["cha-revelacao", "noivado", "aniversario"],
    capacityMin: 15,
    capacityMax: 35,
    startingPrice: 850,
    amenityIds: ["cozinha", "wifi", "banheiros"],
    rules: {
      operatingHours: {
        maxEndTime: { status: "permitido", detail: "Evento deve encerrar até 23h" },
      },
      parking: {
        spots: {
          status: "proibido",
          detail: "Sem estacionamento próprio",
          description: "Rua com estacionamento público nas proximidades.",
        },
      },
      food: {
        kitchenAvailable: { status: "permitido", detail: "Cozinha compacta e completa disponível" },
        externalCatering: { status: "permitido", detail: "Buffet próprio ou terceirizado liberado" },
      },
      children: {
        allowed: {
          status: "restrito",
          detail: "Permitidas com supervisão",
          description: "Casarão histórico com piso original preservado.",
        },
      },
      deposit: {
        required: { status: "nao_informado" },
      },
    },
    features: [
      { id: "cozinha", name: "Cozinha equipada", category: "alimentacao", status: "included", description: "Cozinha compacta e completa." },
      { id: "banheiros", name: "Banheiros", category: "conforto", status: "included" },
      { id: "wifi", name: "Wi-Fi", category: "tecnologia", status: "included" },
      { id: "buffet", name: "Buffet", category: "alimentacao", status: "optional", description: "Disponível sob consulta." },
      { id: "decoracao", name: "Decoração", category: "servicos", status: "optional" },
      { id: "bartender", name: "Bartender", category: "servicos", status: "optional" },
      { id: "cerimonialista", name: "Cerimonialista", category: "servicos", status: "optional" },
      { id: "piscina", name: "Piscina", category: "estrutura", status: "unavailable" },
      { id: "estacionamento", name: "Estacionamento", category: "logistica", status: "unavailable", description: "Sem estacionamento próprio — rua com estacionamento público." },
      { id: "elevador", name: "Elevador", category: "logistica", status: "unavailable", description: "Casarão térreo, sem elevador." },
      { id: "ar-condicionado", name: "Ar-condicionado", category: "conforto", status: "unknown" },
    ],
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
    ],
    featured: false,
    verified: false,
    demoAvailability: "sob-consulta",
  },
];

export function getVenueBySlug(slug: string) {
  return venues.find((s) => s.slug === slug);
}

export function getVenueById(id: string) {
  return venues.find((s) => s.id === id);
}

export function getFeaturedVenues() {
  return venues.filter((s) => s.featured);
}

export function getSimilarVenues(venue: Venue, count = 3) {
  return venues
    .filter((s) => s.id !== venue.id && s.category === venue.category)
    .concat(venues.filter((s) => s.id !== venue.id && s.category !== venue.category))
    .slice(0, count);
}

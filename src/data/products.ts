export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'buques' | 'rosas' | 'caixas' | 'cestas' | 'tulipas' | 'plantas';
  categoryLabel: string;
  occasion: 'aniversario' | 'romantismo' | 'agradecimento' | 'namoro' | 'surpresa';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  image: string;
  description: string;
  flowersIncluded: string[];
  dimensions: string;
  durability: string;
  isBestSeller?: boolean;
}

export interface OccasionItem {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  categoryFilter?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  iconName: string;
  description: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'buque-aurora-boreal',
    name: 'Buquê Aurora & Peônias',
    subtitle: 'Peônias nobres, rosas inglesas e folhagens de eucalipto',
    category: 'buques',
    categoryLabel: 'Buquê Autoral',
    occasion: 'romantismo',
    price: 289.90,
    originalPrice: 329.90,
    rating: 5.0,
    reviewsCount: 148,
    tag: 'Mais Desejado',
    image: '/images/hero-bouquet.jpg',
    description: 'Um arranjo clássico e cinematográfico. Reúne peônias importadas em tons blush, rosas inglesas David Austin e ramos de eucalipto baby blue envoltos em camadas de papel kraft artesanal e laço de seda crua.',
    flowersIncluded: ['Peônias Blush', 'Rosas Inglesas Garden', 'Hortênsias Brancas', 'Eucalipto Cinéreo'],
    dimensions: 'Aprox. 55cm de altura × 45cm de diâmetro',
    durability: 'Frescor impecável por 7 a 10 dias com nossa solução floral',
    isBestSeller: true,
  },
  {
    id: 'box-jardim-secreto',
    name: 'Flower Box Jardim Secreto',
    subtitle: 'Caixa cartonada aveludada com rosas spray e ranúnculos',
    category: 'caixas',
    categoryLabel: 'Flower Box de Luxo',
    occasion: 'aniversario',
    price: 249.90,
    originalPrice: 279.90,
    rating: 4.9,
    reviewsCount: 96,
    tag: 'Exclusivo',
    image: '/images/category-flower-box.jpg',
    description: 'Nossa icônica caixa redonda de presente acabada com fita em cetim verde-sálvia. Dispensa vasos: as flores vêm montadas em esponja floral umedecida com nutrientes botânicos para manter o viço por longos dias.',
    flowersIncluded: ['Rosas Spray Rosê', 'Ranúnculos Pastéis', 'Peônias Holandesas', 'Astilbe Branco'],
    dimensions: 'Caixa 22cm diâmetro × 35cm altura total com arranjo',
    durability: '8 a 12 dias de durabilidade com hidratação leve a cada 2 dias',
    isBestSeller: true,
  },
  {
    id: 'cesta-celebrare-gourmet',
    name: 'Cesta Gourmet Celebrare',
    subtitle: 'Bombons artesanais, mel de lavanda, vela botânica e minibuquê',
    category: 'cestas',
    categoryLabel: 'Cestas & Mimos',
    occasion: 'agradecimento',
    price: 349.90,
    rating: 5.0,
    reviewsCount: 82,
    tag: 'Presente Completo',
    image: '/images/category-gift-basket.jpg',
    description: 'Uma experiência multissensorial embalada em caixa de madeira nobre de reflorestamento. Inclui caixa de bombons belgas finos, mel silvestre de lavanda com dosador de madeira, vela aromática de cera de soja vegetal e arranjo floral perfumado.',
    flowersIncluded: ['Minibuquê com Rosas Spray', 'Lavanda Desidratada', 'Eucalipto e Folhagens'],
    dimensions: 'Caixa de madeira rústica 35cm × 25cm × 15cm',
    durability: 'Arranjo floral de 7 dias + itens gourmet de longa durabilidade',
    isBestSeller: true,
  },
  {
    id: 'buque-rosas-colombianas',
    name: 'Buquê Imperial de Rosas Nobres',
    subtitle: 'Rosas colombianas selecionadas em degradê suave com embalagem artesanal',
    category: 'rosas',
    categoryLabel: 'Rosas Selecionadas',
    occasion: 'namoro',
    price: 219.90,
    originalPrice: 249.90,
    rating: 4.9,
    reviewsCount: 210,
    tag: 'Clássico Inesquecível',
    image: '/images/category-roses.jpg',
    description: 'A elegância máxima da rosa nobre. Hastes longas selecionadas com botões generosos que abrem suavemente ao longo dos dias, liberando fragrância doce e reconfortante.',
    flowersIncluded: ['Rosas Colombianas Blush & Champagne', 'Minirosas Rosadas', 'Sementes de Hipérico', 'Eucalipto'],
    dimensions: 'Aprox. 60cm de altura × 40cm de largura',
    durability: '7 a 10 dias com troca de água a cada 48h',
    isBestSeller: true,
  },
  {
    id: 'buque-tulipas-primavera',
    name: 'Buquê Tulipas de Amsterdã',
    subtitle: 'Tulipas holandesas frescas com acabamento rústico em cordão de linho',
    category: 'tulipas',
    categoryLabel: 'Flores da Estação',
    occasion: 'surpresa',
    price: 198.90,
    rating: 4.8,
    reviewsCount: 64,
    tag: 'Edição Especial',
    image: '/images/category-tulips.jpg',
    description: 'Símbolo do renascimento e afeto espontâneo. Tulipas selecionadas em tonalidades quentes de rosa e pêssego, amarradas à mão com barbante de juta natural e papel de fibra vegetal.',
    flowersIncluded: ['Tulipas Holandesas Pêssego e Rosa', 'Folhagem Natural de Tulipa'],
    dimensions: 'Aprox. 45cm de altura × 30cm de diâmetro',
    durability: '5 a 8 dias em ambiente fresco longe da luz solar direta',
    isBestSeller: true,
  },
  {
    id: 'box-romance-eterno',
    name: 'Caixa de Rosas Veludo Vermelho',
    subtitle: '24 rosas vermelhas aveludadas em caixa cilíndrica preta acetinada',
    category: 'caixas',
    categoryLabel: 'Flower Box de Luxo',
    occasion: 'romantismo',
    price: 319.90,
    rating: 5.0,
    reviewsCount: 112,
    tag: 'Romântico',
    image: '/images/category-roses.jpg',
    description: 'Declaração definitiva de amor. Rosas vermelhas profundas montadas com rigor geométrico em caixa de luxo com monograma dourado, perfeitas para aniversários de namoro ou noivado.',
    flowersIncluded: ['Rosas Colombianas Red Velvet 60cm', 'Gipsófila Importada'],
    dimensions: 'Caixa 25cm diâmetro × 30cm altura',
    durability: '7 a 9 dias com adição regular de água na base floral',
    isBestSeller: false,
  },
  {
    id: 'cesta-doce-carinho',
    name: 'Cesta Doce Carinho & Flores',
    subtitle: 'Arranjo alegre com biscoitos artesanais, chá especial e macarons',
    category: 'cestas',
    categoryLabel: 'Cestas & Mimos',
    occasion: 'aniversario',
    price: 279.90,
    rating: 4.9,
    reviewsCount: 53,
    tag: 'Mais Presenteado',
    image: '/images/category-gift-basket.jpg',
    description: 'Presente perfeito para começar o dia celebrando. Acompanha caixa com 6 macarons franceses sortidos, infusor com chá de maçã e canela, caneca de cerâmica artesanal e minibuquê.',
    flowersIncluded: ['Gérberas Amarelas', 'Rosas Spray', 'Camomila Botânica'],
    dimensions: 'Bandeja em madeira clara 30cm × 20cm',
    durability: 'Arranjo floral de 7 dias',
    isBestSeller: false,
  },
  {
    id: 'buque-campo-perfumado',
    name: 'Buquê Silvestre Flor do Campo',
    subtitle: 'Composição orgânica e campestre com flores silvestres e trigo seco',
    category: 'buques',
    categoryLabel: 'Buquê Autoral',
    occasion: 'surpresa',
    price: 169.90,
    rating: 4.8,
    reviewsCount: 77,
    image: '/images/hero-bouquet.jpg',
    description: 'Inspirado nos campos floridos do interior europeu. Cores vivas, textura natural e leveza para encantar quem aprecia a beleza espontânea da botânica.',
    flowersIncluded: ['Margaridas', 'Lisianthus', 'Limonium Roxo', 'Trigo Dourado', 'Eucalipto'],
    dimensions: 'Aprox. 50cm de altura × 38cm de largura',
    durability: '7 a 12 dias',
    isBestSeller: false,
  }
];

export const OCCASIONS_DATA: OccasionItem[] = [
  {
    id: 'aniversario',
    name: 'Aniversários',
    headline: 'Comemore a vida com cores e perfumes inesquecíveis',
    description: 'Arranjos festivos e alegres que transformam a celebração de um novo ciclo em um momento memorável.',
    image: '/images/category-flower-box.jpg',
    categoryFilter: 'aniversario',
  },
  {
    id: 'romantismo',
    name: 'Romance & Amor',
    headline: 'Palavras não ditas que florescem no coração',
    description: 'Rosas colombianas raras, peônias e laços de seda para celebrar o amor em sua forma mais pura.',
    image: '/images/category-roses.jpg',
    categoryFilter: 'romantismo',
  },
  {
    id: 'agradecimento',
    name: 'Gratidão & Agradecimento',
    headline: 'Um gesto sincero e elegante de reconhecimento',
    description: 'Cestas e arranjos harmônicos desenhados para expressar sua gratidão com requinte e afeto.',
    image: '/images/category-gift-basket.jpg',
    categoryFilter: 'agradecimento',
  },
  {
    id: 'namoro',
    name: 'Bodas & Namoro',
    headline: 'Eternize sua história a cada ano compartilhado',
    description: 'Presentes memoráveis para brindar momentos a dois com cartões personalizados e flores nobres.',
    image: '/images/hero-bouquet.jpg',
    categoryFilter: 'namoro',
  },
  {
    id: 'surpresa',
    name: 'Surpresas do Dia a Dia',
    headline: 'Porque quem você ama não precisa de data marcada',
    description: 'Um mimo inesperado na porta de casa ou no escritório para transformar uma terça-feira comum em algo mágico.',
    image: '/images/category-tulips.jpg',
    categoryFilter: 'surpresa',
  }
];

export const CATEGORIES_LIST = [
  { id: 'todos', label: 'Todos os Presentes' },
  { id: 'buques', label: 'Buquês Autorais' },
  { id: 'rosas', label: 'Rosas Nobres' },
  { id: 'caixas', label: 'Flower Boxes' },
  { id: 'cestas', label: 'Cestas & Gourmet' },
  { id: 'tulipas', label: 'Tulipas & Estação' }
];

export const ADDONS_DATA: AddOnItem[] = [
  {
    id: 'addon-chocolate-lindt',
    name: 'Caixa de Bombons Finos Lindt (120g)',
    price: 49.90,
    iconName: 'gift',
    description: 'Trufas suíças cremosas selecionadas'
  },
  {
    id: 'addon-vela-aromatica',
    name: 'Vela Botânica Lavanda & Bergamota',
    price: 39.90,
    iconName: 'flame',
    description: 'Cera vegetal de soja em pote de vidro âmbar'
  },
  {
    id: 'addon-balao-coracao',
    name: 'Balão Metalizado Coração Rosé',
    price: 24.90,
    iconName: 'heart',
    description: 'Inflado com gás hélio e fita de cetim'
  },
  {
    id: 'addon-vaso-vidro',
    name: 'Vaso Cilíndrico de Vidro Soprado',
    price: 55.00,
    iconName: 'sparkles',
    description: 'Design minimalista sob medida para o buquê'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    name: 'Carolina M. Ribeiro',
    city: 'São Paulo, SP',
    occasion: 'Aniversário da Mãe',
    rating: 5,
    date: 'Há 2 dias',
    text: 'Moro no exterior e precisava surpreender minha mãe no aniversário dela. O buquê chegou pontualmente, fresco como se tivesse sido colhido no minuto, e a caligrafia da cartinha levou ela às lágrimas de emoção. Recomendo de olhos fechados!',
    initials: 'CR',
    avatarBg: '#5F7359'
  },
  {
    id: 't2',
    name: 'Gabriel Albuquerque',
    city: 'Campinas, SP',
    occasion: 'Pedido de Namoro',
    rating: 5,
    date: 'Há 5 dias',
    text: 'A Flower Box Jardim Secreto superou qualquer expectativa! A delicadeza das cores e o perfume das rosas deixaram minha namorada encantada. O atendimento pelo WhatsApp também me enviou a foto do arranjo antes do envio.',
    initials: 'GA',
    avatarBg: '#38462F'
  },
  {
    id: 't3',
    name: 'Juliana P. Castro',
    city: 'São Paulo, SP',
    occasion: 'Agradecimento Especial',
    rating: 5,
    date: 'Há 1 semana',
    text: 'Compramos cestas gourmet com flores para homenagear parceiros especiais. A apresentação é impecável, alto padrão em cada detalhe, desde a caixa de madeira nobre até o laço de seda e os bombons.',
    initials: 'JC',
    avatarBg: '#7C8E77'
  }
];

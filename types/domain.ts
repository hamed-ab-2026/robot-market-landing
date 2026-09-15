export type Locale = 'fa' | 'en';
export type Direction = 'rtl' | 'ltr';
export type Theme = 'light' | 'dark';

export interface Machine {
  id: string;
  name: string;
  shortLabel: string;
  priceLabel: string;
  priceNumeric: number;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  gif: string;
}

export type CartProduct = Pick<Machine, 'id' | 'name' | 'priceNumeric' | 'priceLabel' | 'image'>;
export interface CartItem extends CartProduct { qty: number }
export interface CartState { items: CartItem[] }

export interface FloatingSnack {
  id: string;
  image: string;
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
}

export type FeatureIcon = 'safety' | 'consulting' | 'installment' | 'packaging';
export type LocationIcon = 'hotel' | 'school' | 'pharmacy' | 'hospital' | 'night' | 'specialty';

interface InfoCard<Icon extends string> {
  id: string;
  icon: Icon;
  title: string;
  description: string;
}

export interface SiteContent {
  dir: Direction;
  lang: Locale;
  meta: { title: string; description: string };
  nav: Record<'home' | 'showcase' | 'about' | 'locations' | 'contact' | 'login', string>;
  hero: {
    loading: string;
    cta: string;
    slides: { id: string; kicker: string; titleLines: string[]; sub: string; image: string }[];
  };
  cart: {
    title: string;
    empty: string;
    total: string;
    checkout: string;
    checkoutToast: string;
    addToast: (name: string) => string;
  };
  machineActions: {
    addToCart: string;
    wishlistAdd: string;
    wishlistRemove: string;
    hoverHint: string;
    altVariant: string;
    gifAlt: (name: string) => string;
  };
  machines: Machine[];
  features: InfoCard<FeatureIcon>[];
  about: { eyebrow: string; legalName: string; more: string; less: string; paragraphs: string[] };
  locations: { title: string; items: InfoCard<LocationIcon>[] };
  footer: Record<'aboutLabel' | 'aboutText' | 'quickLinks' | 'contactTitle' | 'factoryLabel' | 'salesLabel' | 'rights', string>;
  contactInfo: {
    orderPhone: string;
    orderPhoneHref: string;
    factoryAddress: string;
    salesOfficeAddress: string;
    socialLinks: { id: string; label: string; href: string }[];
  };
}

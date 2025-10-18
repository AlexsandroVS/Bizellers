export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface FAQ {
  icon: string;
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

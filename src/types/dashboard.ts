export type LeadStatus = "nuevo" | "contactado" | "negociacion" | "cerrado";

export interface Lead {
  id: number;
  nombre: string;
  cargo: string;
  empresa: string;
  telefono: string;
  correo: string;
  servicio: string;
  mensaje: string | null;
  created_at: Date | string;
  status: LeadStatus;
  notes: string | null;
  updated_at: Date | string;
  status_history: StatusChange[] | null;
}

export interface StatusChange {
  from: LeadStatus;
  to: LeadStatus;
  timestamp: string;
}

export interface Column {
  id: LeadStatus;
  title: string;
  leads: Lead[];
}

export interface DashboardKPIs {
  totalLeads: number;
  contactRate: number;
  inNegotiation: number;
  conversionRate: number;
}

export interface PhoneValidation {
  isValid: boolean;
  formatted: string;
  countryCode: string;
  nationalNumber: string;
}

import * as XLSX from 'xlsx';
import type { Lead } from '../types/dashboard';

/**
 * Convierte un array de leads a formato CSV y lo descarga
 */
export function exportToCSV(leads: Lead[], filename: string = 'leads.csv'): void {
  // Preparar los datos para exportar
  const data = leads.map(lead => ({
    'ID': lead.id,
    'Nombre': lead.nombre,
    'Cargo': lead.cargo,
    'Empresa': lead.empresa,
    'Teléfono': lead.telefono,
    'Correo': lead.correo,
    'Servicio': lead.servicio,
    'Estado': lead.status,
    'Mensaje': lead.mensaje || '',
    'Notas': lead.notes || '',
    'Fecha Creación': new Date(lead.created_at).toLocaleString('es-PE'),
    'Última Actualización': new Date(lead.updated_at).toLocaleString('es-PE'),
  }));

  // Crear hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Ajustar ancho de columnas
  const columnWidths = [
    { wch: 8 },  // ID
    { wch: 25 }, // Nombre
    { wch: 20 }, // Cargo
    { wch: 25 }, // Empresa
    { wch: 15 }, // Teléfono
    { wch: 30 }, // Correo
    { wch: 30 }, // Servicio
    { wch: 15 }, // Estado
    { wch: 40 }, // Mensaje
    { wch: 40 }, // Notas
    { wch: 20 }, // Fecha Creación
    { wch: 20 }, // Última Actualización
  ];
  worksheet['!cols'] = columnWidths;

  // Crear libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  // Descargar archivo
  XLSX.writeFile(workbook, filename);
}

/**
 * Convierte un array de leads a formato Excel y lo descarga
 */
export function exportToExcel(leads: Lead[], filename: string = 'leads.xlsx'): void {
  // Preparar los datos para exportar
  const data = leads.map(lead => ({
    'ID': lead.id,
    'Nombre': lead.nombre,
    'Cargo': lead.cargo,
    'Empresa': lead.empresa,
    'Teléfono': lead.telefono,
    'Correo': lead.correo,
    'Servicio': lead.servicio,
    'Estado': lead.status.toUpperCase(),
    'Mensaje': lead.mensaje || '',
    'Notas': lead.notes || '',
    'Fecha Creación': new Date(lead.created_at).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    'Última Actualización': new Date(lead.updated_at).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
  }));

  // Crear hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Ajustar ancho de columnas
  const columnWidths = [
    { wch: 8 },  // ID
    { wch: 25 }, // Nombre
    { wch: 20 }, // Cargo
    { wch: 25 }, // Empresa
    { wch: 15 }, // Teléfono
    { wch: 30 }, // Correo
    { wch: 30 }, // Servicio
    { wch: 15 }, // Estado
    { wch: 40 }, // Mensaje
    { wch: 40 }, // Notas
    { wch: 20 }, // Fecha Creación
    { wch: 20 }, // Última Actualización
  ];
  worksheet['!cols'] = columnWidths;

  // Crear libro de trabajo
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

  // Descargar archivo
  XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });
}

/**
 * Exporta leads filtrados por estado
 */
export function exportByStatus(leads: Lead[], status: string, format: 'csv' | 'xlsx' = 'xlsx'): void {
  const filteredLeads = leads.filter(lead => lead.status === status);
  const filename = `leads_${status}_${new Date().toISOString().split('T')[0]}.${format}`;

  if (format === 'csv') {
    exportToCSV(filteredLeads, filename);
  } else {
    exportToExcel(filteredLeads, filename);
  }
}
